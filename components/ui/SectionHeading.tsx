import Reveal from "@/components/motion/Reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
};

export default function SectionHeading({
  index,
  title,
}: SectionHeadingProps) {
  return (
    <Reveal
      className="home-section-heading"
      distance={60}
    >
      <div className="home-section-index">
        <span className="home-section-index__slash">
          //
        </span>

        <span className="home-section-index__number">
          {index}
        </span>

        <span className="home-section-index__slash">
          //
        </span>
      </div>

      <h2 className="home-section-heading__title">
        {title}
      </h2>
    </Reveal>
  );
}