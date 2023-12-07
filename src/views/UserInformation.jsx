import {
  Button,
  Card,
  Form,
  message,
  Table,
  Space,
  Input,
  Select,
  Spin,
} from "antd";
import { useState, useEffect } from "react";
import {
  list_professionals,
  TriggerUpdateProfessional,
  list_documents,
  getConsultaProfessionals,
} from "../appRedux/services";
import Swal from "sweetalert2";
import CreateProfesional from "./CreateProfesional";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global/customGlobal.css";

const UserInformation = () => {
  const [disabledInput, setDisabledInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numeroDoc, setNumeroDoc] = useState(undefined);
  const [nombre, setNombre] = useState("");
  const [tipoDoc, setTipoDoc] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [typeDocs, setTypeDoc] = useState([]);
  const [dataIntegrarProfesional, setDataIntegrarProfesional] = useState({
    Integrar: false,
    Tipo_Documento: null,
    Numero_Documento: null,
    filtros: null,
  });

  const getDocuments = async () => {
    const resp = await list_documents();
    setTypeDoc(resp);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const onSubmit = async (values) => {
    console.log(
      `Valores: ${nombre}, ${tipoDoc}, ${numeroDoc}, "valor: ",${values?.nombre}`
    );
    if (values?.nombre?.length >= 3 && numeroDoc === undefined) {
      setLoading(true);
      const resp = await list_professionals(numeroDoc, values);
      if (resp.length === 0) {
        await refact(values);
      } else {
        setLoading(false);
        setData(resp);
      }
      setDataIntegrarProfesional({
        Integrar: false,
        Tipo_Documento: null,
        Numero_Documento: null,
        filtros: null,
      });
    } else if (numeroDoc !== undefined && nombre === "") {
      setLoading(true);
      const resp = await list_professionals(numeroDoc, values);
      if (resp.length === 0) {
        await refact(values);
      } else {
        setLoading(false);
        setData(resp);
      }
      setDataIntegrarProfesional({
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
      setDataIntegrarProfesional({
        Integrar: true,
        Tipo_Documento: TipoLabel,
        Numero_Documento: numeroDoc,
        filtros: values,
      });
    } else {
      const result = await Swal.fire({
        title: "No existen registros",
        text: "¿Desea integrar un profesional?",
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
      } else {
        setLoading(false);
      }
    }
  };

  const on_change = (value) => {
    const { target } = value;
    setDisabledButton(false);
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
        setNumeroDoc(undefined);
        setTipoDoc("");
      }
      if (target.name === "tipo_doc") {
        const Var = target.value;
        setTipoDoc(Var);
        setNombre("");
        setNumeroDoc(undefined);
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
      setNumeroDoc(undefined);
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

  let fechaUltimaActualizacion;

  const columns = [
    {
      title: "Nombres",
      dataIndex: "nombres",
      key: "nombres",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos",
      render: (text) => <strong>{text}</strong>,
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
      render: (text) => <strong>{text}</strong>,
    },
    // {
    //   title: "Celular",
    //   key: "celular",
    //   dataIndex: "celular",
    // },
    {
      title: "Profesión",
      dataIndex: "profesion",
      key: "profesion",
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
              setLoading(true);
              try {
                await TriggerUpdateProfessional(
                  data?.id,
                  data?.id_professional
                );
                messageApi.open({
                  type: "success",
                  content: "Actualizado correctamente",
                });
                const registros = await getConsultaProfessionals(
                  data?.numero_documento
                );
                setLoading(false);
                history.push({
                  pathname: `/detail-professional/${data?.id_professional}`,
                  state: { detail: registros },
                });
              } catch (error) {
                console.log("error: ", error);
                await messageApi.open({
                  type: "error",
                  content:
                    error.response?.data?.message ||
                    "Error: Actualización Fallida Revise Numero de Documento",
                });
                setLoading(false);
                history.push(`/detail-professional/${data?.id_professional}`);
              }
            };
            // const cancel = () => {
            //   history.push(`/detail-professional/${data?.id_professional}`);
            // };
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
          dataIndex: "id_professional",
          fixed: "right",
          width: "6%",
          render: (id) => {
            return (
              <i
                style={{ cursor: "pointer" }}
                className="icon icon-edit"
                onClick={() => {
                  history.push(`/edit-professional/${id}`);
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
        <CreateProfesional
          open={openModal}
          setOpen={setOpenModal}
          numero_doc={numeroDoc}
          getDatagrid={onSubmit}
          dataIntegrarProfesional={dataIntegrarProfesional}
          setDataIntegrarProfesional={setDataIntegrarProfesional}
          cargando={setLoading}
        />
        <Card
          headStyle={{ background: "#184F9D" }}
          title={
            <span
              style={{ fontWeight: "bold", fontSize: "18px", color: "#FFF" }}
            >
              Buscar Profesional
            </span>
          }
          // extra={
          //   <Button
          //     style={{ color: "#038fde" }}
          //     onClick={() => setOpenModal(true)}
          //   >
          //     Integrar
          //   </Button>
          // }
          actions={[
            <Button
              key="Limpiar"
              //htmlType="submit"
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
                    disabled={disabledInput?.name === "numero_doc"}
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
                    <input hidden name="numero_doc" value={numeroDoc} />
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

export default UserInformation;
