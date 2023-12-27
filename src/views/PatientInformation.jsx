import { useState, useEffect } from "react";
import {
  list_patients,
  TriggerUpdatePatient,
  listDocumentsPatients,
  getConsulta,
  actualizarRegistroNovedadInformado,
  showLoadingModal,
  hideLoadingModal,
} from "../appRedux/services";
import {
  Button,
  Card,
  Form,
  notification,
  Table,
  Input,
  Select,
  Space,
  Spin,
} from "antd";
import Swal from "sweetalert2";
import CreatePatient from "./CreatePatient";
import { EditarPaciente } from "./EditarPaciente";
import { useHistory } from "react-router-dom";

const PatientInformation = () => {
  const [form] = Form.useForm();
  const [notificationApi, contextHolder] = notification.useNotification();
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tipoDoc, setTipoDoc] = useState("");
  const [numeroDoc, setNumeroDoc] = useState(undefined);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [paciente, setPaciente] = useState(null);
  const [openModalPatient, setOpenModalPatient] = useState(false);
  const [typeDocs, setTypeDoc] = useState([]);
  const [dataIntegrarPaciente, setDataIntegrarPaciente] = useState({
    Integrar: false,
    Tipo_Documento: null,
    Numero_Documento: null,
    filtros: null,
  });

  const history = useHistory();

  const onSubmit = async (values) => {
    if (!values.tipo_doc && values?.nombre?.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo tipo de documento es requerido',
      });
      return; // Detener el envío del formulario si el campo está vacío
    }
  
    // Verifica si el campo "numero_doc" está vacío
    if (!values.numero_doc && values?.nombre?.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo número de documento es requerido',
      });
      return; // Detener el envío del formulario si el campo está vacío
    }
    if (values?.nombre?.length >= 3 && !numeroDoc) {
      setLoading(true);
      console.log("que saca: ", values);
      const resp = await list_patients(numeroDoc, values);
      if (resp.length === 0) {
        await refact(values);
      } else {
        setLoading(false);
        setData(resp);
      }
      setDataIntegrarPaciente({
        Integrar: false,
        Tipo_Documento: null,
        Numero_Documento: null,
        filtros: null,
      });
    } else if (numeroDoc !== undefined && nombre === "") {
      setLoading(true);
      console.log("que saca: ", values);
      const resp = await list_patients(numeroDoc, values);
      if (resp.length === 0) {
        await refact(values);
      } else {
        setLoading(false);
        setData(resp);
      }
      setDataIntegrarPaciente({
        Integrar: false,
        Tipo_Documento: null,
        Numero_Documento: null,
        filtros: null,
      });
    }
  };

  const refact = async (values) => {
    if (
      values?.nombre === undefined ||
      values?.nombre === "" ||
      values?.nombre === null
    ) {
      let TipoLabel;
      for (let doc of typeDocs) {
        if (doc.value === values.tipo_doc) {
          TipoLabel = doc.label;
          break;
        }
      }
      setDataIntegrarPaciente({
        Integrar: true,
        Tipo_Documento: TipoLabel,
        Numero_Documento: numeroDoc,
        filtros: values,
      });
    } else {
      const result = await Swal.fire({
        title: "No existen registros",
        text: "¿Desea integrar un paciente?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Si, integrar",
      });
      if (result.isConfirmed) {
        setOpenModal(true);
        setLoading(false);
        hideLoadingModal();
      } else {
        setLoading(false);
        hideLoadingModal();
      }
    }
  };

  const on_change = (value) => {
    const { target } = value;
    setDisabledButton(false);
    console.log(`Valores: ${nombre}, ${tipoDoc}, ${numeroDoc}`);
    if (target?.value !== undefined && target?.value !== "") {
      if (target.name === "numero_doc") {
        const Var = target.value;
        setNumeroDoc(Var);
        setNombre("");
      }
      if (target.name === "nombre") {
        const Var = target.value;
        onSubmit({ nombre: Var });
        setNombre(Var);
        setNumeroDoc("");
        setTipoDoc("");
       // form.resetFields(['numero_doc', 'tipo_doc']);
      }
      if (target.name === "tipo_doc") {
        const Var = target.value;
        setTipoDoc(form.getFieldValue("tipo_doc"));
        setNombre("");
        setNumeroDoc(form.getFieldValue("numero_doc"));
      }
      setDisabledInput({ name: target.name });
      if (
        (tipoDoc !== "" && numeroDoc !== undefined && nombre === "") ||
        (tipoDoc === "" && numeroDoc === undefined && nombre !== "")
      ) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      setNumeroDoc("");
      setDisabledInput(false);
      setDisabledButton(true);
    }
  };

  const changeNumber = (e) => {
    const regex = /^[0-9]{0,20}$|^$/;
    if (regex.test(e.target.value)) {
      on_change(e);
    }
  };

  const getDocuments = async () => {
    const resp = await listDocumentsPatients();
    setTypeDoc(resp);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const columns = [
    {
      title: "Nombres",
      dataIndex: "nombres",
      key: "nombres",
      render :(text) => <strong>{text}</strong>,
    },
    {
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos",
      render :(text) => <strong>{text}</strong>,
    },
    {
      title: "Tipo de documento",
      dataIndex: "tipo_documento",
      key: "tipo_documento",
    },
    {
      title: "Número de documento",
      dataIndex: "numero_documento",
      key: "numero_documento",
      render :(text) => <strong>{text}</strong>,
    },
    {
      title: "Celular",
      key: "celular",
      dataIndex: "celular",
    },
    {
      title: "Tipo Afiliación",
      dataIndex: "tipoAfiliacion",
      key: "tipoAfiliacion",
    },
    {
      title: "Nivel Afiliación",
      dataIndex: "nivelAfiliacion",
      key: "nivelAfiliacion",
    },
    {
      title: "Acciones",
      key: "action",
      align: "center",
      children: [
        {
          title: "Ver",
          key: "ver",
          fixed: "right",
          width: "5%",
          render: (data) => {
            const view = async () => {
              showLoadingModal();
              setLoading(true);
              try {
                await TriggerUpdatePatient(data?.numero_documento);
                notificationApi.open({
                  type: "success",
                  content: "Actualizado correctamente",
                });
                const registros = await getConsulta(data?.numero_documento);
                setLoading(false);
                hideLoadingModal();
                history.push({
                  pathname: `/detail-patient/${data?.id}`,
                  state: { detail: registros },
                });
              } catch (error) {
                notificationApi.open({
                  type: "error",
                  content: error.response?.data?.message || "error",
                });
                setLoading(false);
                hideLoadingModal();
                history.push(`/detail-patient/${data?.id}`);
              }
            };
            return (
              <i
                style={{ cursor: "pointer" }}
                className="icon icon-view"
                onClick={view}
              />
            );
          },
        },
        {
          title: "Editar",
          key: "editar",
          dataIndex: "id",
          fixed: "right",
          width: "6%",
          render: (id) => {
            return (
              <i
                style={{ cursor: "pointer" }}
                className="icon icon-edit"
                onClick={() => {
                  setOpenModalPatient(true);
                  setPaciente(id);
                }}
              />
            );
          },
        },
      ],
    },
  ];

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text");
    setTimeout(() => {
      if (pastedText != null || pastedText != "" || pastedText != undefined) {
        setDisabledButton(false);
      }
    }, 0);
  };

  return (
    <>
      <Spin spinning={loading}>
        {contextHolder}
        <CreatePatient
          open={openModal}
          setOpen={setOpenModal}
          numero_doc={numeroDoc}
          getDatagrid={onSubmit}
          dataIntegrarPaciente={dataIntegrarPaciente}
          cargando={setLoading}
        />
        <EditarPaciente
          open={openModalPatient}
          setOpen={setOpenModalPatient}
          idPaciente={paciente}
        />
        <Card
          headStyle={{ background: "#184F9D" }}
          style={{boxShadow: '1px 4px 8px 0 rgba(0,0,0,0.2)'}}
          title={
            <span
              style={{ fontWeight: "bold", fontSize: "18px", color: "#FFF" }}
            >
              Buscar Paciente
            </span>
          }
          actions={[
            <Button
              key="Limpiar"
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.resetFields();
                setDisabledInput(false);
                setNumeroDoc(null);
                setData([]);
                setDisabledButton(true);
                setTipoDoc("");
              }}
            >
              Limpiar Filtros
            </Button>,
            <Button
              key="Consultar"
              style={{ backgroundColor: "#00ABC8", color: "#FFF" }}
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
              disabled={disabledButton}
              loading={loading}
            >
              Consultar
            </Button>,
          ]}
        >
          <Form
            name="wrap"
            layout="vertical"
            colon={false}
            onFinish={onSubmit}
            form={form}
            autoComplete="off"
          >
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-lg-6">
                <Form.Item
                  label="Nombre completo"
                  name="nombre"
                  // rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Input
                    onChange={on_change}
                    //value={nombre}
                    name="nombre"
                    disabled={
                      disabledInput?.name === "numero_doc" ||
                      disabledInput?.name === "tipo_doc"
                    }
                    onPaste={(event) => {
                      handlePaste(event);
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <Space.Compact block>
                  <Form.Item
                    label="Tipo"
                    name="tipo_doc"
                    style={{ width: "15%" }}
                    rules={[
                      { required: !form.getFieldValue("numero_doc"), message: '¡Por favor, selecciona el tipo de documento!' },
                    ]}
                  >
                    <Select
                      onChange={(value) => {
                        on_change({
                          target: { name: "tipo_doc", value: value },
                        });
                      }}
                      name="tipo_doc"
                      disabled={disabledInput?.name === "nombre"}
                      options={typeDocs}
                      value={tipoDoc}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Número de documento"
                    name="numero_doc"
                    style={{ width: "85%" }}
                    rules={[
                      { required: !form.getFieldValue("tipo_doc"), message: '¡Por favor, ingresa el número de documento!' },
                    ]}
                  >
                    <Input
                      onChange={changeNumber}
                      name="numero_doc"
                      disabled={disabledInput?.name === "nombre"}
                      value={numeroDoc}
                      onPaste={(event) => {
                        handlePaste(event);
                      }}
                    />
                    <input
                      hidden
                      // onChange={changeNumber}
                      name="numero_doc"
                      //disabled={disabledInput?.name === "nombre"}
                      value={numeroDoc}
                    />
                  </Form.Item>
                </Space.Compact>
              </div>
            </div>
          </Form>
        </Card>
        {data.length > 0 && (
          <Card>
            <Table
              columns={columns}
              loading={loading}
              dataSource={data}
              scroll={{ x: 1300 }}
            />
          </Card>
        )}
      </Spin>
    </>
  );
};

export default PatientInformation;
