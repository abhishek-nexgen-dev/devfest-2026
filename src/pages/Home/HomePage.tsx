import { Navbar } from "../../components/Navbar/Navbar";
import { HeroSection } from "../../components/Hero/HeroSection";
import { WhatIsDevFestSection } from "../../components/WhatIsDevFest/WhatIsDevFestSection";
import { TracksSection } from "../../components/Tracks/TracksSection";
import { SpeakersSection } from "../../components/Speakers/SpeakersSection";
import { PreviousDevFestSection } from "../../components/PreviousDevFest/PreviousDevFestSection";
import { CommunitySection } from "../../components/Community/CommunitySection";
import { CommunityMomentsSection } from "../../components/CommunityMoments/CommunityMomentsSection";
import { TeamSection } from "../../components/Team/TeamSection";
import { PartnersSection } from "../../components/Partners/PartnersSection";
import { RanchiSection } from "../../components/Ranchi/RanchiSection";
import { FAQSection } from "../../components/FAQ/FAQSection";
import { FinalCTASection } from "../../components/FinalCTA/FinalCTASection";
import { Footer } from "../../components/Footer/Footer";

interface HomePageProps {
  onOpenAgenda?: () => void;
}

export function HomePage({ onOpenAgenda }: HomePageProps = {}) {
  return (
    <div className="bg-dark-bg min-h-screen text-gray-100 font-sans selection:bg-brand-blue selection:text-white">
      <Navbar onNavigateAgenda={onOpenAgenda} />
      <main>
        <HeroSection />
        <WhatIsDevFestSection />
        <TracksSection />
        <SpeakersSection />
        <PreviousDevFestSection />
        <CommunitySection />
        <CommunityMomentsSection />
        <TeamSection />
        <PartnersSection />
        <RanchiSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
