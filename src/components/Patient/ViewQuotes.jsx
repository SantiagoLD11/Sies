import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, Table, message,Tag } from "antd";
import {
  getInfoQuote,
  getRemissionQuotes,
  schedule,
  reschedule,
  deleteQuotes,
} from "../../appRedux/services/index";
import moment from "moment";
import { CancelAppointment } from "./CancelAppointment";
import { tagStatusRemQuotes } from "../../constants/Tags";

const { Text } = Typography;

export const ViewQuotes = ({
  open,
  setOpen,
  dataRow,
  idPaciente,
  setDataTablePm,
  setListInfoPlans,
  detailPlan,
  idPm,
  setOpenPopover,
  viewButton,
}) => {
  const [dataTable, setDataTable] = useState([]);
  const [dataQuote, setDataQuote] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  useEffect(() => {
    if (idPaciente && open === true) {
      getInfo();
    }
  }, [open]);

  const getInfo = async () => {
    const Data = await getInfoQuote(dataRow.id);
    setDataQuote(Data);
    console.log(dataRow);
    console.log("Llego: ", Data);
    const DataTable = await getRemissionQuotes(idPaciente, dataRow.id);
    console.log("Datatable: ", DataTable);
    setDataTable(DataTable);
  };

  const close = () => setOpen(false);

  const columns = [
    {
      title: "Fecha Cita",
      dataIndex: "Fecha_Cita",
      key: "Fecha_Cita",
      render: (text) =><strong>{moment(text).format("DD/MM/YYYY")}</strong>,
    },
    {
      title: "Mes Remision",
      dataIndex: "MesRemision",
      key: "MesRemision",
    },
    {
      title: "Estado",
      dataIndex: "Estado_txt",
      render: (text) => (
        <Tag
          style={{ width: "100%" }}
          color={tagStatusRemQuotes[text]?.color}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Especialidad",
      dataIndex: "Especialidad_txt",
      key: "Especialidad_txt",
    },
    {
      title: "Canal Remision",
      dataIndex: "CanalRemision",
      key: "CanalRemision",
    },
    {
      title: "Resultado",
      dataIndex: "Resultado",
      key: "Resultado",
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        width={dataTable != null ? "70%" : "52%"}
        title={`Cita: ${dataRow?.name}`}
        open={open}
        onCancel={close}
        footer={[
          <>
            {viewButton ? (
              <Button
                key="button-cancel"
                onClick={() => {
                  setOpenPopover(true);
                  close();
                }}
              >
                Atras
              </Button>
            ) : null}
          </>,
          <Button key="button-cancel" onClick={close}>
            Cerrar
          </Button>,
        ]}
      >
        <div className="row">
          <div className="col-12 col-md-12 row">
            <h4 style={{ fontWeight: "bold", textAlign: "left", width: "40%" }}>
              INFORMACIÓN CITA
            </h4>
            <div
              style={{ display: "flex", flexDirection: "row", width: "40%" }}
            >
              {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
              <label
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  width: "72px",
                  fontSize: "18px",
                }}
              >
                Estado:
              </label>
              <div
                style={{ display: "flex", width: "220px", fontSize: "18px" }}
              >
                <Text>{dataQuote?.Estado_Txt}</Text>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "75%" }}
          >
            {/* <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Secuencia:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Secuencia}</Text>
                </div>
              </div>
            </div> */}

            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Ciudad:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Ciudad_Txt}</Text>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Sede Sies
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Sedetxt}</Text>
                </div>
              </div>
            </div>

            {/* <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  CodeOffice:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.codeOffice}</Text>
                </div>
              </div>
            </div> */}

            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Tipo Cita:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Codigo_Tipo}</Text>
                </div>
              </div>
            </div>

            {/* <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Paciente:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Paciente_txt}</Text>
                </div>
              </div>
            </div> */}

            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Plan Mensual:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Plan_Mensual_txt}</Text>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Especialidad:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Especialidad_txt}</Text>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Profesional:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Profesional_txt}</Text>
                </div>
              </div>
            </div>
            {/* <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Importado Gomedisys:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.Importado}</Text>
                </div>
              </div>
            </div> */}
            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Tipo Examen:
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataQuote?.nameExam}</Text>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "25%" }}
          >
            <Button
              style={{
                backgroundColor: "#00ABC8",
                width: "130px",
                color: "#FFF",
              }}
              onClick={async () => {
                console.log("Sirve Agendar", dataRow);
                const resp = await schedule(dataRow.id);
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
              disabled={
                dataRow?.Estado_Txt == "Cancelado" ||
                dataRow?.Estado_Txt == "Asistida" ||
                dataRow?.Estado_Txt == "Finalizada" ||
                dataRow?.Estado_Txt == "Solicitada" ||
                dataRow?.Estado_Txt == "No Asistida"
              }
            >
              Agendar
            </Button>
            <Button
              style={{ width: "130px" }}
              onClick={async () => {
                setIsModalCancel(true);
                setIsCancel(true);
              }}
              //dataRow
              disabled={
                dataRow?.Estado_Txt == "Cancelado" ||
                dataRow?.Estado_Txt == "Asistida" ||
                dataRow?.Estado_Txt == "Finalizada" ||
                dataRow?.Estado_Txt == "No Asistida"
              }
            >
              Cancelar
            </Button>
            <CancelAppointment
              isModalCancel={isModalCancel}
              setIsModalCancel={setIsModalCancel}
              dataRow={dataRow}
              getInfo={getInfo}
              isCancel={isCancel}
              setListInfoPlans={setListInfoPlans}
              setDataTable={setDataTablePm}
              detailPlan={detailPlan}
              idPmPlan={idPm}
            />
            <Button
              style={{ width: "130px" }}
              onClick={async () => {
                const resp = await deleteQuotes(dataRow.id);
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
                setOpen(false);
              }}
              disabled={
                dataRow?.Estado_Txt == "Cancelado" ||
                dataRow?.Estado_Txt == "Asistida" ||
                dataRow?.Estado_Txt == "Finalizada" ||
                dataRow?.Estado_Txt == "Solicitada" ||
                dataRow?.Estado_Txt == "No Asistida"
              }
            >
              Eliminar
            </Button>
            {dataQuote?.Estado_Txt == "No Asistida" ? (
              <Button
                style={{ width: "130px" }}
                onClick={async () => {
                  setIsModalCancel(true);
                  setIsCancel(false);
                }}
              >
                Reagendar
              </Button>
            ) : null}
          </div>
        </div>

        {dataQuote?.Estado_Txt == "Cancelado" ||
        dataQuote?.Estado_Txt == "Reprogramada" ? (
          <div className="row">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="col-12 col-md-12">
                <h4 style={{ fontWeight: "bold", textAlign: "left" }}>
                  CANCELACIÓN CITA
                </h4>
              </div>
              <div className="col-12 col-md-12">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Motivo Cancelación:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{dataQuote?.Motivo_Cancelacin_txt}</Text>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Observación Cancelación:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{dataQuote?.Observacin_Cancelacin}</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {dataTable != null ? (
          <>
            <div className="row">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="col-12 col-md-12">
                  <h4 style={{ fontWeight: "bold", textAlign: "left" ,marginTop:"10px"}}>
                    REMISIONES
                  </h4>
                </div>
              </div>
            </div>
            <Table
              style={{ marginTop: "20px" }}
              columns={columns}
              loading={false}
              dataSource={dataTable}
              //scroll={{ x: 1300 }}
            />
          </>
        ) : null}
      </Modal>
    </>
  );
};
