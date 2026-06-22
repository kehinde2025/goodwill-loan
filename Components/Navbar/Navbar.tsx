"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0B1F3B] shadow-lg border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A63A] font-bold text-[#0B1F3B] shadow-md">
            G
          </div>

          <div className="leading-tight">
            <h2 className="text-lg font-bold tracking-wide text-white">
              GOODWILL LOANS
            </h2>
            <p className="text-xs text-gray-300">
              Premium Lending Solutions
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm font-medium text-white hover:text-[#D4A63A]">Home</a>
          <a href="#about" className="text-sm font-medium text-white hover:text-[#D4A63A]">About</a>
          <a href="#programs" className="text-sm font-medium text-white hover:text-[#D4A63A]">Loan Programs</a>
          <a href="#resources" className="text-sm font-medium text-white hover:text-[#D4A63A]">Resources</a>
          <a href="#contact" className="text-sm font-medium text-white hover:text-[#D4A63A]">Contact</a>

          <a
            href="#loanapplication"
            className="rounded-full bg-[#D4A63A] px-5 py-2 font-semibold text-[#0B1F3B] hover:bg-[#F2C66D]"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-white md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#0B1F3B] md:hidden">
          <div className="flex flex-col gap-5 px-6 py-6">
            {[
              { label: "Home", href: "#" },
              { label: "About", href: "#about" },
              { label: "Loan Programs", href: "#programs" },
              { label: "Resources", href: "#resources" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-white hover:text-[#D4A63A]"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#loanapplication"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#D4A63A] px-5 py-3 text-center font-semibold text-[#0B1F3B]"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}