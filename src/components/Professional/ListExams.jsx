import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getListExams } from '../../appRedux/services';

const ListExams = ({ id, activeKey }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async (id) => {
    setLoading(true);
    const resp = await getListExams(id);
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
      title: "Consecutivo",
      dataIndex: "nombre",
      key: "nombre",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tipo de examen",
      dataIndex: "tipo_examen",
      key: "tipo_examen",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    
  ];
  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1300 }}
      />
    </div>
  )
}

export default ListExams
