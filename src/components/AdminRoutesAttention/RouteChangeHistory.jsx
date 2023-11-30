import { React, useState, useEffect } from "react";
import { Table, Collapse, Form, Row, Select, Button, Tooltip, DatePicker } from "antd";
import {
  getListChangeHistory,
  getListTypeAction,
  getListAsegurador,
  getListProgramas,
  getListSede,
  getListEspecialidad,
  getInfoFilterChangesRoutes,
} from "../../appRedux/services";
import { EyeOutlined, MoreOutlined } from "@ant-design/icons";
import {SelectMeses} from "../../constants/Months";
const { Panel } = Collapse;

export const RouteChangeHistory = ({ activeKey }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listTypeAction, setListTypeAction] = useState(null);
  const [listAsegurador, setListAsegurador] = useState(null);
  const [listProgramas, setListProgramas] = useState(null);
  const [listSede, setListSede] = useState(null);
  const [listProfesion, setListProfesion] = useState(null);

  const getData = async () => {
    setLoading(true);
    const resp = await getListChangeHistory();
    setData(resp);
    const respu = await getListTypeAction();
    setListTypeAction(respu);
    const respue = await getListAsegurador();
    setListAsegurador(respue);
    const respues = await getListProgramas();
    setListProgramas(respues);
    const respuest = await getListSede();
    setListSede(respuest);
    const respuesta = await getListEspecialidad();
    setListProfesion(respuesta);
    setLoading(false);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    const resp = await getInfoFilterChangesRoutes(values);
    setData(resp);
    setLoading(false);
  };

  const columns = [
    {
      title: "Fecha",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Tipo Acción",
      dataIndex: "Tipo_Accion_txt",
      key: "Tipo_Accion_txt",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Contrato Plan",
      dataIndex: "Contrato_Plan_txt",
      key: "Contrato_Plan_txt",
    },
    {
      title: "Profesion",
      dataIndex: "Filtro_Profesion",
      key: "Filtro_Profesion",
    },
    {
      title: "Filtro Sede",
      dataIndex: "Filtro_Sede",
      key: "Filtro_Sede",
    },
    {
      title: "Meses Atencion",
      dataIndex: "Meses",
      key: "Meses",
    },
    {
      title: "Año",
      dataIndex: "Mover_yyy_de",
      key: "Mover_yyy_de",
    },
    {
      title: "Mover Mes de",
      dataIndex: "Mover_Mes_de",
      key: "Mover_Mes_de",
    },
    {
      title: "Mover Año a",
      dataIndex: "Mover_yyy_a",
      key: "Mover_yyy_a",
    },
    {
      title: "Mover Mes a",
      dataIndex: "Mover_Mes_a",
      key: "Mover_Mes_a",
    },
    {
      title: "Respuesta",
      dataIndex: "Respuesta",
      key: "Respuesta",
    },
    {
      title: "Creado Por",
      dataIndex: "CreadoPor",
      key: "CreadoPor",
      render: (text) => <strong>{text}</strong>,
    }
  ];

  useEffect(() => {
    if (activeKey == 2) {
      getData();
    }
  }, [activeKey]);

  return (
    <>
      <Collapse style={{ marginBottom: "20px" }}>
        <Panel header={<strong>Filtros Cambios Rutas</strong>} key="1">
          <Form
            colon={false}
            onFinish={onSubmit}
            form={form}
            autoComplete="off"
            layout="vertical"
          >
            <Row
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Form.Item
                label="Tipo acción"
                name="tipoAccion"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un tipo"
                  options={listTypeAction}
                />
              </Form.Item>
              <Form.Item
                label="Asegurador"
                name="asegurador"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un asegurador"
                  options={listAsegurador}
                />
              </Form.Item>
              <Form.Item
                label="Programas"
                name="programas"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un programa"
                  options={listProgramas}
                />
              </Form.Item>
              <Form.Item label="Sede" name="sede" style={{ width: "20%" }}>
                <Select placeholder="Seleccione una sede" options={listSede} />
              </Form.Item>
            </Row>
            <Row
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Form.Item
                label="Profesión"
                name="profesion"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione una profesión"
                  options={listProfesion}
                />
              </Form.Item>
              <Form.Item label="Fecha" name="fecha" style={{ width: "20%" }}>
                <DatePicker
                  format="YYYY/MM/DD"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Mover mes de:"
                name="mesDe"
                style={{ width: "20%" }}
              >
                <Select placeholder="Seleccione un mes" options={SelectMeses} />
              </Form.Item>
              <Form.Item
                label="Mover mes a:"
                name="mesA"
                style={{ width: "20%" }}
              >
                <Select placeholder="Seleccione un mes" options={SelectMeses} />
              </Form.Item>
            </Row>
            <div
              key="button-actions"
              className="d-flex justify-content-end me-4"
            >
              <Button type="primary" onClick={form.submit}>
                Filtrar
              </Button>
              <Button
                  onClick={() => {
                    form.resetFields();
                    setLoading(true);
                    getData();
                    setLoading(false);
                  }}
              >
                Limpiar Filtros
              </Button>
            </div>
          </Form>
        </Panel>
      </Collapse>
      <Table
        loading={loading}
        scroll={{ x: "100%" }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
