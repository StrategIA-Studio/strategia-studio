import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import SiriCafe from "@/components/SiriCafe";

export const metadata = {
  title: "StrategIA — Siri Café",
};

export default function SiriCafePage() {
  return (
    <LenisProvider>
      <Navbar />
      <SiriCafe />
    </LenisProvider>
  );
}
