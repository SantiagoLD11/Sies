import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Select, message, Input } from "antd";
import {
  getListEtiquetaSeguimiento,
  getListResultadoContacto,
  getListEtiquetaAdministrativa,
  getListMotivoInasistencia,
  getListPlanRutaAtencion,
  getListServicio,
  createNotes,
} from "../../appRedux/services/index";
import { itemsNotes } from "../../constants/ItemsNotes";

const { TextArea } = Input;
export const CreateNote = ({ open, setOpen, idPaciente, getData }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [listMotivo, setlistMotivo] = useState([]);
  const [listEtiquetaSeguimiento, setlistEtiquetaSeguimiento] = useState([]);
  const [listResultadoContacto, setListResultadoContacto] = useState([]);
  const [listEtiquetaAdministrativa, setListEtiquetaAdministrativa] = useState(
    []
  );
  const [listPlanRutaAtencion, setListPlanRutaAtencion] = useState([]);
  const [listServicio, setListServicio] = useState([]);
  const [valueEtiquetaSeguimiento, setValueEtiquetaSeguimiento] =
    useState(null);
  const [valueRutaAtencion, setValueRutaAtencion] = useState(null);

  let Json = {
    Plan_Ruta_txt: null,
    Servicios: null,
    Observacion_seguimiento: "",
    Nota_cambio_etiqueta_administrativa: "",
  };

  const onReset = () => {
    setValueRutaAtencion(null);
    setValueEtiquetaSeguimiento(null);
    form.resetFields();
  };

  useEffect(() => {
    if (open === true) {
      getPreferences();
    }
  }, [open]);

  const getPreferences = async () => {
    const EtiquetaSeguimiento = await getListEtiquetaSeguimiento();
    setlistEtiquetaSeguimiento(EtiquetaSeguimiento);
    const EtiquetaAdministrativa = await getListEtiquetaAdministrativa();
    setListEtiquetaAdministrativa(EtiquetaAdministrativa);
  };

  useEffect(async () => {
    if (valueEtiquetaSeguimiento !== null) {
      console.log(valueEtiquetaSeguimiento);
      const ResultadoContacto = await getListResultadoContacto(
        valueEtiquetaSeguimiento
      );
      setListResultadoContacto(ResultadoContacto);
      const MotivoInasistencia = await getListMotivoInasistencia(
        valueEtiquetaSeguimiento
      );
      setlistMotivo(MotivoInasistencia);
      const PlanRutaAtencion = await getListPlanRutaAtencion(idPaciente);
      setListPlanRutaAtencion(PlanRutaAtencion);
    }
  }, [valueEtiquetaSeguimiento]);

  useEffect(async () => {
    if (valueRutaAtencion !== null) {
      const Servicio = await getListServicio(valueRutaAtencion);
      setListServicio(Servicio);
    }
  }, [valueRutaAtencion]);

  const onFinish = async (values) => {

    try {
      const values = await form.validateFields(); // Validar los campos del formulario
      // Lógica para guardar los datos
      console.log("Campos validados:", values);
      Json.Servicios = values.servicio?.join("|");
      for (let valor of listPlanRutaAtencion) {
        if (valor.value === values.Plan_ruta) {
          Json.Plan_Ruta_txt = valor.value;
        }
      }
      Json.Nota_cambio_etiqueta_administrativa =
        values.Nota_cambio_etiqueta_administrativa == undefined
          ? ""
          : values.Nota_cambio_etiqueta_administrativa;
      Json.Observacion_seguimiento =
        values.Observación_seguimiento == undefined
          ? ""
          : values.Observación_seguimiento;
      setIsLoading(true);
      const resp = await createNotes(idPaciente, values, Json);
      console.log("actualizar preferencias: ", resp);
      if (resp?.status === "fail") {
        console.log("Actualizar: ", resp);
        await messageApi.open({
          type: "error",
          content: resp?.message || "error",
        });
      }
      if (resp?.status === "ok") {
        await messageApi.open({
          type: "success",
          content: "Se ha creado correctamente la nota",
        });
      }
      setIsLoading(false);
      getData(idPaciente);
      close();
    } catch (error) {

      console.error("Error de validación:", error);
      message.error("Por favor complete todos los campos obligatorios");

    }

  };

  const close = () => {
    onReset();
    setOpen(false);
  };

  const handleChangeSeguimiento = (value) => {
    console.log(`selected ${value}`);
    setValueEtiquetaSeguimiento(value);
  };

  const handleChangeRutaAtencion = (value) => {
    console.log(`selected ${value}`);
    setValueRutaAtencion(value);
  };

  return (
    <>
      {contextHolder}
      <Modal
        width={"700px"}
        title="Crear Notas Administrativas"
        open={open}
        onCancel={close}
        footer={[
          <Button type="primary" key="button-cancel" onClick={close}>
            Cerrar
          </Button>,
          <Button
            key="button-actualizar"
            htmlType="submit"
            form="form"
            loading={isLoading}
            type="primary"
          >
            Guardar
          </Button>,
        ]}
      >
        <Form
          id="form"
          form={form}
          name="form"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          fields={[
            {
              name: ["Etiqueta_seguimiento"],
              rules:[{ required: true, message: "Campo obligatorio" }],
            },
            {
              name: ["Resultado_contacto"],
              rules:[{ required: true, message: "Campo obligatorio" }],
            },
            {
              name: ["Motivo_inasistencia"],
            },
            {
              name: ["Etiqueta_administrativa"],
              rules:[{ required: true, message: "Campo obligatorio" }],
            },
            {
              name: ["Plan_ruta"],
            },
            {
              name: ["servicio"],
            },
            {
              name: ["Observación_seguimiento"],
            },
            {
              name: ["Nota_cambio_etiqueta_administrativa"],
            },
          ]}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <Form.Item
                label="Etiqueta Seguimiento"
                name="Etiqueta_seguimiento"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select
                  onChange={handleChangeSeguimiento}
                  options={listEtiquetaSeguimiento}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              {itemsNotes[valueEtiquetaSeguimiento].ResultadoContacto ? (
                <Form.Item
                  label="Resultado Contacto"
                  name="Resultado_contacto"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Select options={listResultadoContacto} />
                </Form.Item>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              {itemsNotes[valueEtiquetaSeguimiento].MotivoInasistencia ? (
                <Form.Item
                  label="Motivo de inasistencia"
                  name="Motivo_inasistencia"
                >
                  <Select options={listMotivo} />
                </Form.Item>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              {itemsNotes[valueEtiquetaSeguimiento].EtiquetaAdministrativa ? (
                <Form.Item
                  label="Etiqueta Administrativa"
                  name="Etiqueta_administrativa"
                >
                  <Select options={listEtiquetaAdministrativa} />
                </Form.Item>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              {itemsNotes[valueEtiquetaSeguimiento].PlanRutaAtención ? (
                <Form.Item label="Plan/Ruta Atención" name="Plan_ruta">
                  <Select
                    onChange={handleChangeRutaAtencion}
                    options={listPlanRutaAtencion}
                  />
                </Form.Item>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              {itemsNotes[valueEtiquetaSeguimiento].Servicio ? (
                <Form.Item label="Servicio" name="servicio">
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="Seleccione servicios"
                    options={listServicio}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              {itemsNotes[valueEtiquetaSeguimiento].ObservacionSeguimiento ? (
                <Form.Item
                  label="Observación de Seguimiento"
                  name="Observación_seguimiento"
                >
                  <TextArea placeholder="Escriba observación..." rows={4} />
                </Form.Item>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              {itemsNotes[valueEtiquetaSeguimiento]
                .NotaCambioEtiquetaAdministrativa ? (
                <Form.Item
                  label="Nota Cambio Etiqueta Administrativa"
                  name="Nota_cambio_etiqueta_administrativa"
                >
                  <TextArea placeholder="Escriba nota..." rows={4} />
                </Form.Item>
              ) : null}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
