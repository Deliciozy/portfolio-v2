import Image from "next/image";

import HeroWarpBackground from "@/components/backgrounds/HeroWarpBackground";

import {
  aboutHero,
} from "@/data/about";

export default function AboutHero() {
  return (
    <header className="about-hero">
      <HeroWarpBackground />

      <div className="about-hero__row">
        <div className="about-hero__text">
          <h1 className="about-hero__title">
            {aboutHero.title}
          </h1>

          <div className="about-hero__body">
            <h3 className="about-hero__subtitle">
              {
                aboutHero.subtitle
              }
            </h3>

            <p>
              {
                aboutHero
                  .paragraphs[0]
              }
            </p>

            <p>
              {
                aboutHero
                  .paragraphs[1]
              }
            </p>
          </div>
        </div>

        <div className="about-hero__media">
          <Image
            src={
              aboutHero.image
            }
            alt={
              aboutHero.imageAlt
            }
            width={355}
            height={473}
            priority
            className="about-hero__image"
          />
        </div>
      </div>
    </header>
  );
}