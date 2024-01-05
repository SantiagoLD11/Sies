import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  createAndDeleteBloqueoMotivo,
  getListMotivos,
} from "../../appRedux/services";
import "./stylesCalendar.css";
import { Popover, Modal, message, Button, Select, Tag, Tooltip } from "antd";
import {
  DeleteFilled,
  CloseCircleFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { tagStatus } from "../../constants/Tags";
import { BloqueoEliminarDesbloquear } from "../../constants/BloqueoEliminarDesbloquear";
import { FilterDisposition } from "./FilterDisposition";

const localizer = momentLocalizer(moment);
moment.locale("es");
const messages = {
  today: "Hoy",
  previous: "Anterior",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
};

const CalendarDisposition = ({
  id,
  activeKey,
  dataImported,
  setDataImported,
  changeStatus,
  setChangeStatus,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [motivo, setMotivo] = useState();
  const [motivoSelect, setMotivoSelect] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [json, setJson] = useState();
  const [bloqueoEliminar, setBloqueoEliminar] = useState();

  const minTime = new Date();
  minTime.setHours(6, 0, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 58, 0, 0);

  const handleOpenPopover = () => {
    // Ocultar el popover
    const popover = document.querySelector(".popover-calendar");
    if (popover) {
      popover.style.display = "none";
    }
  };

  const handleMotivo = (value) => {
    console.log(value);
    setMotivoSelect(value);
    const date_end = new Date(dataUser?.fecha_hora);
    const minutesToAdd = dataUser?.duracion;
    date_end.setMinutes(date_end.getMinutes() + minutesToAdd);
    setJson({
      Fecha_Hora: new Date(dataUser?.fecha_hora).getTime(),
      Fecha_Hora_Final: new Date(date_end).getTime(),
      Hora: moment(new Date(dataUser?.fecha_hora)).format("LT"),
      Duracion: moment(new Date(date_end)).format("LT"),
      Id: value,
      BloqueoEliminar: BloqueoEliminarDesbloquear[bloqueoEliminar].tipoAgenda,
      IdProfesional: id,
    });
    console.log("datauser a enviar", json);
  };

  useEffect(() => {
    if (id && activeKey === "2") {
      getData();
    }
  }, [resp, id, activeKey]);

  const handleOk = async () => {
    try {
      await createAndDeleteBloqueoMotivo(json);
      await messageApi.open({
        type: "success",
        content: BloqueoEliminarDesbloquear[bloqueoEliminar].mensaje,
      });
    } catch (error) {
      await messageApi.open({
        type: "error",
        content: error.response?.data?.message,
      });
    }
    setIsModalOpen(false);
    setMotivoSelect(null);
    setChangeStatus(!changeStatus);
  };
  const handleCancel = () => {
    setMotivoSelect(null);
    setIsModalOpen(false);
  };

  const getData = async () => {
    const newValue = resp?.map((availability) => {
      const date_end = new Date(availability?.fecha_hora);
      const minutesToAdd = availability?.duracion;
      date_end.setMinutes(date_end.getMinutes() + minutesToAdd);
      const Exam = availability?.idExam?.split(",");
      return {
        title: (
          <>
            {/* <div>{availability?.canal_atencion}</div> */}
            <Popover
              trigger="click"
              className="popover-calendar"
              content={
                <>
                  <div className="row" style={{ maxWidth: "400px" }}>
                    <div className="col-12 col-md-3">
                      <div
                        className="calendar-date-text"
                        style={{
                          backgroundColor:
                            tagStatus[availability?.color]?.color,
                        }}
                      >
                        {moment(new Date(availability?.fecha_hora)).format(
                          "DD MMM"
                        )}
                      </div>
                    </div>
                    <div className="col info-text-popover">
                      <h5 className="mb-3">
                        Canal de atención: {availability?.canal_atencion || "-"}
                      </h5>
                      <div>
                        Programa: <span>{availability?.programa || "-"}</span>
                      </div>
                      <div>
                        Sede: <span>{availability?.sede || "-"}</span>
                      </div>
                      <div>
                        Examen:{" "}
                        <span>
                          {(
                            <ul>
                              {Exam?.map((value) => (
                                <li key={value}>
                                  {value || "Sin información"}
                                </li>
                              ))}
                            </ul>
                          ) || "-"}
                        </span>
                      </div>
                      <div className="my-3">
                        Hora:{" "}
                        <span>
                          {moment(new Date(availability?.fecha_hora)).format(
                            "LT"
                          )}{" "}
                          - {moment(new Date(date_end)).format("LT")}
                        </span>
                      </div>
                      <div className="my-3">
                        Duración:{" "}
                        <span>{availability?.duracion || "-"} minutos</span>
                      </div>
                      <div className="row">
                        <Tooltip title={"Bloquear"} disabled={availability.color == 4 || availability.color == 2 || availability.color == 3 ? true : false}>
                          <CloseCircleFilled
                            style={{ cursor: "pointer", width: "33%" }}
                            onClick={async () => {
                              console.log("Sirve", availability);
                              setBloqueoEliminar("bloqueo");
                              handleOpenPopover();
                              setIsModalOpen(true);
                              setDataUser(availability);
                              const response = await getListMotivos();
                              setMotivo(response);
                            }}
                          />
                        </Tooltip>
                        {/*
                        <Tooltip title={"Eliminar"} disabled={availability.color == 4 || availability.color == 2 || availability.color == 3 ? true : false}>
                          <DeleteFilled
                            style={{ cursor: "pointer", width: "33%" }}
                            onClick={async () => {
                              console.log("Sirve eliminar", availability);
                              setBloqueoEliminar("eliminar");
                              handleOpenPopover();
                              setIsModalOpen(true);
                              setDataUser(availability);
                              const response = await getListMotivos();
                              setMotivo(response);
                            }}
                          />
                        </Tooltip>
                         */}
                        <Tooltip title={"Desbloquear"} disabled={availability.color == 4 || availability.color == 3 || availability.color == 1 ? true : false}>
                          <ExclamationCircleOutlined
                            style={{ cursor: "pointer", width: "33%" }}
                            onClick={async () => {
                              console.log("Sirve desbloquear", availability);
                              setBloqueoEliminar("desbloqueo");
                              handleOpenPopover();
                              setIsModalOpen(true);
                              setDataUser(availability);
                              const response = await getListMotivos();
                              setMotivo(response);
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </>
              }
            >
              <Tooltip title={`${tagStatus[availability?.color]?.text}`}>
                <span className="span-calendar-text">
                  <Tag
                    style={{ width: "47%", height: "90%" }}
                    color={tagStatus[availability?.color]?.color}
                    icon={tagStatus[availability?.color]?.icon}
                  >
                  </Tag>
                </span>
              </Tooltip>
            </Popover>
          </>
        ),
        start: new Date(availability?.fecha_hora),
        end: date_end,
      };
    });
    setData(newValue);
  };

  return (
    <>
      <FilterDisposition
        id={id}
        setLoading={setLoading}
        setData={setResp}
        dataImported={dataImported}
        setDataImported={setDataImported}
        changeStatus={changeStatus}
        activeKey={activeKey}
      />
      <Calendar
        loading={loading}
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        messages={messages}
        //headerClassName="rbc-header"
        min={minTime}
        max={maxTime}
      />
      {contextHolder}
      <Modal
        style={{ zIndex: 2600 }}
        title={BloqueoEliminarDesbloquear[bloqueoEliminar]?.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        data={dataUser}
        footer={[
          <Button key="button-cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="button-integrar" onClick={handleOk}>
            Confirmar
          </Button>,
        ]}
      >
        <div
          label="Motivo"
          name="motivo"
          rules={[{ required: true, message: "Campo obligatorio" }]}
        >
          <Select
            id="selectmotivos"
            className="w-100"
            placeholder="Selecciona un motivo"
            onChange={handleMotivo}
            options={motivo}
            value={motivoSelect}
          />
        </div>
      </Modal>
    </>
  );
};

export default CalendarDisposition;
