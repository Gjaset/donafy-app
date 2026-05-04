type Props = {
  label?: string;
};

export default function Loader({ label = "Cargando..." }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm text-donafy-text/70">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-donafy-light border-t-donafy-dark" />
      <span>{label}</span>
    </div>
  );
}
