"use client";

import Header from "./Header";
import Footer from "./Footer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  
  const dummy = () => {};

  return (
    <div className="min-h-screen bg-white">
      <Header active="all" onChange={dummy} />
      {children}
      <Footer />
    </div>
  );
}
