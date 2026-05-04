"use client";

import { useState } from "react";

type Usuario = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
};

const roles = [
  "ADMIN",
  "FUNDACION",
  "DONANTE",
  "CIUDADANO",
  "PENDIENTE_APROBACION",
];

const initialUsers: Usuario[] = [
  {
    id: 1,
    nombre: "Laura Perez",
    email: "laura@mail.com",
    rol: "DONANTE",
    activo: true,
  },
  {
    id: 2,
    nombre: "Fundacion Esperanza",
    email: "contacto@fundacion.com",
    rol: "FUNDACION",
    activo: true,
  },
  {
    id: 3,
    nombre: "Carlos Ruiz",
    email: "carlos@mail.com",
    rol: "CIUDADANO",
    activo: false,
  },
];

export default function UsuariosPage() {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleChange = (id: number, role: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, rol: role } : user))
    );
  };

  const toggleActive = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, activo: !user.activo } : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-donafy-text">Usuarios</h1>
        <p className="mt-2 text-sm text-donafy-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-donafy-cream text-xs uppercase text-donafy-text/70">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-donafy-gray/20">
                <td className="px-4 py-3 font-medium text-donafy-text">
                  {user.nombre}
                </td>
                <td className="px-4 py-3 text-donafy-text/70">
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={user.rol}
                    onChange={(event) =>
                      handleRoleChange(user.id, event.target.value)
                    }
                    className="rounded-lg border border-donafy-gray/60 bg-white px-2 py-1 text-xs"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs">
                  {user.activo ? "Activo" : "Suspendido"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggleActive(user.id)}
                    className="rounded-lg border border-donafy-dark px-3 py-1 text-xs font-semibold text-donafy-dark transition-all duration-200 ease-in-out hover:bg-donafy-dark hover:text-white"
                  >
                    {user.activo ? "Suspender" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
