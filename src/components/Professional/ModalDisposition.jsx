import {
  Button,
  Checkbox,
  DatePicker,
  message,
  Modal,
  notification,
  Form,
  Select
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  updateDisposition,
  listAlertsImportDisp,
  getSedesProfessional
} from "../../appRedux/services";

const ModalDisposition = ({ id, rango, setDataImported, numeroDocumento }) => {
  const [notificationApi, contextHolderNoti] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rango_propio, setRango_propio] = useState(false);
  const [sedesProf, setSedesProf] = useState(false);
  const [form] = Form.useForm();
  const [valuesDate, setValuesDate] = useState({
    fecha_inicio: "",
    fecha_final: "",
  });

  function disabledHours() {
    return [...Array(6).keys()];
  }

  const get_lists = async () => {
    const sedes = await getSedesProfessional(id);
    setSedesProf(sedes);
  };

  useEffect(() => {
    console.log(rango);
    setRango_propio(true);
    get_lists();
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  const onOk = (value, type) => {
    setValuesDate({ ...valuesDate, [type]: new Date(value).getTime() });
  };

  const update_disposition = async () => {
    setLoading(true);
    try {
      const resp = await updateDisposition(
        id,
        valuesDate.fecha_inicio,
        valuesDate.fecha_final,
        true,
        form.getFieldValue("fSede") == null || form.getFieldValue("fSede") == undefined ? "" : form.getFieldValue("fSede")

      );
      console.log("pRUEBA"+resp);
      if (resp.status === "fail") {
        await messageApi.open({
          type: "error",
          content: resp?.message || "error",
        });
      }
      if (resp.status === "ok") {
        await messageApi.open({
          type: "success",
          content: "Se Integro Correctamente la Disponibilidad",
        });
      }
    } catch (error) {
      await messageApi.open({
        type: "error",
        content: error.response?.data?.message || "error",
      });
    }
    const json = {
      fecha_inicio: moment(valuesDate.fecha_inicio).format("YYYY-MM-DD HH:mm"),
      fecha_final: moment(valuesDate.fecha_final).format("YYYY-MM-DD HH:mm"),
    };
    const resp = await listAlertsImportDisp(
      numeroDocumento,
      json.fecha_inicio,
      json.fecha_final
    );
    if (resp) {
      for (const val of resp) {
        notificationApi.open({
          type: "info",
          description: ` ${val?.WS_Response}`,
        });
      }
    }
    setLoading(false);
    setDataImported(true);
    setValuesDate({ fecha_inicio: null, fecha_final: null });
    form.resetFields();
    close();
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setRango_propio(e.target.checked);
  };

  return (
    <>
      {contextHolder}
      {contextHolderNoti}
      <Button type="primary" onClick={open}>
        Importar Disponibilidad
      </Button>
      <Modal
        title="Importar Disponibilidad"
        open={isVisible}
        onCancel={close}
        footer={[
          <Button
            key="button-cancel"
            className="btn btn-outline-primary"
            onClick={close}
          >
            Cancelar
          </Button>,
          <Button
            key="button-actualizar"
            type="primary"
            loading={loading}
            onClick={update_disposition}
          >
            Importar
          </Button>,
        ]}
      >
        <Form
          name="basic"
          layout="vertical"
          autoComplete="off"
          form={form}
        >
          <div className="row">
            {/*
              <div className="col-12 mb-3">
              <Form.Item
                name="checkRP"
              >
                <Checkbox checked={rango_propio} onChange={onChange}>
                  Rango propio
                </Checkbox>
              </Form.Item>
            </div>
            */}
            <div className="col">
              <Form.Item
                name="fInicio"
                label="Fecha Inicio"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <DatePicker
                  disabledDate={(current) => {
                    const today = moment().startOf('day');
                    if (form.getFieldValue('fFinal')) {
                      const fechaFinal = new Date(form.getFieldValue('fFinal'));
                      return current && (current < today || current > fechaFinal.setDate(fechaFinal.getDate()));
                    }
                    return current && current < today;
                  }}
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  onOk={(value) => onOk(value, "fecha_inicio")}
                  style={{ width: "100%" }}
                  // value={valuesDate?.fecha_inicio}
                  disabledHours={disabledHours}
                />
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item
                name="fFinal"
                label="Fecha Final"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <DatePicker
                  disabledDate={(current) => {
                    const today = moment().startOf('day');
                    if (form.getFieldValue('fInicio')) {
                      const fechaInicio = new Date(form.getFieldValue('fInicio'));
                      return current && (current < today || current < fechaInicio.setDate(fechaInicio.getDate()));
                    }
                    return current && current < today;
                  }}
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  onOk={(value) => onOk(value, "fecha_final")}
                  style={{ width: "100%" }}
                  // value={valuesDate?.fecha_final}
                  disabledHours={disabledHours}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">

            <div className="col">
              <Form.Item
                label="Filtro Sede"
                name="fSede"
              >
                <Select
                  className="w-100"
                  showSearch
                  placeholder="Selecciona una Sede"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={sedesProf}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalDisposition;
