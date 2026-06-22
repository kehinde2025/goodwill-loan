"use client";

import { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      q: "Is this really zero interest?",
      a: "Yes. You repay only the amount you borrow. Our funding model allows us to support charitable programs separately without adding interest or hidden fees.",
    },
    {
      q: "Do I need a high credit score?",
      a: "No strict minimum is required. We review income, employment stability, and overall financial profile instead of relying only on credit scores.",
    },
    {
      q: "How fast can I receive funds?",
      a: "Most approved applications submitted before 2 PM Eastern are reviewed the same day, with funds typically arriving within 24 hours after approval.",
    },
    {
      q: "Is GoodWill Loans legitimate?",
      a: "Yes. GoodWill Loans operates with verified financial partners, follows compliance standards, and never requests upfront payments or gift cards.",
    },
    {
      q: "What can I use the loan for?",
      a: "Loans can be used for personal needs such as emergencies, medical bills, home repairs, debt consolidation, or other financial requirements.",
    },
    {
      q: "What documents are required?",
      a: "You typically need a government-issued ID, proof of income, and an active bank account for direct deposit.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#F8F5EE] px-6 py-20 md:px-16">
      <div className="mx-auto max-w-5xl text-center">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F3B]">
          Frequently Asked Questions
        </h2>

        <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
          Clear answers to the most common questions about eligibility, funding, and repayment.
        </p>

        {/* FAQ Box */}
        <div className="mt-12 space-y-4 text-left">

          {faqs.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <div
                key={index}
                className="border border-[#E5E7EB] rounded-xl bg-white overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#0B1F3B]">
                    {item.q}
                  </span>

                  <span className="text-[#D4A63A] text-xl font-bold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}