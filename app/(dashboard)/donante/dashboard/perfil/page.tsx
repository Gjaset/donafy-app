export default function DonantePerfilPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-donafy-text">Mi perfil</h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Aquí puedes actualizar tu información personal, preferencias de donación y ver el historial de tu impacto social.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <p className="text-sm text-donafy-text/70">
          Tu perfil en Donafy es tu identidad como donante verificado. Mantén tus datos actualizados para recibir oportunidades de donación personalizadas, certificados fiscales y actualizaciones sobre el impacto de tus contribuciones en instituciones vulnerables.
        </p>
      </div>
    </div>
  );
}
