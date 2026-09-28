import Navbar from "@/components/ui/Navbar";

export default function ResumePage() {
  return (
    <main className="resume-page">
      <Navbar />

      <img
        src="/images/framer-original/resume/image-01.svg"
        alt="Mary Chen Resume"
        className="resume-page__image"
      />
    </main>
  );
}