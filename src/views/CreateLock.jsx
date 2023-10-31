import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  message,
  Input,
  Modal,
  Select,
  TimePicker,
  Card,
} from "antd";
import moment from "moment";
import {
  createBlockDisposition,
  listProfessionals,
  list_schedule_type,
  list_reason,
  listHistoricoBloqueosFiltrados,
  listHistoricoBloqueos,
  listDays,
} from "../appRedux/services";
import Swal from "sweetalert2";

export const CreateLock = ({ setData }) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaMotivos, setListaMotivos] = useState([]);
  const [listaProfesionales, setlistaProfesionales] = useState([]);
  const [listaTipoAgenda, setListaTipoAgenda] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [listaDias, setListaDias] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const close = () => setIsModalOpen(false);

  const onFinish = async (values) => {
    let resp;
    console.log(values);
    if (values.profesional.length > 1) {
      (async () => {
        for (const profesionali of values.profesional) {
          const final_values = {
            ...values,
            profesional: profesionali,
            fecha_inicio: new Date(values?.fecha_inicio).getTime(),
            fecha_final: new Date(values?.fecha_final).getTime(),
            hora_inicio: moment(new Date(values?.hora_inicio)).format("HH:mm"),
            hora_final: moment(new Date(values?.hora_final)).format("HH:mm"),
          };
          try {
            await createBlockDisposition(
              final_values.profesional,
              final_values
            );
            console.log("Enviar if: ", final_values);
            messageApi.open({
              type: "success",
              content: "Proceso exitoso",
            });
          } catch (error) {
            console.error("Error en la iteración:", error);
            messageApi.open({
              type: "error",
              content: error.response?.data?.message,
            });
          }
        }
      })();
    } else {
      const final_values = {
        ...values,
        profesional: values.profesional[0],
        fecha_inicio: new Date(values?.fecha_inicio).getTime(),
        fecha_final: new Date(values?.fecha_final).getTime(),
        hora_inicio: moment(new Date(values?.hora_inicio)).format("HH:mm"),
        hora_final: moment(new Date(values?.hora_final)).format("HH:mm"),
      };
      try {
        await createBlockDisposition(final_values.profesional, final_values);
        messageApi.open({
          type: "success",
          content: "Proceso exitoso",
        });
        console.log("Enviar else: ", final_values);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: error.response?.data?.message,
        });
      }
    }
    form2.resetFields();
    close();
  };

  const onSubmit = async (values) => {
    console.log("formulario: ", values);
    setLoading(true);
    let resp;
    if (
      (values.profesional != undefined || "") &&
      values.motivo == undefined &&
      values.tipo_novedad == undefined
    ) {
      resp = await listHistoricoBloqueosFiltrados("Profesional", values);
    } else if (
      (values.profesional == undefined || "") &&
      values.motivo != undefined &&
      values.tipo_novedad == undefined
    ) {
      resp = await listHistoricoBloqueosFiltrados("Motivo", values);
    } else if (
      (values.profesional == undefined || "") &&
      values.motivo == undefined &&
      values.tipo_novedad != undefined
    ) {
      resp = await listHistoricoBloqueosFiltrados("Tipo_Novedad", values);
    } else if (
      (values.profesional != undefined || "") &&
      values.motivo != undefined &&
      values.tipo_novedad == undefined
    ) {
      resp = await listHistoricoBloqueosFiltrados("Profesional_Motivo", values);
    } else if (
      (values.profesional != undefined || "") &&
      values.motivo == undefined &&
      values.tipo_novedad != undefined
    ) {
      resp = await listHistoricoBloqueosFiltrados("Profesional_Tipo", values);
    } else if (
      (values.profesional != undefined || "") &&
      values.motivo != undefined &&
      values.tipo_novedad != undefined
    ) {
      resp = await listHistoricoBloqueosFiltrados(
        "Profesional_Motivo_Tipo",
        values
      );
    } else if (
      (values.profesional == undefined || "") &&
      values.motivo != undefined &&
      values.tipo_novedad != undefined
    ) {
      resp = await listHistoricoBloqueosFiltrados("Motivo_Tipo", values);
    } else if (
      (values.profesional == undefined || "") &&
      values.motivo == undefined &&
      values.tipo_novedad == undefined
    ) {
      resp = await listHistoricoBloqueos();
    }
    setLoading(false);
    setData(resp);
  };

  const get_lists = async () => {
    const motivos = await list_reason();
    setListaMotivos(motivos);
    const tipo_agenda = await list_schedule_type();
    setListaTipoAgenda(tipo_agenda);
    const profesionales = await listProfessionals();
    setlistaProfesionales(profesionales);
    const dias = await listDays();
    setListaDias(dias);
  };

  useEffect(() => {
    get_lists();
  }, []);

  return (
    <>
      <Card
        title="Filtrar Novedades"
        extra={
          <Button
            style={{ backgroundColor: "#00ABC8", color: "#FFF" }}
            onClick={showModal}
          >
            Generar Novedad
          </Button>
          // <span
          //   style={{ cursor: "pointer", color: "#038fde" }}
          //   onClick={() => setOpenModal(true)}
          // >
          //   Integrar
          // </span>
        }
        actions={[
          <div key="button-actions" className="d-flex justify-content-end me-4">
            <Button
              //type="primary"
              htmlType="submit"
              onClick={() => {
                form.resetFields();
                setData([]);
              }}
            >
              Limpiar Filtros
            </Button>
            <Button
              //type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
              //disabled={!disabledInput}
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
                label="Profesional"
                name="profesional"
                // rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input
                  //onChange={on_change}
                  name="profesional"
                  //disabled={disabledInput?.name === "numero_doc"}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <Form.Item label="Motivo" name="motivo">
                <Select
                  //onChange={changeNumber}
                  name="motivo"
                  //disabled={disabledInput?.name === "nombre"}
                  //value={}
                  options={listaMotivos}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <Form.Item
                label="Tipo novedad"
                name="tipo_novedad"
                // rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select
                  //onChange={on_change}
                  name="tipo_novedad"
                  //disabled={disabledInput?.name === "numero_doc"}
                  options={listaTipoAgenda}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>

      {/* <span onClick={showModal} style={{ cursor: "pointer" }}>
        <i className="icon icon-close-circle" /> <span>Crear bloqueo</span>
      </span> */}
      {contextHolder}
      <Modal
        title="Novedad Disponibilidades"
        open={isModalOpen}
        footer={[
          <Button htmlType="button" key="button-cancel" onClick={close}>
            Cancelar
          </Button>,
          <Button
            key="button-actualizar"
            htmlType="submit"
            onClick={form2.submit}
            //form={form2.submit}
            //loading={isLoading}
            type="primary"
          >
            Guardar
          </Button>,
        ]}
        onCancel={close}
      >
        <Form
          form={form2}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <Form.Item
                label="Fecha Inicio"
                name="fecha_inicio"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Fecha Final"
                name="fecha_final"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Hora Inicio"
                name="hora_inicio"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <TimePicker showSecond={false} style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Hora Final"
                name="hora_final"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <TimePicker showSecond={false} style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item label="Dia de la semana" name="dia_semana">
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  className="w-100"
                  //onChange={handleChangeDias}
                  placeholder="Selecciona dia de la semana"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listaDias}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Motivo"
                name="motivo"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select
                  className="w-100"
                  showSearch
                  placeholder="Selecciona tipo de documento"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listaMotivos}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Tipo de Novedad"
                name="tipo_novedad"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select
                  className="w-100"
                  showSearch
                  placeholder="Selecciona tipo de documento"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listaTipoAgenda}
                />
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item
                label="Profesional"
                name="profesional"
                rules={[
                  { required: true, message: "Campo obligatorio" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && value.length >= 2) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Debe seleccionar al menos 2 opciones")
                      );
                    },
                  }),
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  placeholder="Digite nombre de un profesional"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listaProfesionales}
                />
              </Form.Item>
            </div>
          </div>

          {/* <div className="d-flex justify-content-end">
            <Button htmlType="button" onClick={close}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </div> */}
        </Form>
      </Modal>
    </>
  );
};
