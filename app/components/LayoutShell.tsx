"use client";

import Header from "./Header";
import Footer from "./Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  // ✅ For pages that don't need category switching, we give safe defaults.
  const dummy = () => {};

  return (
    <div className="min-h-screen bg-white">
      <Header active="all" onChange={dummy} />
      {children}
      <Footer />
    </div>
  );
}
