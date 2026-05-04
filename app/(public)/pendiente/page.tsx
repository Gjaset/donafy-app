export default function PendientePage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-donafy-cream px-4 py-20">
      <div className="max-w-xl rounded-2xl bg-white p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-donafy-text">
          Tu solicitud esta en revision
        </h1>
        <p className="mt-4 text-sm text-donafy-text/70">
          Tu solicitud esta siendo revisada por nuestro equipo. Te
          notificaremos cuando sea aprobada.
        </p>
      </div>
    </div>
  );
}
