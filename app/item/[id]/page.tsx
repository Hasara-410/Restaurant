import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary?: string[];
  popular?: boolean;
  spicyLevel?: number;
  preparationTime?: number;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:3001";

async function getItem(id: string): Promise<MenuItem | null> {
  try {
    const res = await fetch(`${API_BASE}/menuItems/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function ItemPage(props: any) {
  const params =
    typeof props?.params?.then === "function" ? await props.params : props.params;
  const id = params?.id;

  if (!id) {
    return (
      <div className="p-10">
        <p>Invalid item</p>
        <Link href="/">Go back</Link>
      </div>
    );
  }

  const item = await getItem(id);

  if (!item) {
    return (
      <div className="p-10">
        <p>Item not found</p>
        <Link href="/">Go back</Link>
      </div>
    );
  }

  const spicy = item.spicyLevel ?? 0;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link href="/" className="underline text-white/70">
          ← Back to menu
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white/5 p-6 rounded-2xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm uppercase text-white/60">{item.category}</p>
          <h1 className="text-4xl font-bold mt-2">{item.name}</h1>

          {item.popular && (
            <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-black rounded-full text-sm">
              Popular
            </span>
          )}

          <div className="mt-4 text-3xl font-bold text-green-400">
            ${item.price.toFixed(2)}
          </div>

          {item.preparationTime && (
            <p className="mt-2 text-white/60">
              ⏱ {item.preparationTime} minutes
            </p>
          )}

          {/* Dietary */}
          {item.dietary && item.dietary.length > 0 && (
            <div className="mt-4 flex gap-2 flex-wrap">
              {item.dietary.map((d) => (
                <span
                  key={d}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {d}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-white/70">{item.description}</p>
          </div>

          {/* Spicy */}
          <div className="mt-6">
            <p className="mb-2">Spicy Level: {spicy}/5</p>
            <input type="range" min={0} max={5} value={spicy} readOnly />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3 flex-col sm:flex-row">
            <AddToCartButton item={item} />
            <Link
              href="/cart"
              className="text-center border border-white/20 rounded-xl py-3 font-semibold hover:bg-white/10"
            >
              Checkout Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
