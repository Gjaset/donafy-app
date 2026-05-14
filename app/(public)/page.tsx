import Hero from "@/components/landing/Hero";
import CifrasDashboard from "@/components/landing/CifrasDashboard";
import NuestroImpacto from "@/components/landing/NuestroImpacto";
import SolicitudesPublicas from "@/components/landing/SolicitudesPublicas";
import QuienesSomos from "@/components/landing/QuienesSomos";
import ComoFunciona from "@/components/landing/ComoFunciona";
import Transparencia from "@/components/landing/Transparencia";
import TiposDonacion from "@/components/landing/TiposDonacion";
import FormularioContacto from "@/components/landing/FormularioContacto";
import Suscripciones from "@/components/landing/Suscripciones";

export default function PublicHome() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CifrasDashboard />
      <NuestroImpacto />
      <SolicitudesPublicas />
      <QuienesSomos />
      <ComoFunciona />
      <Transparencia />
      <TiposDonacion />
      <Suscripciones />
      <FormularioContacto />
    </div>
  );
}
