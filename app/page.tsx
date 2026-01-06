import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Doctors from "@/components/home/Doctors";
import Contact from "@/components/home/Contact";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Testimonials />
      <Doctors />
      <FAQ />
      <Contact />
    </>
  );
}
