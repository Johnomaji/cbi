import NavTopBar from "./components/NavTopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import ExecutiveMessage from "./components/ExecutiveMessage";
import Stats from "./components/Stats";
import SuccessStories from "./components/SuccessStories";
import TeamPreview from "./components/TeamPreview";
import Testimonials from "./components/Testimonials";
import Partners from "./components/Partners";
import Donate from "./components/Donate";
import Footer from "./components/Footer";
import { getStats, getTeam } from "@/lib/data";

export default async function Home() {
  const [statsData, teamData] = await Promise.all([getStats(), getTeam()]);

  return (
    <>
      <NavTopBar />
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <ExecutiveMessage />
        <Stats items={statsData.items} />
        <SuccessStories />
        <TeamPreview members={teamData} />
        <Testimonials />
        <Partners />
        <Donate />
      </main>
      <Footer />
    </>
  );
}
