import { React, useState, useEffect } from "react";
import { Table, Button, Tooltip, Tag, message } from "antd";
import "./stylesPatient.css";
import {
  DownSquareOutlined,
  EyeOutlined,
  DeleteOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  getRemissionQuotes,
} from "../../appRedux/services";
import moment from "moment";
import { tagStatusRemQuotes } from "../../constants/Tags";

export const RemissionQuotes = ({ id, activeKey }) => {
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const resp = await getRemissionQuotes(id,null);
    setData(resp);
    console.log("data Remisiones", resp);
  };

  useEffect(() => {
    if (id && activeKey == "3") {
      getData();
    }
  }, [id, activeKey]);

  const columns = [
    {
      title: "Secuencia",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Fecha Cita",
      dataIndex: "Fecha_Cita",
      key: "Fecha_Cita",
      render: (text) => <strong>{moment(text).format("DD/MM/YYYY HH:MM")}</strong>,
    },
    {
      title: "Especialidad",
      dataIndex: "Especialidad_txt",
      key: "Especialidad_txt",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Mes Remision",
      dataIndex: "MesRemision",
      key: "MesRemision",
      render: (text) => <>{text}</>,
    },
    {
      title: "Canal Atención",
      dataIndex: "CanalRemision",
      key: "CanalRemision",
    },
    {
      title: "Remitente",
      dataIndex: "Remitente_txt",
      key: "Remitente_txt",
    },
    {
      title: "Resultado",
      dataIndex: "Resultado",
      key: "Resultado",
    },
    {
      title: "Estado",
      dataIndex: "Estado_txt",
      render: (text) => (
        <Tag
          style={{ width: "100%" }}
          color={tagStatusRemQuotes[text]?.color}
        >
          {text}
        </Tag>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1100 }}
      />
    </>
  );
};
