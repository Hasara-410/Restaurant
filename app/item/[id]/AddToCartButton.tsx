"use client";

import { useCart } from "@/app/lib/cart";

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ item }: { item: Item }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => {
        addItem(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
          },
          1
        );
        alert("Added to cart ✅");
      }}
      className="flex-1 bg-white text-black rounded-xl py-3 font-semibold hover:opacity-90"
    >
      Add To Cart
    </button>
  );
}
