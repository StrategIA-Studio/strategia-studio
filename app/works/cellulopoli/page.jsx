import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Cellulopoli from "@/components/Cellulopoli";

export const metadata = {
  title: "StrategIA — Cellulopoli",
};

export default function CellulopoPage() {
  return (
    <LenisProvider>
      <Navbar />
      <Cellulopoli />
    </LenisProvider>
  );
}
