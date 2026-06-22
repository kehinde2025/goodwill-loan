export default function ClientReviews() {
  const reviews = [
    {
      initials: "SM",
      name: "Sarah M.",
      location: "Phoenix, AZ",
      text:
        "My local bank rejected me twice. GoodWill Loans approved my application within hours and the funds arrived the next morning.",
    },
    {
      initials: "JT",
      name: "James T.",
      location: "Atlanta, GA",
      text:
        "After a medical emergency affected my credit, they focused on my income instead. The process was simple and transparent.",
    },
    {
      initials: "MR",
      name: "Maria R.",
      location: "Los Angeles, CA",
      text:
        "What stood out was transparency. A specialist explained everything clearly with no hidden terms or pressure.",
    },
    {
      initials: "DK",
      name: "David K.",
      location: "Chicago, IL",
      text:
        "From application to funding took less than 48 hours. Everything was smooth and professional.",
    },
  ];

  return (
    <section className="bg-[#F8F5EE] px-6 py-20 md:px-16">
      <div className="mx-auto max-w-7xl text-center">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F3B]">
          What Our Borrowers Say
        </h2>

        <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
          Over 2,300 verified clients across the United States trust GoodWill Loans for fast and transparent funding.
        </p>

        {/* Ratings */}
        <div className="mt-6 text-[#D4A63A] font-semibold">
          ★ 4.8 average rating from verified borrowers
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-left">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm hover:shadow-xl transition"
            >

              {/* Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#0B1F3B] flex items-center justify-center text-white font-semibold">
                  {review.initials}
                </div>

                <div>
                  <h4 className="font-semibold text-[#0B1F3B]">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {review.location}
                  </p>
                </div>
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 leading-relaxed">
                “{review.text}”
              </p>

              {/* Accent line */}
              <div className="mt-5 h-[2px] w-10 bg-[#D4A63A]/40" />

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}