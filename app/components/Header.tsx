"use client";

import Link from "next/link";
import { useCart } from "@/app/lib/cart";

const tabs = [
  { label: "Appetizers", value: "appetizers" },
  { label: "Main Course", value: "mains" },
  { label: "Desserts", value: "desserts" },
  { label: "Beverages", value: "beverages" },
];

export default function Header({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  const { count } = useCart(); // ✅ correct name

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
  <img
    src="/logo.png"
    alt="Logo"
    className="h-8 w-auto"
  />
</Link>


        {/* Tabs */}
        <nav className="hidden gap-10 md:flex">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => onChange(t.value)}
              className={`text-sm font-medium ${
                active === t.value ? "text-green-500" : "text-gray-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Cart Button + Badge */}
     <Link
  href="/cart"
  className="relative flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
>
  <img
    src="/cart.png"
    alt="Cart"
    className="h-5 w-5"
  />
  

  {count > 0 && (
    <span className="absolute -top-2 -right-2 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-black">
      {count}
    </span>
  )}
</Link>



          <button className="rounded-full bg-green-500 px-6 py-2 text-sm font-semibold text-white">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
