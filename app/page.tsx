import DemoSection from "@/components/home/demo-section";
import { Footer } from "@/components/home/footer";
import HeroSection from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import Pricing from "@/components/home/pricing";
import { ensureUserInDb } from "./actions/upload-action";

export default async function Home() {
  
  await ensureUserInDb();

  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <HeroSection/>
        <DemoSection/>
        <HowItWorks/>
        <Pricing/>
        <Footer/>
      </div>
    </div>
  );
}
