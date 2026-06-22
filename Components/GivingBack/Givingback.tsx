export default function GivingBack() {
  const steps = [
    {
      number: "01",
      title: "You get approved",
      description:
        "You receive your requested loan amount in full with no hidden deductions.",
    },
    {
      number: "02",
      title: "We match your loan",
      description:
        "We allocate additional funds equal to your loan from our internal impact program.",
    },
    {
      number: "03",
      title: "Half goes to charity",
      description:
        "50% supports verified charitable organizations helping families in need.",
    },
    {
      number: "04",
      title: "No extra cost",
      description:
        "You repay only your original loan amount. No additional fees or charges.",
    },
  ];

  const charities = [
    "Feeding America (EIN: 36-3673599)",
    "National Coalition for the Homeless",
    "Verified via CharityNavigator.org",
    "Registered Financial Partner Network",
  ];

  return (
    <section className="bg-[#F8F5EE] px-6 py-20 md:px-16">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-start gap-14">

        {/* LEFT */}
        <div className="lg:w-1/2 text-center lg:text-left">

          {/* Badge */}
          <span className="inline-flex items-center rounded-full bg-[#D4A63A]/15 px-4 py-2 text-xs font-semibold text-[#0B1F3B] mb-5">
            Lending with Purpose
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F3B]">
            The Giving Back Initiative
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-gray-600 leading-relaxed">
            At <span className="text-[#D4A63A] font-semibold">GoodWill Loans</span>, approving your loan is only half the story.
            We commit an equal amount from our internal resources to support communities in need.
          </p>

          {/* Steps */}
          <div className="mt-10 flex flex-col gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4 items-start">

                {/* Number */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F3B] text-white font-semibold">
                  {step.number}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1F3B]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Charities */}
          <div className="mt-10">
            <h4 className="text-lg font-bold text-[#0B1F3B] mb-3">
              Verified Charities
            </h4>

            <ul className="text-sm text-gray-600 space-y-1">
              {charities.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:w-1/2">
          <div className="h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-[#E5E7EB]">
            <img
              src="https://picsum.photos/id/1059/800/600"
              alt="Giving Back Initiative"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}