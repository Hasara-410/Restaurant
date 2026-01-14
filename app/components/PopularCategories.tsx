"use client";

type MenuItem = {
  id: string;
  category: string;
};

export default function PopularCategories({
  items,
  onSelect,
}: {
  items: MenuItem[];
  onSelect: (cat: string) => void;
}) {
  const countBy = (key: string) =>
    items.filter((i) => i.category === key).length;

  const cards = [
  { title: "Main Dish", apiCat: "mainCourse", count: countBy("mains") },
  { title: "Break Fast", apiCat: "beverages", count: countBy("beverages") },
  { title: "Dessert", apiCat: "desserts", count: countBy("desserts") },
  { title: "Browse All", apiCat: "all", count: items.length },
];


  return (
    <section className="mt-16 text-center">
      <p className="text-xs font-semibold tracking-[0.25em] text-red-400">
        CUSTOMER FAVORITES
      </p>
      <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
        Popular Catagories
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.title}
            onClick={() => onSelect(c.apiCat)}
            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl">
              🍔
            </div>
            <div className="mt-5 text-lg font-bold text-gray-900">{c.title}</div>
            <div className="mt-1 text-sm text-gray-500">({c.count} dishes)</div>
          </button>
        ))}
      </div>
    </section>
  );
}
