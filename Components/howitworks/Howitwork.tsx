export default function Process() {
  const steps = [
    {
      step: "01",
      title: "Submit Online Application",
      text: "Complete our secure digital form in about 10 minutes. No paperwork, no stress, fully online.",
    },
    {
      step: "02",
      title: "Speak With a Specialist",
      text: "A dedicated loan specialist reviews your application and confirms your eligibility and loan amount.",
    },
    {
      step: "03",
      title: "Review Your Offer",
      text: "Go through your personalized loan terms. Transparent, clear, and no hidden conditions.",
    },
    {
      step: "04",
      title: "Receive Your Funds",
      text: "Once approved and signed, funds are transferred directly to your bank account, usually within 24 hours.",
    },
  ];

  return (
    <section className="bg-[#0B1F3B] px-6 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            How It Works
          </h2>

          <p className="mt-5 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We’ve simplified the lending process into four clear steps so you can access funding quickly, safely, and without confusion.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md hover:border-[#D4A63A] transition"
            >
              {/* Step Number */}
              <div className="text-[#D4A63A] text-3xl font-bold">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.title}
              </h3>

              {/* Text */}
              <p className="mt-2 text-gray-300 leading-relaxed text-sm">
                {item.text}
              </p>

              {/* Accent line */}
              <div className="mt-6 h-[2px] w-10 bg-[#D4A63A]/60" />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-sm">
            Simple process. Fast decisions. Transparent lending.
          </p>
        </div>

      </div>
    </section>
  );
}