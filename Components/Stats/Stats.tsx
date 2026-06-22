export default function Stats() {
  const stats = [
    {
      value: "15,000+",
      label: "Borrowers Funded",
    },
    {
      value: "$2.5M+",
      label: "Donated to Charities",
    },
    {
      value: "50,000+",
      label: "Meals Funded",
    },
    {
      value: "98%",
      label: "Client Satisfaction",
    },
  ];

  return (
    <section className="bg-[#0B1F3B] px-6 py-20 md:px-16">
      <div className="mx-auto max-w-7xl text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Trusted by Thousands Nationwide
        </h2>

        <p className="mt-5 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Real impact, real borrowers, real results. We measure success by the lives we help improve.
        </p>

        {/* Stats Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:border-[#D4A63A]"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#D4A63A]">
                {item.value}
              </div>

              <div className="mt-3 text-sm text-gray-300">
                {item.label}
              </div>

              {/* Accent line */}
              <div className="mt-5 mx-auto h-[2px] w-10 bg-[#D4A63A]/60" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}