import React, { useEffect, useState } from "react";
import moment from "moment";
import { viewStatus } from "../../constants/viewXStatus";
import { BooleanOptions } from "../../constants/BooleanOptions";
import {
  Form,
  Checkbox,
  Divider,
  Collapse,
  Progress,
  Button,
  Typography,
  Select,
  DatePicker,
  Row,
  Col,
  message,
  Modal,
} from "antd";
import {
  getListExamsRoutes,
  getListOrigenPlans,
  getListInfoPlansFilter,
  triggerProgram,
  triggerRenewPlan,
  getPercent,
  actFechaActivacion,
  validateQuotes,
  countProgram,
  getListPlanContractIds,
} from "../../appRedux/services";
import { DefaultTimeLineItem } from "../timeline/DefaultTimeLineItem";
import { GenerateQuotes } from "./GenerateQuotes";
import { GenerateNoteAdmin } from "../Patient/GenerateNoteAdmin";
import { SelectMeses } from "../../constants/Months";
const { Panel } = Collapse;
const { Text } = Typography;

export const ViewDetailPlans = ({
  detailPlan,
  idPaciente,
  listInfoPlans,
  setListInfoPlans,
  detailPlans,
  getData,
  getInfo,
  getDataPlains,
  viewButton,
}) => {
  console.log('detail');
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [listOriginPlans, setListOriginPlans] = useState([]);
  const [listExams, setListExams] = useState([]);
  const [listContratoPlan, setListContratoPlan] = useState([]);
  const [porcentaje, setPorcentaje] = useState(0);
  const [openModalGenerateQuotes, setOpenModalGenerateQuotes] = useState(false);
  const [openModalGenerateNoteAdmin, setOpenModalGenerateNoteAdmin] =
    useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [fechaActivacion, setFechaActivacion] = useState(null);
  const [fechaMilisegundos, setFechaMilisegundos] = useState(null);
  const [filters, setfilters] = useState(null);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  let final_values = null;

  const onChange = (date, dateString) => {
    console.log(date.getFullYear, dateString);
  };

  useEffect(() => {
    if (detailPlans?.fecha_activacion) {
      const parsedDate = moment(
        detailPlans.fecha_activacion,
        "ddd MMM DD YYYY"
      );
      setFechaActivacion(parsedDate);
      const startOfDay = parsedDate.startOf("day"); // Establecer horas, minutos y segundos en 0
      setFechaMilisegundos(startOfDay.valueOf());
    }
  }, [detailPlans]);

  const program = async () => {
    const resp = await validateQuotes(idPaciente);
    if (resp > 0) {
      const detailsPlans = await triggerProgram(detailPlan);
      const resp = await countProgram(detailPlan);
      if (resp == 0) {
        await messageApi.open({
          type: "error",
          content:
            "No existen Contratos Planes que coincidan con las caracteristicas del paciente.!",
        });
      } else if (resp != 0) {
        await messageApi.open({
          type: "success",
          content: "La ruta de atención ha sido programada correctamente",
        });
      }
      getData();
    } else {
      setIsOpenPopover(true);
    }
  };

  const renewPlan = async () => {
    const detailsPlans = await triggerRenewPlan(detailPlan);
    if (detailsPlans?.status === "fail") {
      await messageApi.open({
        type: "error",
        content: detailsPlans?.message || "error",
      });
    } else if (detailsPlans?.status === "ok") {
      await messageApi.open({
        type: "success",
        content: "La ruta de atención ha sido renovada correctamente",
      });
    }
    console.log("ave que es lo que e: ", detailsPlans);
    getData();
  };

  useEffect(() => {
    if (detailPlan) {
      getlist();
    }
  }, [detailPlan]);

  const getlist = async () => {
    const listOriginPlans = await getListOrigenPlans(detailPlan);
    setListOriginPlans(listOriginPlans);
    const listExams = await getListExamsRoutes(detailPlan);
    setListExams(listExams);
    const listPlanIds = await getListPlanContractIds(detailPlan);
    setListContratoPlan(listPlanIds);
  };

  useEffect(async () => {
    if (detailPlan) {
      try {
        const resp = await getPercent(detailPlan, filters);
        setPorcentaje(resp);
      } catch (error) {
        // Manejar el error si ocurre
        console.error("Error al obtener el porcentaje:", error);
      }
    }
  }, [listInfoPlans, detailPlan]);

  const onSubmit = async (values) => {
    const fecha = values?.year?.format("YYYY");
    final_values = {
      month: values?.month,
      year: fecha,
      origin: values?.origin,
      exam: values?.exam,
      pending: values?.pending,
      dissent: values?.dissent,
      plan: values?.plan
    };
    setfilters(final_values);
    console.log(values);
    const resp = await getListInfoPlansFilter(final_values, detailPlan);
    setListInfoPlans(resp);
  };

  return (
    <>
      {contextHolder}
      <Collapse>
        <Panel header="Información plan">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ margin: "10px", fontWeight: "bold" }}>Progreso:</p>
            <Progress
              style={{ margin: "10px" }}
              type="circle"
              percent={porcentaje}
            />
            <p style={{ margin: "10px", fontWeight: "bold" }}>
              Estado: {detailPlans?.Estado_txt}
            </p>
            {viewStatus[detailPlans?.Estado_txt]?.Programar ? (
              <>
                <Modal
                  title="Confirmar"
                  open={isOpenPopover}
                  onCancel={() => setIsOpenPopover(false)}
                  footer={[
                    <Button onClick={() => setIsOpenPopover(false)} key="back">
                      Cancelar
                    </Button>,
                    <Button
                      //loading={loading}
                      onClick={async () => {
                        await actFechaActivacion(detailPlan, fechaMilisegundos);
                        const detailsPlans = await triggerProgram(detailPlan);
                        console.log(detailsPlans);
                        if (detailsPlans?.status === "fail") {
                          await messageApi.open({
                            type: "error",
                            content: detailsPlans?.message || "error",
                          });
                        } else if (detailsPlans?.status === "ok") {
                          await messageApi.open({
                            type: "success",
                            content:
                              "La ruta de atención ha sido programada correctamente",
                          });
                        }
                        getData();
                        setIsOpenPopover(false);
                      }}
                      key="submit"
                      type="primary"
                    >
                      Confirmar
                    </Button>,
                  ]}
                >
                  <p
                    style={{ marginBottom: "20px" }}
                  >{`La fecha de activación es ${moment(
                    detailPlans?.fecha_activacion,
                    "ddd MMM DD YYYY"
                  ).format("YYYY-MM-DD")}
                    , si es correcto oprime Confirmar.`}</p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontWeight: "bold", textAlign: "left" }}>
                      Fecha Activación:
                    </label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        style={{ width: "100%" }}
                        value={fechaActivacion}
                        onChange={(val) => {
                          setFechaActivacion(val);
                          const startOfDay = val.startOf("day");
                          setFechaMilisegundos(startOfDay.valueOf());
                          console.log(startOfDay.valueOf());
                        }}
                      />
                    </div>
                  </div>
                </Modal>

                <Button
                  style={{ margin: "10px", backgroundColor: "#00ABC8", color: "#FFF" }}
                  onClick={program}
                >
                  Programar
                </Button>
              </>
            ) : null}
            {viewStatus[detailPlans?.Estado_txt]?.Renovar ? (
              <Button
                style={{
                  margin: "10px",
                  backgroundColor: "#184F9D",
                  color: "#fff",
                }}
                onClick={renewPlan}
              >
                Renovar plan
              </Button>
            ) : null}
            {viewStatus[detailPlans?.Estado_txt]?.Generar ? (
              <Button
                style={{
                  margin: "10px",
                  backgroundColor: "#55A537",
                  color: "#fff",
                }}
                onClick={() => setOpenModalGenerateQuotes(true)}
              >
                Generar citas
              </Button>
            ) : null}

            <GenerateQuotes
              openModalGenerateQuotes={openModalGenerateQuotes}
              setOpenModalGenerateQuotes={setOpenModalGenerateQuotes}
              detailPlan={detailPlan}
              idPaciente={idPaciente}
            />
            {viewStatus[detailPlans?.Estado_txt]?.Nota ? (
              <Button
                style={{
                  margin: "10px",
                  backgroundColor: "#2AC6DE",
                  color: "#FFF",
                }}
                onClick={() => setOpenModalGenerateNoteAdmin(true)}
              >
                Nota administrativa
              </Button>
            ) : null}
            <GenerateNoteAdmin
              open={openModalGenerateNoteAdmin}
              setOpen={setOpenModalGenerateNoteAdmin}
              idPaciente={idPaciente}
              detailPlan={detailPlan}
              getInfo={getInfo}
              getDataPlains={getDataPlains}
              idPrograma={detailPlans.idPrograma}
            />
          </div>
          <Divider />
          <Form
            id="form"
            form={form}
            name="form"
            autoComplete="off"
            layout="vertical"
          >
            <div className="row">
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Creado en:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>
                      {moment(
                        detailPlans.creado,
                        "ddd MMM DD YYYY HH:mm:ss (ZZ)"
                      ).format("YYYY-MM-DD HH:mm")}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Fecha inscripción:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>
                      {moment(
                        detailPlans.fecha_inscripcion,
                        "ddd MMM DD YYYY"
                      ).format("YYYY-MM-DD")}
                    </Text>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Fecha activación:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>
                      {moment(
                        detailPlans?.fecha_activacion,
                        "ddd MMM DD YYYY"
                      ).format("YYYY-MM-DD")}
                    </Text>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Fecha renovación:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>
                      {moment(
                        detailPlans.fecha_renovacion,
                        "ddd MMM DD YYYY"
                      ).format("YYYY-MM-DD")}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    SubPrograma:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{detailPlans.subprograma}</Text>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Renovación:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox checked={detailPlans.renovacion} disabled />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Programa:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{detailPlans.programa}</Text>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Contrato sede:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{detailPlans.contrato_sede}</Text>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Ciudad:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{detailPlans.ciudad}</Text>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Estadio:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{detailPlans.estadio}</Text>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Contrato Plan Gomedisys:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{detailPlans.contrato_plan}</Text>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    1era vez:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox checked={detailPlans.primera_vez} disabled />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Panel>
        <Panel header="Filtros">
          <Form
            onFinish={onSubmit}
            form={form2}
            autoComplete="off"
            layout="vertical"
            name="form2"
            id="form2"
          >
            <Row style={{ flexDirection: "row" }} gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Mes" name="month">
                  <Select
                    style={{ width: "100%" }}
                    options={SelectMeses}
                    placeholder="Seleccione un mes"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Año" name="year">
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={onChange}
                    picker="year"
                    placeholder="Seleccione un año"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Origen" name="origin">
                  <Select
                    style={{ width: "100%" }}
                    options={listOriginPlans}
                    placeholder="Seleccione un origen"
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Examen" name="exam">
                  <Select
                    style={{ width: "100%" }}
                    options={listExams}
                    placeholder="Seleccione un examen"
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Pendiente" name="pending">
                  <Select
                    style={{ width: "100%" }}
                    options={BooleanOptions}
                    placeholder="Seleccione una opción"
                    defaultValue={undefined}
                  />
                  {/* <Checkbox
                    checked={pending}
                    onChange={(e) => setPending(e.target.checked)}
                  /> */}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Disentido" name="dissent">
                  <Select
                    style={{ width: "100%" }}
                    options={BooleanOptions}
                    placeholder="Seleccione una opción"
                    defaultValue={undefined}
                  />
                  {/* <Checkbox
                    checked={dissent}
                    onChange={(e) => setDissent(e.target.checked)}
                  /> */}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Contrato Plan" name="plan">
                  <Select
                    style={{ width: "100%" }}
                    options={listContratoPlan}
                    placeholder="Seleccione"
                  />
                </Form.Item>
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
                span={24}
              >
                <Button htmlType="submit" type="primary">
                  Filtrar
                </Button>
                <Button
                  onClick={() => {
                    form2.resetFields();
                    onSubmit(undefined);
                  }}
                >
                  Limpiar Filtros
                </Button>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
      <Divider />
      <div className="gx-timeline-section gx-timeline-center">
        {listInfoPlans?.map((timeLine, index) => (
          <DefaultTimeLineItem
            key={index}
            styleName={index % 2 === 0 ? "" : "gx-timeline-inverted"}
            timeLine={timeLine}
            idPaciente={idPaciente}
            getData={getData}
            viewButton={viewButton}
            detailPlan={detailPlan}
            idPrograma={detailPlans.idPrograma}
          />
        ))}
      </div>
    </>
  );
};
