import { React, useState, useEffect } from "react";
import {
  Table,
  Button,
  Collapse,
  Tooltip,
  Form,
  DatePicker,
  Select,
  Row,
} from "antd";
import "./stylesPatient.css";
import {
  getInfoFilterNotes,
  getListEtiquetaSeguimiento,
  getListAllResultadoContacto,
} from "../../appRedux/services";
import { ViewNote } from "./ViewNote";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
const { Panel } = Collapse;

export const FiltersNotes = ({ id, activeKey }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [dataNote, setDataNote] = useState({
    Fecha_Etiqueta: null,
    Etiqueta_Seguimiento_txt: null,
    Resultado_de_Contacto_txt: null,
    Observacion_Seguimiento: null,
    Id: null,
    Etiqueta_Seguimiento_id: null,
  });
  const [loading, setLoading] = useState(false);
  const [listEtiquetaSeguimiento, setlistEtiquetaSeguimiento] = useState([]);
  const [listResultadoContacto, setListResultadoContacto] = useState([]);
  const [openModalViewNote, setOpenModalViewNote] = useState(false);

  const getData = async () => {
    const resp = await getInfoFilterNotes(
      "Nada",
      {
        fecha_etiqueta: null,
        Etiqueta_seguimiento: null,
        Resultado_contacto: null,
      },
      id
    );
    setData(resp);
    console.log("data preferencias", resp);
  };

  const getlist = async () => {
    const EtiquetaSeguimiento = await getListEtiquetaSeguimiento();
    setlistEtiquetaSeguimiento(EtiquetaSeguimiento);
    const ResultadoContacto = await getListAllResultadoContacto();
    setListResultadoContacto(ResultadoContacto);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const onSubmit = async (values) => {
    setLoading(true);
    const fecha = new Date(values?.fecha_etiqueta);
    fecha.setHours(0, 0, 0, 0);
    const SecondFecha = new Date(values?.fecha_etiqueta);
    SecondFecha.setHours(23, 59, 59, 999);
    let resp;
    const final_values = {
      fecha_etiqueta: formatDate(fecha),
      second_fecha: formatDate(SecondFecha),
      Etiqueta_seguimiento: values?.Etiqueta_seguimiento,
      Resultado_contacto: values?.Resultado_contacto,
    };
    if (
      values.fecha_etiqueta !== undefined &&
      values.Etiqueta_seguimiento !== undefined &&
      values.Resultado_contacto !== undefined
    ) {
      resp = await getInfoFilterNotes("Todo", final_values, id);
      setData(resp);
    } else if (
      values.fecha_etiqueta !== undefined &&
      values.Etiqueta_seguimiento === undefined &&
      values.Resultado_contacto === undefined
    ) {
      resp = await getInfoFilterNotes("Fecha", final_values, id);
      setData(resp);
    } else if (
      values.fecha_etiqueta === undefined &&
      values.Etiqueta_seguimiento !== undefined &&
      values.Resultado_contacto === undefined
    ) {
      resp = await getInfoFilterNotes("Seguimiento", final_values, id);
      setData(resp);
    } else if (
      values.fecha_etiqueta === undefined &&
      values.Etiqueta_seguimiento === undefined &&
      values.Resultado_contacto !== undefined
    ) {
      resp = await getInfoFilterNotes("Contacto", final_values, id);
      setData(resp);
    } else if (
      values.fecha_etiqueta !== undefined &&
      values.Etiqueta_seguimiento !== undefined &&
      values.Resultado_contacto === undefined
    ) {
      resp = await getInfoFilterNotes("Fecha_Seguimiento", final_values, id);
      setData(resp);
    } else if (
      values.fecha_etiqueta !== undefined &&
      values.Etiqueta_seguimiento === undefined &&
      values.Resultado_contacto !== undefined
    ) {
      resp = await getInfoFilterNotes("Fecha_Contacto", final_values, id);
      setData(resp);
    } else if (
      values.fecha_etiqueta === undefined &&
      values.Etiqueta_seguimiento !== undefined &&
      values.Resultado_contacto !== undefined
    ) {
      resp = await getInfoFilterNotes("Seguimiento_Contacto", final_values, id);
      setData(resp);
    } else if (
      values.fecha_etiqueta === undefined &&
      values.Etiqueta_seguimiento === undefined &&
      values.Resultado_contacto === undefined
    ) {
      getData();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getData();
      getlist();
    }
  }, []);

  const columns = [
    {
      title: "Fecha Etiqueta",
      dataIndex: "Fecha_Etiqueta",
      key: "Fecha_Etiqueta",
      render: (text) =><strong>{moment(text).format("DD/MM/YYYY")}</strong> ,
    },
    {
      title: "Etiqueta Seguimiento",
      dataIndex: "Etiqueta_Seguimiento_txt",
      key: "Etiqueta_Seguimiento_txt",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Resultado de Contacto",
      dataIndex: "Resultado_de_Contacto_txt",
      key: "Resultado_de_Contacto_txt",
      render: (text) => <>{text}</>,
    },
    {
      title: "Observación Seguimiento",
      dataIndex: "Observacion_Seguimiento",
      key: "Observacion_Seguimiento",
    },
    {
      title: "Acciones",
      key: "action",
      align: "center",
      render: (data) => {
        return (
          // <Tooltip
          //   trigger="click"
          //   placement="top"
          //   color="#ffff"
          //   title={
          //     <>
          <Tooltip title={"Ver"}>
            <Button
              onClick={async () => {
                console.log("Sirve ver", data);
                setOpenModalViewNote(true);
                setDataNote(data);
              }}
            >
              <EyeOutlined />
            </Button>
          </Tooltip>
          //     </>
          //   }
          // >
          //   <Button>
          //     <DownSquareOutlined />
          //   </Button>
          // </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <ViewNote
        open={openModalViewNote}
        setOpen={setOpenModalViewNote}
        dataNote={dataNote}
        idPaciente={id}
      />
      <Collapse>
        <Panel header={<strong>Filtros Notas</strong>} key="1">
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
              <Form.Item label="Fecha Etiqueta" name="fecha_etiqueta">
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Etiqueta Seguimiento"
                name="Etiqueta_seguimiento"
                style={{ width: "20%" }}
              >
                <Select options={listEtiquetaSeguimiento} />
              </Form.Item>
              <Form.Item
                label="Resultado Contacto"
                name="Resultado_contacto"
                style={{ width: "20%" }}
              >
                <Select options={listResultadoContacto} />
              </Form.Item>
              <div
                key="button-actions"
                className="d-flex justify-content-end me-4"
              >
                <Button type="primary" onClick={form.submit}>
                  Filtrar
                </Button>
                <Button
                  htmlType="submit"
                  onClick={() => {
                    form.resetFields();
                    setData([]);
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </Row>
          </Form>
        </Panel>
      </Collapse>
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1300 }}
      />
    </>
  );
};
