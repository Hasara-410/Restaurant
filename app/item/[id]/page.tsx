import Link from "next/link";

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

async function getItem(id: string): Promise<MenuItem | null> {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:3001";

  const url = `${API_BASE}/menuItems/${id}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.log("DETAIL FETCH ERROR:", e);
    return null;
  }
}

// ✅ IMPORTANT: unwrap params (Next.js sometimes gives Promise params)
export default async function ItemPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params; // ✅ fixed
  const item = await getItem(id);

  if (!item) {
    return (
      <div style={{ padding: 40 }}>
        <p>Item not found.</p>
        <Link href="/">Go back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>${item.price}</p>

      <img
        src={item.image}
        alt={item.name}
        style={{ width: 400, borderRadius: 12 }}
      />

      <br />
      <br />
      <Link href="/">Go back</Link>
    </div>
  );
}
