import Image from "next/image";
import Link from "next/link";
import {
    ShieldCheckIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    IdentificationIcon,
    GlobeAmericasIcon,
    CalendarIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">

            <div className="relative bg-[#F8F5EE] px-6 py-16 md:px-16 md:py-24">

                {/* Background */}
                <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#D4A63A]/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#0B1F3B]/5 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

                    {/* LEFT */}
                    <div>
                        <span className="mb-6 inline-flex rounded-full bg-[#D4A63A]/15 px-4 py-2 text-sm font-semibold text-[#0B1F3B]">
                            Trusted Lending Solutions
                        </span>

                        <h1 className="text-4xl font-bold leading-tight text-[#0B1F3B] md:text-6xl">
                            FAST, SIMPLE LOANS.
                            <br />
                            COMPETITIVE RATES.
                            <br />
                            <span className="text-[#D4A63A]">BUILT FOR YOU.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg text-gray-600">
                            GoodWill Loans provides transparent and flexible financing designed to help you move forward with confidence.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="#loan-application"
                                className="px-8 py-4 rounded-full bg-[#D4A63A] text-[#0B1F3B] font-semibold shadow-lg hover:bg-[#13325f] transition text-center  hover:text-white"
                            >
                                Apply Now
                            </Link>

                            <button className="rounded-full border-2 border-[#0B1F3B] px-8 py-4 font-semibold text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white">
                                Learn More
                            </button>
                        </div>

                        <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
                            {["Low APR Rates", "Flexible Terms", "Fast Approval", "Trusted Support"].map(
                                (text: string) => (
                                    <div key={text} className="flex items-center gap-2">
                                        <CheckCircleIcon className="h-5 w-5 text-[#D4A63A]" />
                                        <span className="text-gray-700">{text}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative">
                        <div className="relative h-[450px] overflow-hidden rounded-3xl shadow-2xl md:h-[550px]">
                            <Image
                                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80"
                                alt="Hero image"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-6 -left-6 w-64 rounded-2xl bg-white p-5 shadow-xl">
                            <h3 className="mb-3 font-bold text-[#0B1F3B]">
                                Why Choose Us?
                            </h3>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div>✓ Competitive Rates</div>
                                <div>✓ Fast Approval</div>
                                <div>✓ Flexible Loans</div>
                                <div>✓ Trusted Service</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* TRUST SECTION */}
            <div className="bg-[#0B1F3B] px-6 py-14 text-white md:px-16">
                <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="flex items-center gap-3">
                        <ShieldCheckIcon className="h-5 w-5 text-[#D4A63A]" />
                        <span>Secure 256-bit Encryption</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <BanknotesIcon className="h-5 w-5 text-[#D4A63A]" />
                        <span>Trusted Financial Partner</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CheckBadgeIcon className="h-5 w-5 text-[#D4A63A]" />
                        <span>Verified Lending Platform</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <IdentificationIcon className="h-5 w-5 text-[#D4A63A]" />
                        <span>Licensed Provider</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <GlobeAmericasIcon className="h-5 w-5 text-[#D4A63A]" />
                        <span>Nationwide Coverage</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CalendarIcon className="h-5 w-5 text-[#D4A63A]" />
                        <span>Established 2019</span>
                    </div>

                </div>
            </div>

        </section>
    );
}