import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

export const tagStatus = {
  1: {
    color: "#ff69b4",
    icon: <CheckCircleOutlined />,
    text: "Disponible",
  },
  2: {
    color: "#c0c0c0",
    icon: <CloseCircleOutlined />,
    text: "Bloqueado",
  },
  3: {
    color: "#BDCA44",
    icon: <InfoCircleOutlined />,
    text: "Asignado Cita",
  },
  4: {
    color: "#F14040",
    icon: <StopOutlined />,
    text: "Eliminado",
  },
};

export const tagStatus2 = {
  0: {
    0: {
      color: "#37FC0F",
      text: "No esta pendiente",
    },
    1: { color: "#FF2929", text: "Rechazado" },
  },
  1: {
    0: {
      color: "#FF8A8A",
      text: "Pendiente",
    },
    1: { color: "#FF0000", text: "Error" },
  },
};

export const tagStatus3 = {
  Asistida: {
    color: "#7AD3FF",
    text: "Disponible",
  },
  Solicitada: {
    color: "#92FF33",
    text: "Bloqueado",
  },
  Creada: {
    color: "#F5EA53",
    text: "Asignado Cita",
  },
  "No Asistida": {
    color: "#D8ABFF ",
    text: "Eliminado",
  },
  Cancelado: {
    color: "#C4A5AD",
    text: "Cancelado",
  },
  Reprogramada: {
    color: "#FCB3FF",
    text: "Reprogramada",
  },
};

export const tagStatus4 = {
  Creado: {
    color: "#62a864",
    text: "Creado",
  },
  Inactivo: {
    color: "#BFBFBF",
    text: "Inactivo",
  },
  Programado: {
    color: "#00ABC8",
    text: "Programado",
  },
};

export const tagStatusCPView = {
  Activo: {
    color: "#62a864",
    text: "Activo",
  },
  Inactivo: {
    color: "#BFBFBF",
    text: "Inactivo",
  },
};