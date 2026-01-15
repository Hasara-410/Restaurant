"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import PopularCategories from "./components/PopularCategories";
import SearchBar from "./components/SearchBar";
import Link from "next/link";
import Hero from "./components/Hero";


type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary?: string[]; // badges
  spicyLevel?: number; // spicy indicator
  popular?: boolean;
  preparationTime?: number;
};

export default function Home() {
  // ✅ Use ONE env name consistently
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:3001";

  const [activeCategory, setActiveCategory] = useState("appetizers");

  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);

  const [search, setSearch] = useState("");

  // ✅ High-mark states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load all items once (for Popular Categories counts)
  useEffect(() => {
    fetch(`${base}/menuItems`)
      .then((r) => r.json())
      .then((data) => setAllItems(data))
      .catch(() => setAllItems([]));
  }, [base]);

  // load items for selected category (with loading/error)
  useEffect(() => {
    const url =
      activeCategory === "all"
        ? `${base}/menuItems`
        : `${base}/menuItems?category=${encodeURIComponent(activeCategory)}`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load menu items");
        return r.json();
      })
      .then((data) => setItems(data))
      .catch((e) => {
        setItems([]);
        setError(e?.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, [activeCategory, base]);

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return items;

    return items.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      return nameMatch || descMatch;
    });
  }, [items, search]);

  return (
    <div className="min-h-screen bg-white">
      <Header active={activeCategory} onChange={setActiveCategory} />

<Hero search={search} setSearch={setSearch} />

<main className="mx-auto max-w-6xl px-6 py-10">

        {/* Popular Categories section */}
        <PopularCategories items={allItems} onSelect={setActiveCategory} />

        {/* Standout Dishes */}
        <section className="mt-20">
          <p className="text-xs font-semibold tracking-[0.25em] text-red-400">
            SPECIAL DISHES
          </p>

          <div className="mt-2 flex items-center justify-between">
  <h2 className="text-4xl font-extrabold text-gray-900">
    Standout Dishes <br /> From Our Menu
  </h2>

  <Link
    href="/menu"
    className="rounded-xl bg-green-500 px-5 py-3 font-semibold text-white hover:opacity-90"
  >
    View Full Menu
  </Link>
</div>


          {/* ✅ Loading/Error/Count */}
          <p className="mt-4 text-sm text-gray-500">
            {loading ? "Loading items..." : `${filteredItems.length} items found`}
          </p>

          {error && (
            <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              Error: {error} (Check backend: http://localhost:3001)
            </p>
          )}

          {!loading && !error && filteredItems.length === 0 && (
            <p className="mt-6 text-gray-500">No items found.</p>
          )}

          {/* ✅ SHOW ALL ITEMS (removed slice) */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {filteredItems.map((item) => {
              if (!item?.id) return null;

              return (
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


                    {/* ✅ Dietary badges + Spicy indicator */}
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
                      ${item.price}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
