import ActivityPackCTA from "@/components/ActivityPackCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import PainPoints from "@/components/PainPoints";
import Pillars from "@/components/Pillars";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <PainPoints />
        <Pillars />
        <ActivityPackCTA />
        <TrustSection />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
