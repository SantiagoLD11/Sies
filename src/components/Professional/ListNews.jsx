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
      title: "Fecha de inicio",
      dataIndex: "fecha_inicio",
      key: "fecha_inicio",
      render: (fecha) => {
        return moment(fecha).format("DD / MM / YYYY");
      },
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
    },
    {
      title: "Motivo",
      dataIndex: "motivo",
      key: "motivo",
    },
    {
      title: "Días Semana",
      dataIndex: "dias_semana",
      key: "dias_semana",
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
