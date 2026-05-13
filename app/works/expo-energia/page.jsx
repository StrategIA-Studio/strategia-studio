import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import ExpoEnergia from "@/components/ExpoEnergia";

export const metadata = {
  title: "StrategIA — Expo Energia",
};

export default function ExpoEnergiaPage() {
  return (
    <LenisProvider>
      <Navbar />
      <ExpoEnergia />
    </LenisProvider>
  );
}
