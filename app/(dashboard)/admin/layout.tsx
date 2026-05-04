import Sidebar from "@/components/dashboard/Sidebar";

const items = [
  { label: "Inicio", href: "/admin/dashboard" },
  { label: "Usuarios", href: "/admin/dashboard/usuarios" },
  { label: "Fundaciones", href: "/admin/dashboard/fundaciones" },
  { label: "Donaciones", href: "/admin/dashboard/donaciones" },
  { label: "Reportes", href: "/admin/dashboard/reportes" },
];

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-donafy-cream">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:px-8">
        <Sidebar title="Admin" items={items} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
