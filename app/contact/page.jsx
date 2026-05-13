import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";

export const metadata = {
  title: "StrategIA — Contact",
};

export default function Contact() {
  return (
    <LenisProvider>
      <Navbar />
      <ContactPage />
    </LenisProvider>
  );
}
