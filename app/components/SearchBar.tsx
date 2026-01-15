"use client";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-6 flex w-full max-w-md items-center gap-2 rounded-full bg-green-500 px-4 py-2">
      <span className="text-white text-sm"></span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="w-full bg-transparent text-ash placeholder-white/80 outline-none"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="text-white text-sm font-bold"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
