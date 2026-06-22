import Advantages from "@/Components/Advantages/Advantages";
import CTASection from "@/Components/CTASection/Ctasection";
import FAQs from "@/Components/FAQ/FAQ";
import GivingBack from "@/Components/GivingBack/Givingback";
import Hero from "@/Components/Hero/Hero";
import Process from "@/Components/howitworks/Howitwork";
import LoanApplication from "@/Components/LoanApplication/LoanApplication";
import Navbar from "@/Components/Navbar/Navbar";
import Stats from "@/Components/Stats/Stats";
import ClientReviews from "@/Components/Testimonials/ClientReviews";
import Footer from "@/Components/Footer/Footer";


export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Advantages />
      <Process />
      <Stats />
      <GivingBack />
      <ClientReviews />
      <FAQs />
      <LoanApplication />
      <CTASection />
      <Footer />
    </main>
  );
}