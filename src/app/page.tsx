"use client";

import dynamic from "next/dynamic";
import { ScrollSequence } from "@/components/animation/ScrollSequence";
import { HeroStage } from "@/components/hero/HeroStage";
import { AboutEditorial } from "@/components/sections/AboutEditorial";
import { CodeToProduct } from "@/components/sections/CodeToProduct";
import { SystemArchitecture } from "@/components/sections/SystemArchitecture";
import { ContactCinematic } from "@/components/sections/ContactCinematic";

const ScrollGlobe = dynamic(
  () => import("@/components/globe/ScrollGlobe").then((mod) => mod.ScrollGlobe),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      <section className="relative z-0 -mt-20 w-full bg-black">
        <ScrollSequence
          frameCount={192}
          folderPath="/assets"
          playOnce={false}
        >
          {(progress) => <HeroStage progress={progress} />}
        </ScrollSequence>
      </section>

      <ScrollGlobe />

      <AboutEditorial />

      <CodeToProduct />

      <SystemArchitecture />

      <ContactCinematic />
    </div>
  );
}
