import { useAuth } from "../authentication";

export const Roles = {
  1: 39842524,
  2: 39842525,
  3: 39842526,
};

export const Permiso = () => {
  const { authUser } = useAuth();
  let Permisos = authUser?.cargo === Roles[1] || Roles[2];
  return Permisos;
};
