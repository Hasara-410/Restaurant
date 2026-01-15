"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary?: string[];
  spicyLevel?: number;
};

export default function MenuListPage() {
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:3001";

  
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [dietary, setDietary] = useState<string>("all");

  
  const [sort, setSort] = useState<string>("name_asc");

  
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch ALL items once (then filter on client)
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${base}/menuItems`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load menu items");
        return r.json();
      })
      .then((data) => setItems(data))
      .catch((e) => setError(e?.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [base]);

  // derived list
  const filtered = useMemo(() => {
    let list = [...items];

    // search
    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.description.toLowerCase().includes(q)
      );
    }

    // price filter
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    if (min !== null && !Number.isNaN(min)) {
      list = list.filter((x) => x.price >= min);
    }
    if (max !== null && !Number.isNaN(max)) {
      list = list.filter((x) => x.price <= max);
    }

    // dietary filter
    if (dietary !== "all") {
      list = list.filter((x) => x.dietary?.includes(dietary));
    }

    // sort
    switch (sort) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name_desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "name_asc":
      default:
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [items, search, minPrice, maxPrice, dietary, sort]);

  return (
    <div className="min-h-screen bg-white">
      
      <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Menu Items List
          </h1>
          <p className="text-sm text-green-500 mt-1">
            {loading ? "Loading..." : `${filtered.length} items found`}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-green-500 px-4 py-2 font-semibold text-green-600 hover:bg-green-500 hover:text-white transition"
        >
        Back To Home
        </Link>
      </div>

     
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-green-500 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
           
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Search
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-green-500 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes..."
              />
            </div>

            
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Min Price
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-green-500 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="e.g. 5"
                inputMode="decimal"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Max Price
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-green-500 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="e.g. 20"
                inputMode="decimal"
              />
            </div>

            
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Dietary
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-green-500 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
              >
                <option value="all">All</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten Free</option>
              </select>
            </div>
          </div>

        
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm text-gray-500">
             
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600">Sort</span>
              <select
                className="rounded-xl border border-green-500 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="name_asc">Name (A → Z)</option>
                <option value="name_desc">Name (Z → A)</option>
                <option value="price_asc">Price (Low → High)</option>
                <option value="price_desc">Price (High → Low)</option>
              </select>
            </div>
          </div>
        </div>

        
        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-600">
            Error: {error} (Check backend: http://localhost:3001/menuItems)
          </p>
        )}

        
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {!loading &&
            !error &&
            filtered.map((item) => (
              <Link key={item.id} href={`/item/${item.id}`} className="block">
                <div className="rounded-2xl bg-white p-4 shadow hover:shadow-lg transition">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-52 w-full rounded-xl object-cover"
                  />
                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.dietary?.map((d) => (
                      <span
                        key={d}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700"
                      >
                        {d}
                      </span>
                    ))}
                    {typeof item.spicyLevel === "number" &&
                      item.spicyLevel > 0 && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          🌶️ {item.spicyLevel}
                        </span>
                      )}
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {item.description}
                  </p>
                  <div className="mt-3 font-bold text-green-600">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
        </div>

      
        {loading && <p className="mt-6 text-gray-500">Loading items...</p>}

        
        {!loading && !error && filtered.length === 0 && (
          <p className="mt-6 text-gray-500">No matching items found.</p>
        )}
      </div>
    </div>
  );
}
