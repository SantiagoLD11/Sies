import {
  Button,
  DatePicker,
  Form,
  notification,
  Modal,
  Select,
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  createBlockDisposition,
  list_reason,
  list_schedule_type,
  listDays,
} from "../appRedux/services";

export default function BlockDisposition({ id, setDataImported }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaMotivos, setListaMotivos] = useState([]);
  const [listaDias, setListaDias] = useState([]);
  const [listaTipoAgenda, setListaTipoAgenda] = useState([]);
  const [messageApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const close = () => setIsModalOpen(false);

  const disabledDate = (current) => {
    const today = moment().startOf('day');
    return current && current < today;
  };

  const onFinish = async (values) => {
    const final_values = {
      ...values,
      fecha_inicio: new Date(values?.fecha_inicio).getTime(),
      fecha_final: new Date(values?.fecha_final).getTime(),
      hora_inicio: moment(new Date(values?.hora_inicio)).format("LT"),
      hora_final: moment(new Date(values?.hora_final)).format("LT"),
    };
    try {
      const resp = await createBlockDisposition(id, final_values);
      console.log("respuesta", resp);
      messageApi.success({
        message: "Proceso exitoso",
        description: 'creado correctamente'
      });
    } catch (error) {
      messageApi.error({
        message: "Error",
        description: error.response?.data?.message,
      });
    }
    close();
    setDataImported(true);
  };

  const get_lists = async () => {
    const motivos = await list_reason();
    setListaMotivos(motivos);
    const tipo_agenda = await list_schedule_type();
    setListaTipoAgenda(tipo_agenda);
    const dias = await listDays();
    setListaDias(dias);
  };

  useEffect(() => {
    get_lists();
  }, []);

  return (
    <>
      {/* <span onClick={showModal} style={{ cursor: "pointer" }}>
        <i className="icon icon-close-circle" />{" "}
        <span>Bloquear disponibilidades</span>
      </span> */}
      <Button
        style={{ background: "#5b5c4d", color: "#FFF" }}
        onClick={showModal}
      >
        Generar Novedad
      </Button>
      {contextHolder}
      <Modal
        title="Novedad Disponibilidades"
        open={isModalOpen}
        footer={[]}
        onCancel={close}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <Form.Item
                label="Fecha Inicio"
                name="fecha_inicio"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <DatePicker
                  disabledDate={(current) => {
                    const today = moment().startOf('day');
                    if (form.getFieldValue('fecha_final')) {
                      const fechaFinal = new Date(form.getFieldValue('fecha_final'));
                      return current && (current < today || current > fechaFinal.setDate(fechaFinal.getDate()));
                    }
                    return current && current < today;
                  }}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Fecha Final"
                name="fecha_final"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <DatePicker
                  disabledDate={(current) => {
                    const today = moment().startOf('day');
                    if (form.getFieldValue('fecha_inicio')) {
                      const fechaInicio = new Date(form.getFieldValue('fecha_inicio'));
                      return current && (current < today || current < fechaInicio.setDate(fechaInicio.getDate() ));
                    }
                    return current && current < today;
                  }}

                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Hora Inicio"
                name="hora_inicio"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <TimePicker format="HH:mm" showSecond={false} style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Hora Final"
                name="hora_final"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <TimePicker format="HH:mm" showSecond={false} style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
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
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType="button" onClick={close}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
