import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getListSedes } from "../../appRedux/services";

const ListSedes = ({ id, activeKey }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async (id) => {
    setLoading(true);
    const resp = await getListSedes(id);
    setData(resp);
    setLoading(false);
  };

  useEffect(() => {
    if (id && activeKey === '2') {
      getData(id);
    }
  }, [id, activeKey]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    // {
    //   title: "Id sede",
    //   dataIndex: "id_gomedisys",
    //   key: "id_gomedisys",
    // },
    // {
    //   title: "Código de la oficina",
    //   dataIndex: "codigo_oficina",
    //   key: "codigo_oficina",
    // },
    // {
    //   title: "Sede",
    //   key: "sede",
    //   dataIndex: "sede",
    // },
    // {
    //   title: "Profesión",
    //   dataIndex: "profesion",
    //   key: "profesion",
    // },
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

export default ListSedes;
