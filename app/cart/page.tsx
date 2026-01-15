"use client";

import Link from "next/link";
import { useCart } from "@/app/lib/cart";

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Link href="/" className="text-green-400 underline">
            ← Back to menu
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-white/70">Your cart is empty.</p>
        ) : (
          <>
            <div className="mt-8 space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-lg">{it.name}</p>
                    <p className="text-white/60 text-sm">
                      ${it.price.toFixed(2)} × {it.qty}
                    </p>
                  </div>

                  <p className="font-bold">${(it.price * it.qty).toFixed(2)}</p>

                  <button
                    onClick={() => removeItem(it.id)}
                    className="rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-xl font-bold">
                Total: <span className="text-green-400">${total.toFixed(2)}</span>
              </p>

              <button
                onClick={clearCart}
                className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/10"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
