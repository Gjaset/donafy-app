import Sidebar from "@/components/dashboard/Sidebar";

const items = [
  { label: "Inicio", href: "/ciudadano/dashboard" },
  { label: "Solicitudes", href: "/ciudadano/dashboard/solicitudes" },
  { label: "Mi perfil", href: "/ciudadano/dashboard/perfil" },
];

type Props = {
  children: React.ReactNode;
};

export default function CiudadanoLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-donafy-cream">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:px-8">
        <Sidebar title="Ciudadano" items={items} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
