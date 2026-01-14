"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import PopularCategories from "./components/PopularCategories";
import SearchBar from "./components/SearchBar";
import Link from "next/link";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function Home() {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

  const [activeCategory, setActiveCategory] = useState("appetizers");

  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);

  const [search, setSearch] = useState("");


  // load all items once (for Popular Categories counts)
  useEffect(() => {
    fetch(`${base}/menuItems`)
      .then((r) => r.json())
      .then((data) => setAllItems(data))
      .catch(() => setAllItems([]));
  }, [base]);

  // load items for selected category
  useEffect(() => {
    const url =
      activeCategory === "all"
        ? `${base}/menuItems`
        : `${base}/menuItems?category=${encodeURIComponent(activeCategory)}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]));
  }, [activeCategory, base]);

  const filteredItems = items.filter((item) => {
  const q = search.toLowerCase().trim();
  if (!q) return true;

  return (
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
});


  return (
    <div className="min-h-screen bg-white">
      <Header active={activeCategory} onChange={setActiveCategory} />

      <main className="mx-auto max-w-6xl px-6 py-10"> <SearchBar value={search} onChange={setSearch} />

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

            <div className="flex gap-3">
              <button className="h-12 w-12 rounded-full bg-gray-100 text-xl">
                ‹
              </button>
              <button className="h-12 w-12 rounded-full bg-green-500 text-xl text-white">
                ›
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
  {filteredItems.length} items found
</p>

{filteredItems.length === 0 && (
  <p className="mt-6 text-gray-500">No items found.</p>
)}


          <div className="mt-10 grid gap-6 md:grid-cols-3">
  {filteredItems.slice(0, 6).map((item) => {
    if (!item?.id) return null;

    return (
      <Link key={item.id} href={`/item/${item.id}`} className="block">
        <div className="rounded-2xl bg-white p-4 shadow hover:shadow-lg transition">
          <img
            src={item.image}
            alt={item.name}
            className="h-52 w-full rounded-xl object-cover"
          />
          <h3 className="mt-4 text-lg font-bold">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
          <div className="mt-3 font-bold text-green-600">${item.price}</div>
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
