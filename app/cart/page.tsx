"use client";

import Link from "next/link";
import { useCart } from "@/app/lib/cart";

export default function CartPage() {
  const { items, removeItem, clearCart, addItem, total, count } = useCart();

  const decQty = (id: string) => {
    // easiest: remove one by rebuilding list (simple approach for interview test)
    // we'll do it by removing item completely when qty = 1
    const target = items.find((x) => x.id === id);
    if (!target) return;

    if (target.qty <= 1) {
      removeItem(id);
      return;
    }

    // reduce qty by 1 (by removing then adding back qty-1)
    // simple & safe without changing cart.tsx
    removeItem(id);
    addItem(
      { id: target.id, name: target.name, price: target.price, image: target.image },
      target.qty - 1
    );
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <p className="text-blakc/60 text-sm mt-1">{count} items</p>
          </div>

          <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-green-500 px-4 py-2 font-semibold text-green-600 hover:bg-green-500 hover:text-white transition"
        >
        Back To Home
        </Link>
        </div>

        {/* Empty */}
        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-black/10 bg-black/5 p-8">
            <p className="text-green-500">Your cart is empty...</p>
            <Link href="/" className="inline-block mt-4 text-green-400 underline">
              Browse menu
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="mt-8 space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-black/5 border border-black/10 p-4"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="h-24 w-full sm:w-24 sm:h-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-lg">{it.name}</p>
                    <p className="text-black/60 text-sm">
                      ${it.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decQty(it.id)}
                      className="h-10 w-10 rounded-xl border border-black/20 hover:bg-black/10"
                    >
                      −
                    </button>

                    <span className="min-w-8 text-center font-semibold">
                      {it.qty}
                    </span>

                    <button
                      onClick={() =>
                        addItem(
                          { id: it.id, name: it.name, price: it.price, image: it.image },
                          1
                        )
                      }
                      className="h-10 w-10 rounded-xl border border-black/20 hover:bg-black/10"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="font-bold text-right sm:w-28">
                    ${(it.price * it.qty).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(it.id)}
                    className="rounded-xl border border-black/20 px-4 py-2 hover:bg-black/10"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-10 rounded-2xl border border-black/10 bg-black/5 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xl font-bold">
                Total: <span className="text-green-400">${total.toFixed(2)}</span>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="rounded-xl border border-black/20 px-5 py-3 hover:bg-black/10"
                >
                  Clear Cart
                </button>

                <button
                  onClick={() => alert("Checkout demo ✅ (no payment in test)")}
                  className="rounded-xl bg-black text-white px-6 py-3 font-semibold hover:opacity-90"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
