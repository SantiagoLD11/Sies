import { Card, Table } from "antd";
import { React, useEffect, useState } from "react";
import { listHistoricoBloqueos } from "../appRedux/services";
import { CreateLock } from "./CreateLock";
import moment from "moment";
require("moment-timezone");
const ListProfesional = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const resp = await listHistoricoBloqueos();
    setLoading(false);
    setData(resp);
  };

  useEffect(() => {
    onSubmit();
  }, []);

  const columns = [
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Nombres
        </span>
      ),
      dataIndex: "nombres",
      key: "nombres",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha/Hora Creacion
        </span>
      ),
      dataIndex: "creadoEn",
      key: "creadoEn",
      render: (text) => moment(text).format("DD/MM/YYYY HH:mm a"),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha inicio
        </span>
      ),
      dataIndex: "fecha_inicio",
      key: "fecha_inicio",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha final
        </span>
      ),
      dataIndex: "fecha_final",
      key: "fecha_final",
      render: (text) => <strong>{moment(text).format("DD/MM/YYYY")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Hora inicio
        </span>
      ),
      dataIndex: "hora_inicio",
      key: "hora_inicio",
      render: (text) => {
        const horas = Math.floor(text / 3600000); // 3600000 milisegundos en una hora
        const minutos = Math.floor((text % 3600000) / 60000); // 60000 milisegundos en un minuto
        const hora24 = `${(horas < 10 ? "0" : "") + horas}:${
          (minutos < 10 ? "0" : "") + minutos
        }`;
        return hora24;
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Hora final
        </span>
      ),
      key: "hora_final",
      dataIndex: "hora_final",
      render: (text) => {
        const horas = Math.floor(text / 3600000); // 3600000 milisegundos en una hora
        const minutos = Math.floor((text % 3600000) / 60000); // 60000 milisegundos en un minuto
        const hora24 = `${(horas < 10 ? "0" : "") + horas}:${
          (minutos < 10 ? "0" : "") + minutos
        }`;
        return hora24;
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Tipo novedad
        </span>
      ),
      dataIndex: "tipo_novedad",
      key: "tipo_novedad",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Motivo
        </span>
      ),
      dataIndex: "motivo",
      key: "motivo",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Días Semana
        </span>
      ),
      dataIndex: "dias_semana",
      key: "dias_semana",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Creado Por
        </span>
      ),
      dataIndex: "creadoPor",
      key: "creadoPor",
    }
  ];

  return (
    <>
      <CreateLock setData={setData} onSubmit={onSubmit} />
      <Card>
        <Table
          columns={columns}
          loading={loading}
          dataSource={data}
          scroll={{ x: 1300 }}
        />
      </Card>
    </>
  );
};

export default ListProfesional;
