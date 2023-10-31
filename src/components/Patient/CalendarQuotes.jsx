import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getQuotes, deleteQuotes, schedule } from "../../appRedux/services";
import "../Professional/stylesCalendar.css";
import { Popover, message, Tooltip, Tag, Button } from "antd";
import { EyeOutlined, BellOutlined, DeleteOutlined } from "@ant-design/icons";
import { tagStatus3 } from "../../constants/Tags";
import { ViewQuotes } from "./ViewQuotes";

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

export const CalendarQuotes = ({ id, activeKey }) => {
  const [openModalViewQuotes, setOpenModalViewQuotes] = useState(false);
  const [dataQuotes, setDataQuotes] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const minTime = new Date();
  minTime.setHours(6, 0, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 0, 0, 0);

  const handleOpenPopover = () => {
    // Ocultar el popover
    const popover = document.querySelector(".popover-calendar");
    if (popover) {
      popover.style.display = "none";
    }
  };

  useEffect(() => {
    if (id && activeKey === "2") {
      getData();
    }
  }, [id, activeKey]);

  const getData = async () => {
    const resp = await getQuotes(id);
    console.log(resp);
    const newValue = resp?.map((availability) => {
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
                            tagStatus3[availability?.Estado_Txt]?.color,
                        }}
                      >
                        {moment(new Date(availability?.Fecha_Cita)).format(
                          "DD MMM"
                        )}
                      </div>
                    </div>
                    <div className="col info-text-popover">
                      <h5 className="mb-3">Cita {availability?.name || "-"}</h5>
                      <div className="mb-3">
                        Profesional: {availability?.Profesional_txt || "-"}
                      </div>
                      <div>
                        Estado: <span>{availability?.Estado_Txt || "-"}</span>
                      </div>
                      <div>
                        Sede Sies: <span>{availability?.Sedetxt || "-"}</span>
                      </div>
                      <div>
                        Ciudad: <span>{availability?.Ciudad_Txt || "-"}</span>
                      </div>
                      <div>
                        Canal Atención:
                        <span>{availability?.Canal_Atencion_txt || "-"}</span>
                      </div>
                      <div>
                        Plan Mensual:
                        <span>{availability?.Plan_Mensual_txt || "-"}</span>
                      </div>
                      <div>
                        Codigo Tipo:
                        <span>{availability?.Codigo_Tipo || "-"}</span>
                      </div>
                      <div>
                        Examen:
                        <span>{availability?.nameExam || "-"}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Tooltip title={"Ver"}>
                          <Button
                            onClick={async () => {
                              console.log("Sirve", availability);
                              handleOpenPopover();
                              setOpenModalViewQuotes(true);
                              setDataQuotes(availability);
                            }}
                          >
                            <EyeOutlined />
                          </Button>
                        </Tooltip>
                        <Tooltip title={"Agendar"}>
                          <Button
                            disabled={
                              availability?.Estado_Txt == "Cancelado" ||
                              availability?.Estado_Txt == "Asistida" ||
                              availability?.Estado_Txt == "Finalizada" ||
                              availability?.Estado_Txt == "Solicitada" ||
                              availability?.Estado_Txt == "No Asistida"
                            }
                            onClick={async () => {
                              console.log("Sirve Agendar", availability);
                              const resp = await schedule(availability.id);
                              if (resp?.status === "fail") {
                                await messageApi.open({
                                  type: "error",
                                  content: resp?.message || "error",
                                });
                              } else if (resp?.status === "ok") {
                                await messageApi.open({
                                  type: "success",
                                  content: "Agendada exitosamente",
                                });
                              }
                            }}
                          >
                            <BellOutlined />
                          </Button>
                        </Tooltip>

                        <Tooltip title={"Eliminar"}>
                          <Button
                            disabled={
                              availability?.Estado_Txt == "Cancelado" ||
                              availability?.Estado_Txt == "Asistida" ||
                              availability?.Estado_Txt == "Finalizada" ||
                              availability?.Estado_Txt == "Solicitada" ||
                              availability?.Estado_Txt == "No Asistida"
                            }
                            onClick={async () => {
                              console.log("Sirve eliminar", availability);
                              const resp = await deleteQuotes(availability.id);
                              console.log("eliminado: ", resp);
                              if (resp?.status === "fail") {
                                await messageApi.open({
                                  type: "error",
                                  content: resp?.message || "error",
                                });
                              } else if (resp?.status === "ok") {
                                await messageApi.open({
                                  type: "success",
                                  content: "Eliminada correctamente",
                                });
                              }
                              getData();
                            }}
                          >
                            <DeleteOutlined />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </>
              }
            >
              <span className="span-calendar-text">
                <Tag
                  style={{ width: "100%", height: "100%" }}
                  color={tagStatus3[availability?.Estado_Txt]?.color}
                >
                  {tagStatus3[availability?.Estado_Txt]?.text}
                </Tag>
                {/* {availability?.name} */}
              </span>
            </Popover>
          </>
        ),
        start: new Date(availability?.Fecha_Cita),
        end: new Date(availability?.Fecha_Cita_Fin),
      };
    });
    setData(newValue);
  };

  return (
    <>
      <ViewQuotes
        open={openModalViewQuotes}
        setOpen={setOpenModalViewQuotes}
        dataRow={dataQuotes}
        idPaciente={id}
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
      {/* <Modal
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
      </Modal> */}
    </>
  );
};
