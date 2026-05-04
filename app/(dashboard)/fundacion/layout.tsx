import Sidebar from "@/components/dashboard/Sidebar";

const items = [
  { label: "Inicio", href: "/fundacion/dashboard" },
  { label: "Mis solicitudes", href: "/fundacion/dashboard/solicitudes" },
  { label: "Nueva solicitud", href: "/fundacion/dashboard/solicitudes#nueva" },
  { label: "Mi perfil", href: "/fundacion/dashboard/perfil" },
];

type Props = {
  children: React.ReactNode;
};

export default function FundacionLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-donafy-cream">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:px-8">
        <Sidebar title="Fundacion" items={items} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
