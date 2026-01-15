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
    const res = await fetch(`${API_BASE}/menuItems/${id}`, { cache: "no-store" });
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
    <div className="min-h-screen bg-white text-gray-700">
     
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-green-500 px-4 py-2 font-semibold text-green-600 hover:bg-green-500 hover:text-white transition"
        >
        Back To Home
        </Link>
      </div>

     
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10">
        
        <div className="bg-black/5 p-6 rounded-2xl border border-black/10">
          <img
            src={item.image}
            alt={item.name}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        
        <div>
          <p className="text-sm uppercase text-black/60">{item.category}</p>

          <h1 className="text-4xl font-bold mt-2 text-gray-900">{item.name}</h1>

          {item.popular && (
            <span className="inline-block mt-3 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
              Popular
            </span>
          )}

          <div className="mt-5 text-3xl font-bold text-green-600">
            ${item.price.toFixed(2)}
          </div>

          {item.preparationTime && (
            <p className="mt-2 text-black/60">
              ⏱ {item.preparationTime} minutes
            </p>
          )}

         
          {item.dietary && item.dietary.length > 0 && (
            <div className="mt-4 flex gap-2 flex-wrap">
              {item.dietary.map((d) => (
                <span
                  key={d}
                  className="px-3 py-1 bg-black/10 rounded-full text-sm text-gray-800"
                >
                  {d}
                </span>
              ))}
            </div>
          )}

          
          <div className="mt-8">
            <h3 className="font-semibold mb-2 text-gray-900">Description</h3>
            <p className="text-black/70 leading-relaxed">{item.description}</p>
          </div>

          
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Spicy Level</h3>

            </div>

            

            <input
              className="mt-4 w-full accent-red-500"
              type="range"
              min={0}
              max={5}
              value={spicy}
              readOnly
            />
          </div>

          
          <div className="mt-10 flex gap-3 flex-col sm:flex-row">
            
            <div className="flex-1 text-center rounded-xl border-2 border-green-500 py-1">
  <AddToCartButton item={item} />
</div>


            
            <Link
  href="/cart"
  className="flex-1 flex items-center justify-center rounded-xl border-2 border-green-500 py-3 font-semibold text-gray-900 hover:bg-gray-100 transition"
>
  Checkout Now
</Link>

          </div>
        </div>
      </div>
    </div>
  );
}
