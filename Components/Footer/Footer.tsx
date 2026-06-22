export default function Footer() {
  return (
    <footer className="text-white px-6 py-14 md:px-16 bg-gradient-to-r from-[#0B1F3B] via-[#0B1F3B] to-[#071428] shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">

            <div className="bg-[#D4A63A] rounded-full w-8 h-8 flex items-center justify-center shadow-md">
              <svg
                className="w-4 h-4 text-[#0B1F3B]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <span className="text-xl font-bold text-[#D4A63A] select-none">
              GoodWill Loans
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#D4A63A]/80">
            Licensed personal lending platform serving customers across all 50 states since 2019.
          </p>

          <div className="mt-4 space-y-1 text-sm text-[#D4A63A]/80">
            <p>Licensed Financial Provider</p>
            <p>BBB Accredited Business</p>
            <p>NMLS Registered Entity</p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[#D4A63A] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[#D4A63A]/80">
            <li><a href="#advantages" className="hover:text-[#D4A63A]">Why Choose GoodWill Loans</a></li>
            <li><a href="#process" className="hover:text-[#D4A63A]">How It Works</a></li>
            <li><a href="#mission" className="hover:text-[#D4A63A]">Our Mission</a></li>
            <li><a href="#faq" className="hover:text-[#D4A63A]">Frequently Asked Questions</a></li>
            <li><a href="#apply" className="hover:text-[#D4A63A]">Start Application</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-[#D4A63A] font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-[#D4A63A]/80">
            <li><a href="#" className="hover:text-[#D4A63A]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#D4A63A]">Terms of Service</a></li>
            <li><a href="#" className="hover:text-[#D4A63A]">Responsible Lending Disclosure</a></li>
            <li><a href="#" className="hover:text-[#D4A63A]">Regulatory Compliance</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#D4A63A] font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-[#D4A63A]/80">
            <li>support@goodwillloans.com</li>
            <li>1-888-555-0100</li>
            <li>24/7 Customer Support</li>
            <li>Nationwide Service Coverage</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#0B1F3B] mt-10 pt-6 text-sm text-[#D4A63A]/80 text-center space-y-3">

        <p>
          © 2019–{new Date().getFullYear()} GoodWill Loans Financial Services. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:text-[#D4A63A]">Privacy</a>
          <a href="#" className="hover:text-[#D4A63A]">Terms</a>
          <a href="#" className="hover:text-[#D4A63A]">Accessibility</a>
        </div>

        <p className="max-w-3xl mx-auto text-xs leading-relaxed text-[#D4A63A]/70">
          APR ranges from 5.99% to 24.99%. Loan amounts from $1,000 to $80,000.
          Repayment terms 12–60 months. All loans subject to credit approval.
          GoodWill Loans Financial Services operates as a licensed lending platform.
        </p>

      </div>
    </footer>
  );
}