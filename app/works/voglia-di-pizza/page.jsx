import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import VogliaDiPizza from "@/components/VogliaDiPizza";

export const metadata = {
  title: "StrategIA — Voglia di Pizza",
};

export default function VogliaDiPizzaPage() {
  return (
    <LenisProvider>
      <Navbar />
      <VogliaDiPizza />
    </LenisProvider>
  );
}
