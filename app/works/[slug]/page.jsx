import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";

const PROJECTS = {
  "voglia-di-pizza": "Voglia di Pizza",
  "expo-energia":    "Expo Energia",
  "davveroo":        "Davveroo",
  "mi-dicriju":      "Mi Dicriju",
  "cellulopoli":     "Cellulopoli",
  "il-rudere":       "Il Rudere",
  "siri-cafe":       "Siri Café",
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const name = PROJECTS[params.slug] ?? params.slug;
  return { title: `StrategIA — ${name}` };
}

export default function ProjectPage({ params }) {
  const name = PROJECTS[params.slug] ?? params.slug;

  return (
    <LenisProvider>
      <Navbar />
      {/* Contenuto pagina progetto — da sviluppare */}
      <main style={{ minHeight: "100vh" }} />
    </LenisProvider>
  );
}
