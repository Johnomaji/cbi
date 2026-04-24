import { getSiteSettings } from "@/lib/data";
import HeroSlider from "./HeroSlider";

export default async function Hero() {
  const s = await getSiteSettings();
  return (
    <HeroSlider
      heroTagline={s.heroTagline}
      heroHeading={s.heroHeading}
      heroDescription={s.heroDescription}
      heroStat1Value={s.heroStat1Value} heroStat1Label={s.heroStat1Label}
      heroStat2Value={s.heroStat2Value} heroStat2Label={s.heroStat2Label}
      heroStat3Value={s.heroStat3Value} heroStat3Label={s.heroStat3Label}
    />
  );
}
