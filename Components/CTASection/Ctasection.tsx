import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CTA() {
  const points = [
    "Zero upfront fees or charges",
    "Scores from 550 considered",
    "Funding as early as next day",
    "All 50 states covered",
    "256-bit SSL protected",
    "Your approval supports charity",
  ];

  return (
    <section className="bg-gradient-to-b from-[#0B1F3B] via-[#0B1F3B] to-[#071428] text-white px-6 py-16 md:px-16 md:py-24 text-center">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-[#D4A63A]">
          Ready to Take the First Step?
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-[#D4A63A]/80 mb-10 leading-relaxed">
          Join over 15,000 people who have used GoodWill Loans to access fast, fair, and transparent financing. Free application, 10 minutes.
        </p>

        {/* CTA Button */}
        <button className="relative bg-[#D4A63A] text-[#0B1F3B] px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:opacity-90 transition duration-300 animate-pulse">
          Start My Application Now
        </button>

        {/* Trust Points */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base text-[#D4A63A]/90">
          {points.map((point, index) => (
            <div key={index} className="flex items-center justify-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-[#D4A63A]" />
              <span>{point}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}