import Badge from "@/components/ui/Badge";

type Solicitud = {
  id: number;
  fundacion: string;
  tipo: "ALIMENTO" | "PRODUCTO";
  descripcion: string;
  ciudad: string;
  urgencia: "BAJA" | "NORMAL" | "ALTA" | "CRITICA";
};

type Props = {
  solicitud: Solicitud;
  onDonar?: (solicitud: Solicitud) => void;
  mostrarAccion?: boolean;
};

export default function TarjetaSolicitud({
  solicitud,
  onDonar,
  mostrarAccion = true,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-donafy-dark">
            {solicitud.fundacion}
          </p>
          <p className="text-xs text-donafy-text/60">{solicitud.ciudad}</p>
        </div>
        <Badge value={solicitud.urgencia} variant="urgencia" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-donafy-text">
        {solicitud.tipo === "ALIMENTO" ? "Alimentos" : "Productos"}
      </h3>
      <p className="mt-2 text-sm text-donafy-text/70">
        {solicitud.descripcion}
      </p>

      {mostrarAccion && (
        <button
          type="button"
          onClick={() => onDonar?.(solicitud)}
          className="mt-6 w-full rounded-lg bg-donafy-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:opacity-90"
        >
          Donar a esta solicitud
        </button>
      )}
    </div>
  );
}
