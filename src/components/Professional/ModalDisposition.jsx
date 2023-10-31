import {
  Button,
  Checkbox,
  DatePicker,
  message,
  Modal,
  notification,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  updateDisposition,
  listAlertsImportDisp,
} from "../../appRedux/services";

const ModalDisposition = ({ id, rango, setDataImported, numeroDocumento }) => {
  const [notificationApi, contextHolderNoti] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rango_propio, setRango_propio] = useState(false);
  const [valuesDate, setValuesDate] = useState({
    fecha_inicio: "",
    fecha_final: "",
  });

  function disabledHours() {
    return [...Array(6).keys()];
  }

  useEffect(() => {
    console.log(rango);
    setRango_propio(rango === 1 ? true : false);
  }, [rango]);

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
        rango_propio ? 1 : 0
      );
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
            loading={loading}
            onClick={update_disposition}
          >
            Importar
          </Button>,
        ]}
      >
        <div className="row">
          <div className="col-12 mb-3">
            <Checkbox checked={rango_propio} onChange={onChange}>
              Rango propio
            </Checkbox>
          </div>
          <div className="col">
            <div className="mb-2">
              <label htmlFor="fecha-inicio">Fecha Inicio</label>
            </div>
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              onOk={(value) => onOk(value, "fecha_inicio")}
              style={{ width: "100%" }}
              // value={valuesDate?.fecha_inicio}
              disabledHours={disabledHours}
            />
          </div>
          <div className="col">
            <div className="mb-2">
              <label htmlFor="fecha-final">Fecha Final</label>
            </div>
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              onOk={(value) => onOk(value, "fecha_final")}
              style={{ width: "100%" }}
              // value={valuesDate?.fecha_final}
              disabledHours={disabledHours}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDisposition;
