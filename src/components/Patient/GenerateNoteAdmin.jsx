import React, { useEffect, useState, Fragment } from "react";
import {
  Modal,
  Button,
  Form,
  Select,
  message,
  Input,
  Steps,
  Radio,
  DatePicker,
} from "antd";
import {
  getListEtiquetaSeguimientoForProgram,
  getListResultadoContactoForProgram,
  getListEtiquetaAdministrativaForProgram,
  getListMotivoInasistenciaForProgram,
  getListServicioXMonth,
  createNotes,
  getAtributesGenerateNote,
  identificarPlanesM,
} from "../../appRedux/services/index";
import moment from "moment";
import { itemsNotes } from "../../constants/ItemsNotes";
import { SelectMeses } from "../../constants/Months";
const { TextArea } = Input;

const disabledButton = { 1: { 0: false, 1: false }, 2: { 0: true, 1: false } };

export const GenerateNoteAdmin = ({
  open,
  setOpen,
  idPaciente,
  detailPlan,
  getInfo,
  getDataPlains,
  idPrograma,
}) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [listMotivo, setlistMotivo] = useState([]);
  const [atribEtiquetas, setAtribEtiquetas] = useState({
    id_Etiqueta_Amin_Actual: 0,
    Etiqueta_Amin_Actual: "",
    id_Etiqueta_Asistencial_Actual: 0,
    Etiqueta_Asistencial_Actual: "",
  });
  const [listEtiquetaSeguimiento, setlistEtiquetaSeguimiento] = useState([]);
  const [listResultadoContacto, setListResultadoContacto] = useState([]);
  const [listEtiquetaAdministrativa, setListEtiquetaAdministrativa] = useState(
    []
  );
  const [listServicio, setListServicio] = useState([]);
  const [valueEtiquetaSeguimiento, setValueEtiquetaSeguimiento] =
    useState(null);
  const [valueServicios, setValueServicios] = useState(null);
  const [contador, setContador] = useState(0);
  const [current, setCurrent] = useState(0);
  const [radio, setRadio] = useState(1);
  const [dataForm2, setDataForm2] = useState(null);
  const actual = {
    anoActual: new Date().getFullYear(),
    anoActualPicker: moment(),
    mesActual: new Date().getMonth() + 1,
  };
  const next = () => {
    setCurrent(current + 1);
    form2
      .validateFields()
      .then((values) => {
        console.log("Valores del formulario 2:", values);
        const json = {
          Etiqueta_seguimiento: values?.Etiqueta_seguimiento,
          Motivo_inasistencia: values?.Motivo_inasistencia,
          Etiqueta_administrativa: values?.Etiqueta_administrativa,
          Servicios: values.servicio?.join("|"),
          Observacion_seguimiento:
            values.Observación_seguimiento == undefined
              ? ""
              : values.Observación_seguimiento,
          Nota_cambio_etiqueta_administrativa:
            values.Nota_cambio_etiqueta_administrativa == undefined
              ? ""
              : values.Nota_cambio_etiqueta_administrativa,
          Plan_Ruta_txt: detailPlan,
        };
        setDataForm2(json);
      })
      .catch((errorInfo) => {
        console.log("Error en el formulario 2:", errorInfo);
      });
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "1",
      content: "1",
    },
    {
      title: "2",
      content: "2",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    //title: item.title,
  }));

  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setRadio(e.target.value);
    form.resetFields();
    form2.resetFields();
    form3.resetFields();
    setValueEtiquetaSeguimiento(null);
  };

  const onReset = () => {
    setValueEtiquetaSeguimiento(null);
    form.resetFields();
    form2.resetFields();
    form3.resetFields();
    setIsLoading(false);
  };

  useEffect(() => {
    if (open === true) {
      getPreferences();
    }
  }, [open, radio]);

  const getServicesXMonth = () => {
    form2
      .validateFields()
      .then(async (values) => {
        const Servicio = await getListServicioXMonth(
          detailPlan,
          values.month,
          values.ano?.format("YYYY")
        );
        setListServicio(Servicio);
      })
      .catch(async (errorInfo) => {
        console.log("Error en el formulario 2:", errorInfo);
        const Servicio = await getListServicioXMonth(
          detailPlan,
          errorInfo.values.month,
          errorInfo.values.ano?.format("YYYY")
        );
        setListServicio(Servicio);
      });
  };

  const getPreferences = async () => {
    const EtiquetaSeguimiento = await getListEtiquetaSeguimientoForProgram(
      idPrograma
    );
    setlistEtiquetaSeguimiento(EtiquetaSeguimiento);
    const EtiquetaAdministrativa =
      await getListEtiquetaAdministrativaForProgram(idPrograma);
    setListEtiquetaAdministrativa(EtiquetaAdministrativa);
    const resp = await getAtributesGenerateNote(idPaciente);
    console.log(Number(resp.id_Etiqueta_Amin_Actual));
    setAtribEtiquetas(resp);
    // form.setFieldsValue({
    //   Etiqueta_administrativa: resp?.id_Etiqueta_Amin_Actual,
    // });
    if (radio === 2) {
      form2.setFieldsValue({
        ano: actual.anoActualPicker,
      });
      form2.setFieldsValue({
        month: actual.mesActual,
      });
      form2.setFieldsValue({
        Etiqueta_administrativa: Number(
          atribEtiquetas?.id_Etiqueta_Amin_Actual
        ),
      });
      const Servicio = await getListServicioXMonth(
        detailPlan,
        actual.mesActual,
        actual.anoActual
      );
      setListServicio(Servicio);
    }
  };

  useEffect(() => {
    // Encuentra el texto asociado al valor en atribEtiquetas
    const selectedOption = listEtiquetaAdministrativa.find(
      (option) =>
        option.value === Number(atribEtiquetas?.id_Etiqueta_Amin_Actual)
    );
    console.log(selectedOption);
    if (selectedOption) {
      // Si encontramos el texto asociado, actualizamos el valor del campo de selección.
      form.setFieldsValue({
        Etiqueta_administrativa: selectedOption.value,
      });
    }
  }, [form, atribEtiquetas, listEtiquetaAdministrativa]);

  useEffect(async () => {
    if (valueEtiquetaSeguimiento !== null) {
      console.log(valueEtiquetaSeguimiento);
      const MotivoInasistencia = await getListMotivoInasistenciaForProgram(
        valueEtiquetaSeguimiento,
        idPrograma
      );
      setlistMotivo(MotivoInasistencia);
      const ResultadoContacto = await getListResultadoContactoForProgram(
        valueEtiquetaSeguimiento,
        idPrograma
      );
      setListResultadoContacto(ResultadoContacto);
    }
  }, [valueEtiquetaSeguimiento]);

  useEffect(async () => {
    if (valueServicios !== null) {
      setContador(valueServicios.length);
    }
  }, [valueServicios]);

  useEffect(async () => {
    if (current == 1) {
      valueServicios.forEach((item, index) => {
        const propiedad = `Servicio_${index + 1}`;
        form3.setFieldValue(propiedad, valueServicios[index]);
      });
    }
  }, [current]);

  const onFinish = async () => {
    if (radio === 1) {
      const values = form.getFieldsValue();
      const fechaActual = new Date();
      const fechaActualjson = {
        mes: fechaActual.getMonth() + 1,
        ano: fechaActual.getFullYear(),
      };
      const respu = await identificarPlanesM(detailPlan, fechaActualjson);
      let resultado = "";
      respu.forEach((item) => {
        resultado += `${item.value},${values.Resultado_contacto},`;
      });
      const servicios = respu.map((item) => item.value);
      let value = {
        Etiqueta_seguimiento: values?.Etiqueta_seguimiento,
        Resultado_contacto: values?.Resultado_contacto,
        Tabla_Resultados: resultado?.slice(0, -1),
        Motivo_inasistencia: values?.Motivo_inasistencia,
        Etiqueta_administrativa: values?.Etiqueta_administrativa,
        Observación_seguimiento: values?.Observación_seguimiento,
      };
      const json = {
        Etiqueta_seguimiento: values?.Etiqueta_seguimiento,
        Motivo_inasistencia: values?.Motivo_inasistencia,
        Etiqueta_administrativa: values?.Etiqueta_administrativa,
        Servicios: servicios?.join("|"),
        Observacion_seguimiento:
          values.Observación_seguimiento == undefined
            ? ""
            : values.Observación_seguimiento,
        Nota_cambio_etiqueta_administrativa:
          values.Nota_cambio_etiqueta_administrativa == undefined
            ? ""
            : values.Nota_cambio_etiqueta_administrativa,
        Plan_Ruta_txt: detailPlan,
      };
      setIsLoading(true);
      const resp = await createNotes(idPaciente, value, json);
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
      close();
    } else if (radio === 2) {
      const values = form3.getFieldsValue();
      let value = {
        Etiqueta_seguimiento: dataForm2?.Etiqueta_seguimiento,
        Resultado_contacto: undefined,
        Tabla_Resultados: undefined,
        Motivo_inasistencia: dataForm2?.Motivo_inasistencia,
        Etiqueta_administrativa: dataForm2?.Etiqueta_administrativa,
        Observación_seguimiento: dataForm2?.Observación_seguimiento,
      };
      let valores = [];
      console.log(values);
      for (let index = 0; index < Object.keys(values).length; index++) {
        const propiedad = `Resultado_contacto_${index + 1}`;
        if (values.hasOwnProperty(propiedad)) {
          const valor = values[propiedad];
          if (valor !== undefined && valor !== null && valor !== "") {
            valores.push(valor);
          }
        }
      }
      value.Resultado_contacto = valores?.join("|");
      let resultado = "";
      const splitServices = dataForm2.Servicios.split("|");
      console.log(splitServices);
      for (let i = 0; i < splitServices.length; i++) {
        // Agregar el servicio y la etiqueta de seguimiento al String, intercalándolos
        resultado += `${splitServices[i]},${valores[i]},`;
      }
      value.Tabla_Resultados = resultado.slice(0, -1);
      setIsLoading(true);
      const resp = await createNotes(idPaciente, value, dataForm2);
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
    }
    setIsLoading(false);
    form.resetFields();
    form2.resetFields();
    form3.resetFields();
    setValueEtiquetaSeguimiento(null);
    getInfo();
    getDataPlains();
    close();
  };

  const close = () => {
    onReset();
    setOpen(false);
  };

  const handleChangeSeguimiento = (value) => {
    console.log(`selected ${value}`);
    setValueEtiquetaSeguimiento(value);
  };

  const handleChangeServicios = (value) => {
    console.log(`selected ${value}`);
    setValueServicios(value);
  };

  const handleChangeResultadoContacto = (value) => {
    console.log(`selected ${value}`);
    //setDataForm3(dataForm3.push(value));
  };

  const renderInputs = () => {
    return Array.from({ length: contador }, (_, index) => (
      <Fragment key={index}>
        <div className="row">
          <div className="col-12 col-md-6">
            <Form.Item
              label={`Servicio ${index + 1}`}
              name={`Servicio_${index + 1}`}
            >
              <Select
                disabled
                value={valueServicios ? valueServicios[index] : ""}
                placeholder="Servicio"
                options={listServicio}
              />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item
              label={`Resultado Contacto ${index + 1}`}
              name={`Resultado_contacto_${index + 1}`}
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Select
                onChange={handleChangeResultadoContacto}
                options={listResultadoContacto}
              />
            </Form.Item>
          </div>
        </div>
      </Fragment>
    ));
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
          <Button key="button-cancel" onClick={close}>
            Cerrar
          </Button>,
          <Button
            style={{ backgroundColor: "#00ABC8", color: "#FFF" }}
            key="button-actualizar"
            onClick={onFinish}
            loading={isLoading}
            disabled={disabledButton[radio][current]}
          >
            Guardar
          </Button>,
        ]}
      >
        <Radio.Group
          onChange={onChangeRadio}
          value={radio}
          style={{ marginBottom: "20px" }}
        >
          <Radio value={1}>General</Radio>
          <Radio value={2}>Planes Mensuales</Radio>
        </Radio.Group>
        {radio === 1 ? (
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
              },
              {
                name: ["Resultado_contacto"],
              },
              {
                name: ["Motivo_inasistencia"],
              },
              {
                name: ["Etiqueta_administrativa"],
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
              {itemsNotes[valueEtiquetaSeguimiento].ObservacionSeguimiento ? (
                <div className="col-12 col-md-12">
                  <Form.Item
                    label="Observación de Seguimiento"
                    name="Observación_seguimiento"
                  >
                    <TextArea placeholder="Escriba observación..." rows={4} />
                  </Form.Item>
                </div>
              ) : null}
              {itemsNotes[valueEtiquetaSeguimiento]?.ResultadoContacto ? (
                <div className="col-12 col-md-6">
                  <Form.Item
                    label="Resultado Contacto"
                    name="Resultado_contacto"
                    rules={[{ required: true, message: "Campo obligatorio" }]}
                  >
                    <Select options={listResultadoContacto} />
                  </Form.Item>
                </div>
              ) : null}
              {itemsNotes[valueEtiquetaSeguimiento]?.MotivoInasistencia ? (
                <div className="col-12 col-md-6">
                  <Form.Item
                    label="Motivo de inasistencia"
                    name="Motivo_inasistencia"
                  >
                    <Select options={listMotivo} />
                  </Form.Item>
                </div>
              ) : null}
              <div className="col-12 col-md-6">
                <Form.Item
                  label="Etiqueta Administrativa"
                  name="Etiqueta_administrativa"
                >
                  <Select
                    options={listEtiquetaAdministrativa}
                    // defaultValue={Number(
                    //   atribEtiquetas?.id_Etiqueta_Amin_Actual
                    // )}
                  />
                </Form.Item>
              </div>
              <div className="col-12 col-md-12">
                <Form.Item
                  label="Nota Cambio Etiqueta Administrativa"
                  name="Nota_cambio_etiqueta_administrativa"
                >
                  <TextArea placeholder="Escriba nota..." rows={4} />
                </Form.Item>
              </div>
              {itemsNotes[valueEtiquetaSeguimiento]?.Servicio ? (
                <div className="col-12 col-md-6">
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
                </div>
              ) : null}
            </div>
          </Form>
        ) : null}
        {radio === 2 ? (
          <>
            <Steps
              current={current}
              items={items}
              style={{ marginBottom: "20px" }}
            />
            {current === 0 ? (
              <Form
                id="form2"
                form={form2}
                name="form2"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                fields={[
                  {
                    name: ["Etiqueta_seguimiento"],
                  },
                  {
                    name: ["Motivo_inasistencia"],
                  },
                  {
                    name: ["Etiqueta_administrativa"],
                  },
                  {
                    name: ["month"],
                  },
                  {
                    name: ["ano"],
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
                  {itemsNotes[valueEtiquetaSeguimiento]
                    ?.ObservacionSeguimiento ? (
                    <div className="col-12 col-md-12">
                      <Form.Item
                        label="Observación de Seguimiento"
                        name="Observación_seguimiento"
                      >
                        <TextArea
                          placeholder="Escriba observación..."
                          rows={4}
                        />
                      </Form.Item>
                    </div>
                  ) : null}
                  {itemsNotes[valueEtiquetaSeguimiento]?.MotivoInasistencia ? (
                    <div className="col-12 col-md-6">
                      <Form.Item
                        label="Motivo de inasistencia"
                        name="Motivo_inasistencia"
                      >
                        <Select options={listMotivo} />
                      </Form.Item>
                    </div>
                  ) : null}
                  <div className="col-12 col-md-6">
                    <Form.Item label="Año" name="ano">
                      <DatePicker
                        style={{ width: "100%" }}
                        onChange={getServicesXMonth}
                        placeholder="Seleccione un año"
                        picker="year"
                        //defaultValue={actual.anoActualPicker}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-6">
                    <Form.Item label="Mes" name="month">
                      <Select
                        style={{ width: "100%" }}
                        options={SelectMeses}
                        placeholder="Seleccione un mes"
                        onChange={getServicesXMonth}
                        //defaultValue={actual.mesActual}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-6">
                    <Form.Item
                      label="Servicios/Planes Mensuales"
                      name="servicio"
                    >
                      <Select
                        showSearch
                        allowClear
                        onChange={handleChangeServicios}
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
                  </div>
                  <div hidden className="col-12 col-md-6">
                    <Form.Item
                      label="Etiqueta Administrativa"
                      name="Etiqueta_administrativa"
                    >
                      <Select
                        options={listEtiquetaAdministrativa}
                        // defaultValue={Number(
                        //   atribEtiquetas?.id_Etiqueta_Amin_Actual
                        // )}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            ) : null}

            {current === 1 ? (
              <Form
                id="form3"
                form={form3}
                name="form3"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                {renderInputs()}
              </Form>
            ) : null}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Siguiente
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Atrás
              </Button>
            )}
          </>
        ) : null}
      </Modal>
    </>
  );
};
