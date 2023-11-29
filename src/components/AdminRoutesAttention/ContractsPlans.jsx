import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Table,
  Collapse,
  Tooltip,
  Button,
  Select,
  Row,
  Form,
  Checkbox,
  Tag,
} from "antd";
import {
  getListContractsPlans,
  inactivarContratoPlan,
  getListEstadio,
  getListContrato,
  getListEspecialidad,
  getListClaseExam,
  getInfoFilterContratPlans,
  getListEstadosContratoPlan,
  getListTipoIngreso,
  getListCanalAtencion,
  getListEtiquetasAdmin,
  getListEtAsistencial,
  getlistSexoNacer,
  getListSubProgramas,
  getListSede,
  getListBimTrim,
  getListBomba,
} from "../../appRedux/services";
import { ViewAndEdit } from "../Underwriters/ViewAndEdit";
import {
  EyeOutlined,
  EditOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { tagStatusCPView } from "../../constants/Tags";
const { Panel } = Collapse;

export const ContractsPlans = ({ activeKey }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [view, setView] = useState(true);
  const [idContract, setIdContract] = useState(null);
  const [listEstadio, setListEstadio] = useState(null);
  const [listContrato, setListContrato] = useState(null);
  const [listProfesion, setListProfesion] = useState(null);
  const [listClaseExamen, setListClaseExamen] = useState(null);
  const [listSedes, setListSedes] = useState(null);
  const [listGenero, setListGenero] = useState(null);
  const [listEtiquetasAsis, setListEtiquetasAsis] = useState(null);
  const [listTipoIngreso, setListTipoIngreso] = useState(null);
  const [listEtiquetasAdmin, setListEtiquetasAdmin] = useState(null);
  const [listClsBimTrim, setListClsBimTrim] = useState(null);
  const [listClsBomba, setListClsBomba] = useState(null);
  const [listEstados, setListEstados] = useState(null);
  const [listSubPrograma, setListSubPrograma] = useState(null);
  const [listCnlAtencion, setListCnlAtencion] = useState(null);

  const getData = async () => {
    setLoading(true);
    const resp = await getListContractsPlans();
    setLoading(false);
    setData(resp);
    const respu = await getListEstadio();
    setListEstadio(respu);
    const respue = await getListContrato();
    setListContrato(respue);
    const respues = await getListEspecialidad();
    setListProfesion(respues);
    const respuest = await getListClaseExam();
    setListClaseExamen(respuest);


    const rEstados = await getListEstadosContratoPlan();
    setListEstados(rEstados);
    const rTpIngreso = await getListTipoIngreso();
    setListTipoIngreso(rTpIngreso);

    const rCnlAtencion = await getListCanalAtencion(null);
    setListCnlAtencion(rCnlAtencion);
    const rEtsAdmin = await getListEtiquetasAdmin(null);
    setListEtiquetasAdmin(rEtsAdmin);
    const rEtiquetasAsis = await getListEtAsistencial();
    setListEtiquetasAsis(rEtiquetasAsis);
    const rGenero = await getlistSexoNacer();
    setListGenero(rGenero);

    const rSubPrograms = await getListSubProgramas(null);
    setListSubPrograma(rSubPrograms);
    const rSedes = await getListSede();
    setListSedes(rSedes);
    const rBimTrim = await getListBimTrim();
    setListClsBimTrim(rBimTrim);
    const rBomba = await getListBomba();
    setListClsBomba(rBomba);
  };

  const inactivarContrato = async (id, Estado) => {
    if (Estado == 'Activo') {
      Swal.fire({
        title: "¿Seguro?",
        text: "¿Esta seguro de Inactivar el Contrato Plan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await inactivarContratoPlan(id, 44189567);
          Swal.fire("El Contrato Plan fue Inactivado");
          setLoading(true);
          const resp = await getListContractsPlans();
          setLoading(false);
          setData(resp);
          onSubmit(resp);
        }
      });

    } else {
      Swal.fire({
        title: "¿Seguro?",
        text: "¿Esta seguro de Activar el Contrato Plan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await inactivarContratoPlan(id, 44189580);
          Swal.fire("El Contrato Plan fue Activado");
          setLoading(true);
          const resp = await getListContractsPlans();
          setLoading(false);
          setData(resp);
          onSubmit(resp);
        }
      });
    }
  };

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Tooltip
          trigger="click"
          title={
            <>
              <Tooltip title="Ver">
                <Button
                  onClick={async () => {
                    setView(true);
                    setIdContract(data.id);
                    setModalVisible(true);
                  }}
                >
                  <EyeOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="Editar">
                <Button
                  onClick={async () => {
                    setView(false);
                    setIdContract(data.id);
                    setModalVisible(true);
                  }}
                >
                  <EditOutlined />
                </Button>
              </Tooltip>
              <Tooltip title={`${data.Estado_txt == 'Activo' ? 'Inactivar' : 'Activar'}`}>
                <Button onClick={() => inactivarContrato(data.id, data.Estado_txt)}>
                  <InfoCircleOutlined />
                </Button>
              </Tooltip>
            </>
          }
        >
          <MoreOutlined />
        </Tooltip>
      ),
    },
    {
      title: "Contrato Plan",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Primera Vez",
      dataIndex: "Primera_Vez",
      key: "Primera_Vez",
      render: (val) => <Checkbox disabled checked={val} />,
    },
    {
      title: "Predecesor",
      dataIndex: "Prerrequisito",
      key: "Prerrequisito",
      render: (val) => <Checkbox disabled checked={val} />,
    },
    {
      title: "Estadio",
      dataIndex: "Estadio_txt",
      key: "Estadio_txt",
    },
    {
      title: "SubPrograma",
      dataIndex: "Sub_Programa",
      key: "Sub_Programa",
    },
    {
      title: "Meses Atención",
      dataIndex: "Meses",
      key: "Meses",
    },
    {
      title: "Profesión",
      dataIndex: "Profesion_txt",
      key: "Profesion_txt",
    },
    {
      title: "Clase Exámen",
      dataIndex: "Clase_Examen_txt",
      key: "Clase_Examen_txt",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Canales Atención",
      dataIndex: "Canales",
      key: "Canales",
      render: (text) => {
        const list = text.split(",");
        return (
          <span>
            {(
              <ul>
                {list?.map((value) => (
                  <li key={value}>{value || "Sin información"}</li>
                ))}
              </ul>
            ) || "-"}
          </span>
        );
      },
    },
    {
      title: "Etiqueta Asistencial",
      dataIndex: "Etiquetas_Asistenciales_txt",
      key: "Etiquetas_Asistenciales_txt",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Etiquetas Administrativas",
      dataIndex: "Etiquetas_Administrativas_txt",
      key: "Etiquetas_Administrativas_txt",
      render: (text) => {
        if (text !== null) {
          const list = text.split(",");
          return (
            <span>
              {(
                <ul>
                  {list?.map((value) => (
                    <li key={value}>{value || "Sin información"}</li>
                  ))}
                </ul>
              ) || "-"}
            </span>
          );
        }
      },
    },
    {
      title: "Sexo al Nacer",
      dataIndex: "Sexo_al_Nacer_txt",
      key: "Sexo_al_Nacer_txt",
    },
    {
      title: "Tipo Ingreso",
      dataIndex: "Tipo_Ingreso_txt",
      key: "Tipo_Ingreso_txt",
    },
    {
      title: "Clasificacion Bim/Trim",
      dataIndex: "Clasificacion_BT_txt",
      key: "Clasificacion_BT_txt",
    },
    {
      title: "Clasificacion Bomba",
      dataIndex: "Clasificacion_Bomba_txt",
      key: "Clasificacion_Bomba_txt",
    },
    {
      title: "Sedes",
      dataIndex: "Sedes_txt",
      key: "Sedes_txt",
      render: (text) => {
        if (text !== null) {
          const list = text.split(",");
          return (
            <span>
              {(
                <ul>
                  {list?.map((value) => (
                    <li key={value}>{value || "No Aplica"}</li>
                  ))}
                </ul>
              ) || "-"}
            </span>
          );
        }
      },
    },
    {
      title: "Menor de",
      dataIndex: "Menor_de",
      key: "Menor_de",
    },
    {
      title: "Mayor de",
      dataIndex: "Mayor_de",
      key: "Mayor_de",
    },
    {
      title: "Duración(1era vez)",
      dataIndex: "Duracion_1era_Visita",
      key: "Duracion_1era_Visita",
    },
    {
      title: "Duración Seguimiento",
      dataIndex: "Duracion_Seguimiento",
      key: "Duracion_Seguimiento",
    },
    {
      title: "Estado",
      dataIndex: "Estado_txt",
      key: "Estado_txt",
      render: (text) => (
        <Tag style={{ width: "100%" }} color={tagStatusCPView[text]?.color}>
          <strong> {tagStatusCPView[text]?.text}</strong>
        </Tag>
      ),
    },
  ];

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    const resp = await getInfoFilterContratPlans(values);
    setData(resp);
    setLoading(false);
  };

  useEffect(() => {
    console.log(activeKey);
    if (activeKey == 1) {
      getData();
    }
  }, [activeKey]);

  return (
    <>
      <Collapse style={{ marginBottom: "20px" }}>
        <Panel header="Filtros contratos planes" key="1">
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
                label="Estadio"
                name="estadio"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un estadio"
                  options={listEstadio}
                />
              </Form.Item>
              <Form.Item
                label="Contrato"
                name="contrato"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un contrato"
                  options={listContrato}
                />
              </Form.Item>
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
              <Form.Item
                label="Clase Examen"
                name="claseExamen"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione una clase de examen"
                  options={listClaseExamen}
                />
              </Form.Item>
            </Row>
            <Row style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Form.Item
                label="Sub Programa"
                name="subPrograma"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un Sub Programa"
                  options={listSubPrograma}
                />
              </Form.Item>
              <Form.Item
                label="Etiqueta Asistencial"
                name="etAsistencial"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un Etiqueta"
                  options={listEtiquetasAsis}
                />
              </Form.Item>
              <Form.Item
                label="Etiqueta Administrativa"
                name="etAdmin"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione una Etiqueta"
                  options={listEtiquetasAdmin}
                />
              </Form.Item>
              <Form.Item
                label="Sede"
                name="sede"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione una Sede"
                  options={listSedes}
                />
              </Form.Item>

            </Row>
            <Row
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Form.Item
                label="Estado"
                name="state"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un Estado"
                  options={listEstados}
                />
              </Form.Item>
              <Form.Item
                label="Tipo Ingreso"
                name="tpIngreso"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione un Ingreso"
                  options={listTipoIngreso}
                />
              </Form.Item>
              <Form.Item
                label="Clasificacion Bim/Trim"
                name="clsBimTrim"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione una Etiqueta"
                  options={listClsBimTrim}
                />
              </Form.Item>
              <Form.Item
                label="Sexo al Nacer"
                name="genero"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione una Sexo"
                  options={listGenero}
                />
              </Form.Item>
            </Row>
            <Row
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Form.Item
                label="Clasificacion Bomba"
                name="bomba"
                style={{ width: "20%" }}
              >
                <Select
                  placeholder="Seleccione una Etiqueta"
                  options={listClsBomba}
                />
              </Form.Item>

              <Form.Item
                label="Canal Atencion"
                name="cnlAtencion"
                style={{ width: "20%", marginLeft: "60px"}}
              >
                <Select
                  placeholder="Seleccione un Canal"
                  options={listCnlAtencion}
                />
              </Form.Item>
            </Row>
            <Row>
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
            </Row>
          </Form>
        </Panel>
      </Collapse >
      <ViewAndEdit
        view={view}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        idContract={idContract}
      />
      <Table
        loading={loading}
        scroll={{ x: "100%" }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
