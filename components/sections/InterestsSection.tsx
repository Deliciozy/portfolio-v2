/* eslint-disable @next/next/no-img-element */

import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

import styles from "./InterestsSection.module.css";

const interests = [
  {
    title: "Photography",

    description:
      "Back in college, I had my very first video camera, which I fondly named Ruby. She wasn’t just a gadget to me—I saw her as a companion. Wherever I went, Ruby came along, and together we discovered, recorded, and shared the beauty of the world around us.",

    image:
      "https://framerusercontent.com/images/b05Y0G5iqYDqJ0zAYEAEbrWsjvg.png?width=1288&height=1364",
  },

  {
    title: "Crochet",

    description:
      "I enjoy crocheting because I love the simple joy of patiently pulling loops through one another and, little by little, ending up with something whole and meaningful. Whenever I crochet, I feel a bit like a craftsperson, gently telling my own story through the twists and turns of the yarn.",

    image:
      "https://framerusercontent.com/images/wXR6Vbv6yOHfKnMoZFh9MZy3zQ.png?width=1288&height=1364",
  },

  {
    title: "Reading",

    description:
      "To me, books are like close friends—they give me comfort and sometimes inspire me. Every time I open a book, it feels like stepping into another world. I get to live inside the stories, see life through the author’s eyes, as if we’re exploring the world together.",

    image:
      "https://framerusercontent.com/images/YrQvZIcRzdAytFmiv4iGG2C0aR4.png?width=1288&height=1364",
  },
];

export default function InterestsSection() {
  return (
    <section className={styles.section}>
      <div className="about-section-container">
        <SectionHeading
          index="02"
          title="Interests"
        />

        <div className={styles.grid}>
          {interests.map(
            (
              interest,
              index,
            ) => (
              <Reveal
                key={interest.title}
                className={styles.card}
                delay={index * 0.06}
                distance={20}
              >
                <div className={styles.media}>
                  <div className={styles.imageFrame}>
                    <img
                      src={interest.image}
                      alt={interest.title}
                      className={styles.image}
                    />
                  </div>
                </div>

                <div className={styles.content}>
                  <h3 className={styles.title}>
                    {interest.title}
                  </h3>

                  <p className={styles.description}>
                    {interest.description}
                  </p>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}