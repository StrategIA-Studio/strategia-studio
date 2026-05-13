import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import IlRudere from "@/components/IlRudere";

export const metadata = {
  title: "StrategIA — Il Rudere",
};

export default function IlRuderePage() {
  return (
    <LenisProvider>
      <Navbar />
      <IlRudere />
    </LenisProvider>
  );
}
