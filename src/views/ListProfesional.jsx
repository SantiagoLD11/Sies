import { Button, Card, Form, Input, message, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { list_professionals, TriggerUpdateProfessional } from "../appRedux/services";
import CreateProfesional from "./CreateProfesional";

const ListProfesional = () => {
    const [disabledInput, setDisabledInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numeroDoc, setNumeroDoc] = useState("");
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    onSubmit({ numero_doc: '', nombre: ''});
  }, [])
  
  const showLoadingModal = () => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera un momento..',
      icon:'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusConfirm: false,
      showConfirmButton: false, // Ocultar el botón de confirmación
      showCloseButton:false,
      didOpen: () => {
        Swal.showLoading(); // Mostrar el ícono de carga
      }
    });
  };

  const hideLoadingModal = () => {
    Swal.close(); // Cierra el modal de carga de SweetAlert2
  };

  const onSubmit = async (values) => {
    showLoadingModal();
    setLoading(true);
    const resp = await list_professionals(disabledInput.name, values);
    if (resp.length === 0) {
      const result = await Swal.fire({
        title: "No existen registros",
        text: "¿Desea integrar un profesional?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Si, crear",
      });
      if (result.isConfirmed) {
        setOpenModal(true);
      }
    }
 
    setLoading(false);
    setData(resp);
    hideLoadingModal();
  };

 
  const on_change = ({ target }) => {
    if (target.value) {
      if (target.name === "numero_doc") setNumeroDoc(target.value);
      setDisabledInput({ name: target.name });
    } else {
      setDisabledInput(false);
    }
  };

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
          render: (data) => {
            const confirm = async () => {
              try {
                showLoadingModal();
                await TriggerUpdateProfessional(data?.numero_documento);
                messageApi.open({
                  type: 'success',
                  content: 'Actualizado correctamente',
                });
                history.push(`/detail-professional/${data?.id_professional}`);
                hideLoadingModal();
              } catch (error) {
                hideLoadingModal();
                messageApi.open({
                  type: 'error',
                  content:  error.response?.data?.message || "error",
                });
              }
            };
            const cancel = () => {
              history.push(`/detail-professional/${data?.id_professional}`);
            };
            return (
              <Popconfirm
                title="¿Actualizar profesional? "
                onConfirm={confirm}
                onCancel={cancel}
                okText="Si, actualizar"
                cancelText="No"
              >
                <i
                  style={{ cursor: "pointer" }}
                  className="icon icon-view"
                  
                />
              </Popconfirm>
            );
          },
        },
        {
          title: "Editar",
          key: "editar",
          dataIndex: "id_professional",
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

  return (
    <>
      <CreateProfesional
        open={openModal}
        setOpen={setOpenModal}
        numero_doc={numeroDoc}
      />
      <Card
        title="Buscar profesional"
        extra={
          <span
            style={{ cursor: "pointer", color: "#038fde" }}
            onClick={() => setOpenModal(true)}
          >
            Integrar
          </span>
        }
        actions={[
          <div key="button-actions" className="d-flex justify-content-end me-4">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.resetFields();
                setDisabledInput(false);
                onSubmit({ numero_doc: '', nombre: ''});
              }}
            >
              Limpiar Filtros
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
              disabled={!disabledInput}
              loading={loading}
            >
              Consultar
            </Button>
          </div>,
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
                label="Nombre"
                name="nombre"
                // rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input
                  onChange={on_change}
                  name="nombre"
                  disabled={disabledInput?.name === "numero_doc"}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <Form.Item label="Número de documento" name="numero_doc">
                <Input
                  onChange={on_change}
                  name="numero_doc"
                  disabled={disabledInput?.name === "nombre"}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>
        <Card>
          <Table
            columns={columns}
            loading={loading}
            dataSource={data}
            scroll={{ x: 1300 }}
          />
        </Card>
    </>
  );
};

export default ListProfesional;
