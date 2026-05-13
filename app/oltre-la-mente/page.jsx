import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import OltreLaMente from "@/components/OltreLaMente";

export const metadata = {
  title: "StrategIA — Oltre La Mente",
};

export default function OltreLaMentePage() {
  return (
    <LenisProvider>
      <Navbar />
      <OltreLaMente />
    </LenisProvider>
  );
}
