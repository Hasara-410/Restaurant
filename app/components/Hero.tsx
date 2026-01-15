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
        {/* left side */}
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            Dive into Delights <br />
            Of Delectable <span className="text-green-500">Food</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-gray-500">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>

         
<div className="mt-7 w-full max-w-sm">
  <div className="flex items-center rounded-full bg-green-500 px-2 py-1 shadow-lg">
   <img
  src="/search.png"
  alt="search"
  className="ml-3 h-4 w-4"
/>
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
      className="ml-2 flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder-white outline-none"
    />
    
  </div>
</div>

        </div>

        {/* right side */}
        <div className="relative flex justify-center md:justify-end">
          

         
          <img
            src="/hero.png"
            alt="Hero"
            className="relative z-10 w-[320px] md:w-90"
          />

          
          <div className="absolute left-2 top-10 z-20 rounded-full bg-white px-4 py-2 text-xs shadow">
            Hot spicy Food 🌶️
          </div>
        </div>
      </div>
    </section>
  );
}
