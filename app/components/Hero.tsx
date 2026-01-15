"use client";

export default function Hero({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            Dive into Delights <br />
            Of Delectable <span className="text-green-500">Food</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-gray-500">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>

          {/* Search Bar (Hero style) */}
          <div className="mt-7 flex w-full max-w-sm items-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
            <span className="pl-4 text-gray-400">🔎</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-3 text-sm outline-none"
            />
            <button className="m-1 rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
              Search
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center md:justify-end">
          

          {/* Hero Image */}
          <img
            src="/hero.png"
            alt="Hero"
            className="relative z-10 w-[320px] md:w-90"
          />

          {/* Small bubble */}
          <div className="absolute left-2 top-10 z-20 rounded-full bg-white px-4 py-2 text-xs shadow">
            Hot spicy Food 🌶️
          </div>
        </div>
      </div>
    </section>
  );
}
