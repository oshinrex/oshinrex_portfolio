import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SiteStars } from "@/components/site-stars";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
      <div className="relative">
        <SiteStars />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
