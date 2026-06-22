import { 
  BoltIcon,             
  CurrencyDollarIcon, 
  ClockIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/outline";

export default function Advantages() {
  const advantages = [
    {
      icon: CurrencyDollarIcon,
      title: "Zero Interest Rate",
      text: "You borrow $5,000, you pay back $5,000. No interest, no origination fees, no hidden charges."
    },
    {
      icon: UserCircleIcon,
      title: "No Minimum Credit Score",
      text: "Scores below 580 are welcome. We evaluate income and employment stability instead."
    },
    {
      icon: ClockIcon,
      title: "Same-Day Decisions",
      text: "Apply before 2 PM Eastern and receive a decision the same business day."
    },
    {
      icon: BoltIcon,
      title: "Human-Reviewed Applications",
      text: "Every application is reviewed by a real loan specialist, not just algorithms."
    }
  ];

  return (
    <section className="bg-[#F8F5EE] px-6 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F3B]">
            Our Advantages
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built to remove financial barriers. Traditional lenders reject millions of qualified borrowers every year over technicalities. 
            We built <span className="text-[#D4A63A] font-semibold">GoodWill Loans</span> to fix that permanently.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {advantages.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm transition hover:shadow-xl hover:border-[#D4A63A]"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1F3B]/5 mb-5">
                  <Icon className="h-6 w-6 text-[#0B1F3B] group-hover:text-[#D4A63A] transition" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#0B1F3B]">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-600 leading-relaxed">
                  {item.text}
                </p>

                {/* Accent line */}
                <div className="mt-5 h-[2px] w-12 bg-[#D4A63A]/40 group-hover:w-20 transition-all" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}