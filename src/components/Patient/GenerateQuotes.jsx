import { React, useState, useEffect, Fragment } from "react";
import {
  Form,
  Button,
  Row,
  DatePicker,
  Modal,
  Select,
  message,
  Steps,
  List,
  Checkbox,
  Input,
  notification,
  Collapse,
} from "antd";
import Swal from "sweetalert2";
import { SelectMeses } from "../../constants/Months";
import {
  generateQuotes,
  getListQuotes,
  triggerQuotes,
  deleteQuotes,
  identificarPlanesM,
  getListEtiquetaSeguimiento,
  getListResultadoContactoQuotes,
  createNotes,
  getListHorarioAgendamiento,
  getInfPacient,
  NovedadesPlanMens,
  actNotificados,
  actFranja,
  getAtributesGenerateNote,
  RunGenerateQuotes,
  actFechaDeseada,
  getListPlanesMensualesWithID,
  getListProfesionalesWithProfesion,
  actualizarFiltrosPlanesXProfesionales,
  validateIntegration,
} from "../../appRedux/services";
import moment from "moment";
import "../../styles/global/customGlobal.css";
const { TextArea } = Input;
const { Panel } = Collapse;

export const GenerateQuotes = ({
  detailPlan,
  openModalGenerateQuotes,
  setOpenModalGenerateQuotes,
  idPaciente,
}) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolder2] = notification.useNotification();
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [planes, setPlanes] = useState(null);
  const [listEtiquetaSeguimiento, setlistEtiquetaSeguimiento] = useState([]);
  const [listResultadoContacto, setListResultadoContacto] = useState([]);
  const [objeto, setObjeto] = useState(null);
  const [horarioAgendamiento, setHorarioAgendamiento] = useState(null);
  const [fechaDeseada, setfechaDeseada] = useState(null);
  const [listHorariosAgendamientos, setlistHorariosAgendamientos] = useState(
    []
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isListErrors, setIsListErrors] = useState(false);
  const [listPlanesMensualesWithID, setListPlanesMensualesWithID] = useState(
    []
  );
  const [listProfe, setListProfe] = useState([]);
  const [atribEtiquetas, setAtribEtiquetas] = useState({
    id_Etiqueta_Amin_Actual: 0,
    Etiqueta_Amin_Actual: "",
    id_Etiqueta_Asistencial_Actual: 0,
    Etiqueta_Asistencial_Actual: "",
  });
  const [final_values, setFinal_values] = useState(null);
  const fechaActual = new Date();
  const [listErrors, setListErrors] = useState(null);

  const disabledDate = (current) => {
    return current && current < fechaActual;
  };

  useEffect(async () => {
    const resp = await getAtributesGenerateNote(idPaciente);
    console.log(Number(resp.id_Etiqueta_Amin_Actual));
    setAtribEtiquetas(resp);
  }, []);

  useEffect(async () => {
    if (current === 2) {
      const EtiquetaSeguimiento = await getListEtiquetaSeguimiento(2);
      setlistEtiquetaSeguimiento(EtiquetaSeguimiento);
      const ResultadoContacto = await getListResultadoContactoQuotes();
      setListResultadoContacto(ResultadoContacto);
      console.log(objeto);
      const respu = await identificarPlanesM(detailPlan, objeto);
      console.log("planes: ", respu);
      setPlanes(respu);
    }
  }, [current]);

  useEffect(async () => {
    if (planes !== null) {
      const initialValues = {};
      planes.forEach((plan, index) => {
        initialValues[`Plan_${index + 1}`] = plan.value;
        if (plan.extra > 0) {
          initialValues[`Resultado_contacto_${index + 1}`] = 40263464;
        }
      });
      form2.setFieldsValue(initialValues);
    }
  }, [planes]);

  useEffect(async () => {
    if (listPlanesMensualesWithID) {
      listPlanesMensualesWithID.forEach((item, index) => {
        const propiedad = `Plan_${index + 1}`;
        form.setFieldValue(propiedad, item.value);
      });
    }
  }, [listPlanesMensualesWithID]);

  useEffect(async () => {
    if (openModalGenerateQuotes) {
      form.setFieldValue("mes", fechaActual.getMonth() + 1);
      form.setFieldValue("ano", moment());
      onChange();
    }
  }, [openModalGenerateQuotes]);

  const update = async () => {
    setLoading2(true);
    const resp = await actFranja(idPaciente, horarioAgendamiento);
    console.log(resp);
    if (resp?.status === "fail") {
      await messageApi.open({
        type: "error",
        content: resp?.message || "error",
      });
    } else if (resp?.status === "ok") {
      await messageApi.open({
        type: "success",
        content: "Franja Actualizada correctamente",
      });
      stepOne(objeto);
    }
    const respu = await actFechaDeseada(detailPlan, fechaDeseada);
    console.log(respu);
    if (respu?.status === "fail") {
      await messageApi.open({
        type: "error",
        content: resp?.message || "error",
      });
    } else if (respu?.status === "ok") {
      await messageApi.open({
        type: "success",
        content: "Franja Actualizada correctamente",
      });
    }
    setLoading2(false);
    setModalVisible(false);
  };

  const getPreferences = async (val) => {
    const resp = await getListQuotes();
    console.log("Termino 5 segundos");
    if (resp === null) {
      //setUpdateSelect(true);
      const HorariosAgendamientos = await getListHorarioAgendamiento();
      console.log(HorariosAgendamientos);
      setlistHorariosAgendamientos(HorariosAgendamientos);
      const InfoPreferences = await getInfPacient(idPaciente);
      console.log(InfoPreferences);
      setHorarioAgendamiento(Number(InfoPreferences?.R40686379_txt));
      setModalVisible(true);
      const response = await NovedadesPlanMens(idPaciente, val);
      for (const element of response) {
        await actNotificados(element.id);
        api.warning({
          message: `${element.Plan_Mensual_txt}`,
          description: `${element.Resultado}`,
          duration: 30000,
        });
      }
    } else {
      console.log(final_values);
      const response = await NovedadesPlanMens(idPaciente, val);
      for (const element of response) {
        await actNotificados(element.id);
        api.info({
          message: `${element.Plan_Mensual_txt}`,
          description: `${element.Resultado}`,
          duration: 30000,
        });
      }
      setData(resp);
    }
  };

  const close = () => {
    if (current === 0) {
      setOpenModalGenerateQuotes(false);
      form.resetFields();
    } else if (current === 1) {
      Swal.fire({
        title: "¿Seguro?",
        text: "Se liberaran los espacios ocupados para las opciones de citas ¿Esta seguro de salir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          for (const item1 of data) {
            for (const item2 of item1) {
              await deleteQuotes(item2.id);
            }
          }
          Swal.fire("Espacios liberados");
          setOpenModalGenerateQuotes(false);
          setCurrent(0);
          form.resetFields();
          setData([]);
        }
      });
    }
  };

  const stepOne = async (val) => {
    const values = form.getFieldsValue();
    console.log(values);
    let valores = [];
    for (let index = 0; index < Object.keys(values).length; index++) {
      const propiedad = `Plan_${index + 1}`;
      const propiedad2 = `Profesional_${index + 1}`;
      if (values.hasOwnProperty(propiedad)) {
        const valor = values[propiedad];
        const valor2 = values[propiedad2];
        if (valor !== undefined && valor !== null && valor !== "") {
          valores.push({ plan: valor, profesional: valor2 });
        }
      }
    }
    console.log(valores);
    for (const item of valores) {
      console.log("items: ", item.plan, item.profesional);
      if (item.plan && item.profesional) {
        await actualizarFiltrosPlanesXProfesionales(item);
      }
    }
    const objeto = val;
    console.log(objeto);
    const resp = await generateQuotes(detailPlan, val);
    if (resp?.status === "fail") {
      await messageApi.open({
        type: "error",
        content: resp?.message || "error",
      });
    } else if (resp?.status === "ok") {
      await messageApi.open({
        type: "success",
        content: "El proceso de crear citas se ha ejecutado correctamente",
      });
    }
    console.log("5 segundos");
    //setTimeout(getPreferences, 2000);
    getPreferences(objeto);
  };

  const submitFin = async () => {
    if (current === 0) {
      setLoading(true);
      const mes = form.getFieldValue("mes");
      const ano = form.getFieldValue("ano")?.format("YYYY");
      const fecha = form.getFieldValue("fecha")?.format("YYYY-MM-DD");
      const Final_values = { mes: mes, ano: ano, fecha: fecha };
      console.log("Dentro del callback de setFinal_values");
      setObjeto(Final_values);
      await stepOne(Final_values);
      setLoading(false);
      next();
      console.log("final_values actualizado:", final_values);
    } else if (current === 1) {
      setLoading(true);
      let DesErrors = [];
      for (const item of selectedItems) {
        await triggerQuotes(item.id);
        const resp = await validateIntegration(item.id);
        const json = JSON.parse(resp);
        console.log(json);
        if (json.hasOwnProperty("error")) {
          const json2 = JSON.parse(json?.error?.message);
          if (json?.error.statusCode == 400) {
            DesErrors.push(json2.DescError.toString());
          }
        }
      }
      if (DesErrors.length > 0) {
        setListErrors(DesErrors);
        setIsListErrors(true);
        console.log(DesErrors);
      } else {
        setLoading(false);
        next();
      }
    } else if (current === 2) {
      const values = form2.getFieldsValue();
      let value = {
        Etiqueta_seguimiento: values?.tag,
        Resultado_contacto: undefined,
        Tabla_Resultados: undefined,
        Servicios: undefined,
        Etiqueta_administrativa: atribEtiquetas?.id_Etiqueta_Amin_Actual,
      };
      let valores = [];
      let valores2 = [];
      console.log(values);
      for (let index = 0; index < Object.keys(values).length; index++) {
        const propiedad = `Resultado_contacto_${index + 1}`;
        if (values.hasOwnProperty(propiedad)) {
          const valor = values[propiedad];
          if (valor !== undefined && valor !== null && valor !== "") {
            valores.push(valor);
            valores2.push(planes[index].value);
          }
        }
      }
      value.Resultado_contacto = valores?.join("|");
      const Json = {
        Servicios: valores2?.join("|"),
        Observacion_seguimiento: values?.observacion,
      };
      let resultado = "";
      for (let i = 0; i < planes.length; i++) {
        resultado += `${valores2[i]},${valores[i]},`;
      }
      value.Tabla_Resultados = resultado.slice(0, -1);
      setLoading(true);
      const resp = await createNotes(idPaciente, value, Json);
      console.log("Crear Nota: ", resp);
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
      setLoading(false);
      setOpenModalGenerateQuotes(false);
      setCurrent(0);
      form.resetFields();
      setData([]);
    }
  };

  const onChange = async (date, dateString) => {
    //console.log(date.getFullYear, dateString);
    const valores = form.getFieldsValue();
    console.log(valores);
    if (valores.mes && valores.ano) {
      const listPlanesMensualesWithID = await getListPlanesMensualesWithID(
        detailPlan,
        valores
      );
      setListPlanesMensualesWithID(listPlanesMensualesWithID);
      for (const item of listPlanesMensualesWithID) {
        const listProfesionalesWithProfesion =
          await getListProfesionalesWithProfesion(item?.idProfesion);
        setListProfe((prevArray) => [
          ...prevArray,
          listProfesionalesWithProfesion,
        ]);
      }
      console.log(listPlanesMensualesWithID);
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const continueListErrors = () => {
    //Swal.fire("GG");
    setLoading(false);
    setIsListErrors(false);
    next();
  };

  const closeListErrors = async () => {
    setData([]);
    setSelectedItems([]);
    await getPreferences(objeto);
    setLoading(false);
    setIsListErrors(false);
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
    {
      title: "3",
      content: "3",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    //title: item.title,
  }));

  const trigger = async (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem !== item
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
    console.log(selectedItems);
  };

  const newOptions = async () => {
    setData([]);
    setSelectedItems([]);
    setFinal_values(objeto);
    await RunGenerateQuotes(detailPlan);
    getPreferences(objeto);
  };

  const renderInputs = () => {
    return Array.from({ length: planes?.length }, (_, index) => (
      <Fragment key={index}>
        <div className="row">
          <div className="col-12 col-md-6">
            <Form.Item
              label={`Plan mensual ${index + 1}`}
              name={`Plan_${index + 1}`}
            >
              <Select
                options={planes}
                disabled
                placeholder="Plan"
                //value={planes[index]?.value}
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
                options={listResultadoContacto}
                placeholder="Seleccione un resultado contacto"
              />
            </Form.Item>
          </div>
        </div>
      </Fragment>
    ));
  };

  const renderInputs2 = () => {
    return Array.from(
      { length: listPlanesMensualesWithID.length },
      (_, index) => (
        <Fragment key={index}>
          <div className="row">
            <div className="col-12 col-md-6">
              <Form.Item
                label={`Plan Mensual ${index + 1}`}
                name={`Plan_${index + 1}`}
              >
                <Select
                  disabled
                  options={listPlanesMensualesWithID}
                  placeholder="Plan"
                  value={Number(listPlanesMensualesWithID[index]?.value)}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label={`Profesional ${index + 1}`}
                name={`Profesional_${index + 1}`}
                //rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select
                  //onChange={handleChangeResultadoContacto}
                  options={listProfe ? listProfe[index] : []}
                />
              </Form.Item>
            </div>
          </div>
        </Fragment>
      )
    );
  };

  return (
    <>
      {contextHolder}
      {contextHolder2}
      <Modal
        width={current === 1 ? "1415px" : "550px"}
        title="Generar Citas"
        open={openModalGenerateQuotes}
        onCancel={close}
        maskClosable={false}
        footer={[
          <Button onClick={close} key="back">
            Cancelar
          </Button>,
          <Button
            loading={loading}
            onClick={submitFin}
            key="submit"
            type="primary"
          >
            {current == 0 ? "Generar citas" : "Confirmar"}
          </Button>,
        ]}
      >
        <Modal
          width="550px"
          title="Alerta!!"
          open={modalVisible} // Asegúrate de tener una variable de estado para controlar la visibilidad del modal
          onOk={update}
          footer={[
            <Button
              style={{
                background: "#DD3333",
                borderColor: "#DD3333",
                color: "#FFFFFF",
              }}
              onClick={() => {
                setCurrent(0);
                setModalVisible(false);
              }}
              key="back"
            >
              Cancelar
            </Button>,
            <Button
              style={{
                background: "#3085D6",
                borderColor: "#3085D6",
                color: "#FFFFFF",
              }}
              loading={loading2}
              onClick={update}
              key="submit"
            >
              Confirmar
            </Button>,
          ]}
        >
          <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Mensaje: No se encontró disponibilidad para los planes mensuales.
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold", textAlign: "left" }}>
              Horario Agendamiento:
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                style={{ width: "100%" }}
                options={listHorariosAgendamientos}
                placeholder="Seleccione un horario"
                value={horarioAgendamiento}
                onChange={(val) => {
                  setHorarioAgendamiento(val);
                  console.log(val);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <label style={{ fontWeight: "bold", textAlign: "left" }}>
                Fecha Deseada:
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setfechaDeseada(value?.format("YYYY-MM-DD"));
                  }}
                  placeholder="Seleccione una fecha"
                  disabledDate={disabledDate}
                />
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          width="550px"
          title="Alerta!!"
          open={isListErrors} // Asegúrate de tener una variable de estado para controlar la visibilidad del modal
          onOk={continueListErrors}
          footer={[
            <Button
              style={{
                background: "#d33",
                borderColor: "#DD3333",
                color: "#FFFFFF",
              }}
              onClick={closeListErrors}
              key="back"
            >
              Cerrar
            </Button>,
            <Button
              style={{
                background: "#3085d6",
                borderColor: "#3085D6",
                color: "#FFFFFF",
              }}
              key="submit"
              onClick={continueListErrors}
            >
              Continuar
            </Button>,
          ]}
        >
          <>
            <ul>
              {listErrors?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        </Modal>
        <Steps
          current={current}
          items={items}
          style={{ marginBottom: "20px" }}
        />
        {current === 0 ? (
          <Form
            colon={false}
            //onFinish={onSubmit(current)}
            form={form}
            autoComplete="off"
            layout="vertical"
          >
            <Row
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Form.Item
                label="Mes a generar"
                name="mes"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select
                  placeholder="Seleccione un mes"
                  style={{ width: "100%" }}
                  options={SelectMeses}
                  onChange={onChange}
                />
              </Form.Item>
              <Form.Item
                label="Año a generar"
                name="ano"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={onChange}
                  picker="year"
                />
              </Form.Item>
              <Form.Item
                label="Fecha deseada"
                name="fecha"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                  disabledDate={disabledDate}
                />
              </Form.Item>
              <Collapse>
                <Panel header="Filtros Profesionales">{renderInputs2()}</Panel>
              </Collapse>
            </Row>
          </Form>
        ) : null}
        {current === 1 ? (
          <>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              {data?.map((timeLine, index) => (
                <List
                  key={index}
                  header={
                    <h3
                      style={{
                        //   background: "#184F9D",
                        fontWeight: "bold",
                        color: "white",
                        //   padding: "8px",
                      }}
                    >
                      {timeLine[0].Fecha_txt}
                    </h3>
                  }
                  bordered={true}
                  itemLayout="horizontal"
                  dataSource={timeLine}
                  renderItem={(item, index2) => {
                    console.log(`${index} = ${item?.nameExam}`);
                    const Disabled = selectedItems?.some(
                      (val) =>
                        val.nameExam === item.nameExam && val.id !== item.id
                    );

                    return (
                      <List.Item>
                        <Row>
                          <div
                            style={{
                              display: "flex",
                              alignContent: "center",
                              flexWrap: "wrap",
                              marginRight: "20px",
                            }}
                          >
                            <Checkbox
                              onChange={(value) => {
                                trigger(item);
                                //setSelectedCitas(item);
                                console.log(item);
                              }}
                              disabled={Disabled}
                            />
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <p>{item?.nameExam}</p>
                            <p>{item?.Canal_Atencion_txt}</p>
                            <p>{item?.Profesional_txt}</p>
                            <p>
                              {moment(
                                item?.Fecha_Cita,
                                "YYYY-MM-DD HH:mm:ss"
                              ).format("DD/MM/YYYY HH:mm")}
                            </p>
                          </div>
                        </Row>
                      </List.Item>
                    );
                  }}
                  style={{ margin: "20px 20px 20px 20px", width: "425px" }}
                ></List>
              ))}
            </Row>
          </>
        ) : null}
        {current === 2 ? (
          <>
            <Form
              colon={false}
              //onFinish={onSubmit(current)}
              form={form2}
              autoComplete="off"
              layout="vertical"
            >
              <Row
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Form.Item
                  label="Etiqueta Seguimiento"
                  name="tag"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Select
                    placeholder="Seleccione una etiqueta"
                    style={{ width: "100%" }}
                    options={listEtiquetaSeguimiento}
                  />
                </Form.Item>
                <Form.Item label="Observación Seguimiento" name="observacion">
                  <TextArea style={{ width: "100%" }} rows={4} />
                </Form.Item>
                {renderInputs()}
              </Row>
            </Form>
          </>
        ) : null}
        {current == 1 && (
          <Button type="primary" onClick={newOptions}>
            Nuevas Opciones
          </Button>
        )}
        {/* {current < steps.length - 1 && (
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
        )} */}
      </Modal>
    </>
  );
};
