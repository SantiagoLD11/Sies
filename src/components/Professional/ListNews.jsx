import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getListNews } from "../../appRedux/services";

const ListNews = ({ id, activeKey}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async (id) => {
    setLoading(true);
    const resp = await getListNews(id);
    setData(resp);
    setLoading(false);
  };

  useEffect(() => {
    if (id && activeKey === '3') {
      getData(id);
    }
  }, [id, activeKey]);

  const columns = [
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
      title: "Fecha de inicio",
      dataIndex: "fecha_inicio",
      key: "fecha_inicio",
      render: (text) => <strong>{moment(text).format("DD / MM / YYYY")}</strong>
      ,
    },
    {
      title: "Fecha final",
      dataIndex: "fecha_final",
      key: "fecha_final",
      render: (fecha) => {
        return moment(fecha).format("DD / MM / YYYY");
      },
    },
    {
      title: "Hora de inicio",
      dataIndex: "hora_inicio",
      key: "hora_inicio",
      render: (value) => {
        const horas = Math.floor(value / 3600000); // 3600000 milisegundos en una hora
        const minutos = Math.floor((value % 3600000) / 60000); // 60000 milisegundos en un minuto
        const hora24 = `${(horas < 10 ? "0" : "") + horas}:${
          (minutos < 10 ? "0" : "") + minutos
        }`;
        return hora24;
      },
    },
    {
      title: "Hora final",
      key: "hora_final",
      dataIndex: "hora_final",
      render: (value) => {
        const horas = Math.floor(value / 3600000); // 3600000 milisegundos en una hora
        const minutos = Math.floor((value % 3600000) / 60000); // 60000 milisegundos en un minuto
        const hora24 = `${(horas < 10 ? "0" : "") + horas}:${
          (minutos < 10 ? "0" : "") + minutos
        }`;
        return hora24;
      },
    },
    {
      title: "Tipo de agenda",
      dataIndex: "tipo_agenda",
      key: "tipo_agenda",
      render: (text) =><strong>{text}</strong>,
      
    },
    {
      title: "Motivo",
      dataIndex: "motivo",
      key: "motivo"
    },
    {
      title: "Días Semana",
      dataIndex: "dias_semana",
      key: "dias_semana"
    },
    {
      title: "Creado Por",
      dataIndex: "creadoPor",
      key: "creadoPor",
      render: (text) =><strong>{text}</strong>,
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1300 }}
      />
    </>
  );
};

export default ListNews;
