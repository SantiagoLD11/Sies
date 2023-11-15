import { React, useState, useEffect } from "react";
import { Meses } from "../../constants/Months";
import {
  Button,
  Checkbox,
  Divider,
  Modal,
  Select,
  message,
  Tag,
  Table,
  Tooltip,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  ExceptionOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import {
  getListCanalAtencionfilter,
  updateExam,
  getFlagsQuotes,
  getNotesAdminTable,
} from "../../appRedux/services";
import { tagStatus2, tagStatus3 } from "../../constants/Tags";
import { ViewQuotes } from "../Patient/ViewQuotes";
import { ModalPertinencia } from "../Patient/ModalPertinencia";

export const DefaultTimeLineItem = ({
  styleName,
  timeLine,
  idPaciente,
  getData,
  viewButton,
  detailPlan,
  idPrograma,
}) => {
  const { Cita } = timeLine;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listCanal, setListCanal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [dataModal, setDataModal] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [dataTableNotes, setDataTableNotes] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [openNotas, setOpenNotas] = useState(false);
  const [openModalViewQuotes, setOpenModalViewQuotes] = useState(false);
  const [dataQuotes, setDataQuotes] = useState();
  const [resultadoName, setResultadoName] = useState("");
  const [isModalPertinencia, setIsModalPertinencia] = useState(false);
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const añoActual = fechaActual.getFullYear();

  const handleOk = async () => {
    const json = { Ruta: dataModal.Id, Canal: selectedOption?.join("|") };
    const json2 = { Ruta: dataModal.Id, Canal: "" };
    setLoading(true);
    const resp2 = await updateExam(json2);
    const resp = await updateExam(json);
    if (resp.status == "ok") {
      await messageApi.open({
        type: "success",
        content: "Se ha editado correctamente el canal de atención",
      });
    } else {
      await messageApi.open({
        type: "error",
        content: "error",
      });
    }
    setLoading(false);
    setIsModalOpen(false);
    setSelectedOption(null);
    getData();
    //setChangeStatus(!changeStatus);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    console.log(listCanal);
    setSelectedOption(null);
  };

  const handleSelectChange = (value) => {
    console.log(value);
    setSelectedOption(value);
  };

  const columns = [
    {
      title: "Nombre",
      key: "name",
      render: (text) => (
        <div
          onClick={() => {
            hide();
            console.log("Sirve", text);
            setDataQuotes(text);
            setOpenModalViewQuotes(true);
          }}
        >
          {text.name}
        </div>
      ),
    },
    {
      title: "Estado",
      key: "Estado_Txt",
      render: (text) => (
        <div
          onClick={() => {
            hide();
            console.log("Sirve", text);
            setDataQuotes(text);
            setOpenModalViewQuotes(true);
          }}
        >
          <Tag color={tagStatus3[text.Estado_Txt]?.color}>
            {text.Estado_Txt}
          </Tag>
        </div>
      ),
    },
  ];

  const columnsNotes = [
    {
      title: "Fecha",
      key: "Fecha_Etiqueta",
      render: (text) => moment(text.Fecha_Etiqueta).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Resultado",
      key: "Tabla_Resultados",
      render: (text) => {
        const arrayTexto = text.Tabla_Resultados?.split(",");
        const index = arrayTexto?.indexOf(resultadoName);
        return <div>{arrayTexto[index + 1]}</div>;
      },
    },
  ];

  const hide = () => {
    setOpenPopover(false);
  };

  const hideNotas = () => {
    setOpenNotas(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  // const optionsToExclude = [20664067, 34397281];
  // const filteredOptions = listCanal?.filter(
  //   (option) => !optionsToExclude.includes(option.value)
  // );

  useState(false);
  return (
    <div
      className={`gx-timeline-item ${styleName}`}
      style={
        styleName == "gx-timeline-inverted"
          ? {
              textAlign: "left",
            }
          : null
      }
    >
      <div className="gx-timeline-badge gx-timeline-img">
        <img
          src="/assets/images/pentagon.png"
          alt="Pentagon"
          title="Pentagon"
        />
      </div>

      <div
        className="gx-timeline-panel"
        style={{
          boxShadow:
            "0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* <div className="gx-timeline-panel"> */}
        <div className="gx-timeline-panel-header">
          <div className="gx-timeline-heading">
            <h4>
              <span style={{fontWeight: 'bold'}}>{Meses[timeLine[0]?.Mes]}, {timeLine[0]?.Year}</span>
              <Tooltip title="Agregar Pertinencia">
                <Button
                  onClick={() => {
                    setIsModalPertinencia(true);
                  }}
                  disabled={
                    timeLine[0]?.Mes < mesActual &&
                    timeLine[0]?.Year <= añoActual
                  }
                  style={{ marginLeft: "20px" }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Tooltip>
              <ModalPertinencia
                isModalPertinencia={isModalPertinencia}
                setIsModalPertinencia={setIsModalPertinencia}
                mes={timeLine[0]?.Mes}
                ano={timeLine[0]?.Year}
                detailPlan={detailPlan}
                getData={getData}
                idPrograma={idPrograma}
              />
            </h4>
          </div>
        </div>

        {timeLine?.map((item, index) => (
          <div
            key={index}
            className="gx-timeline-body"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <p
              style={{
                width: "100%",
                fontWeight: "bold",
                fontSize: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item.Examen_txt}
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Tooltip title="Ver Resultados">
                  <Button
                    onClick={async () => {
                      setOpenNotas(true);
                      const notesAdminTable = await getNotesAdminTable(item.Id);
                      setDataTableNotes(notesAdminTable);
                      setResultadoName(item.Name);
                    }}
                    disabled={
                      item.Notas_Administrativas_txt == 0 ? true : false
                    }
                    style={{
                      backgroundColor: "#00ABC8",
                      color: "#FFF",
                      marginRight: "0px",
                      marginBottom: "0px",
                    }}
                  >
                    <ExceptionOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="Editar">
                  <Button
                    onClick={async () => {
                      setDataModal(item);
                      setIsModalOpen(true);
                      const response = await getListCanalAtencionfilter(
                        item?.Canales_Iniciales
                      );
                      setListCanal(response);
                      const split = item?.Canal_Atencion_IdString.split(",");
                      const numeros = split.map((subcadena) =>
                        Number(subcadena)
                      );
                      setSelectedOption(numeros);
                      console.log(numeros);
                    }}
                    type="primary"
                    style={{ marginBottom: "0px" }}
                  >
                    <EditOutlined />
                  </Button>
                </Tooltip>
              </span>
            </p>
            <p style={{ width: "50%" }}>
              <span style={{ fontWeight: "bold" }}>Canal Atención: </span>
              {item.Canal_Atencion_txt}
            </p>
            <p style={{ width: "50%" }}>
              <span style={{ fontWeight: "bold" }}>Origen: </span>
              {item.Origen}
            </p>
            <p style={{ width: "50%" }}>
              <span style={{ fontWeight: "bold" }}>Duración: </span>
              {item.Duracion_Min}
            </p>
            <p style={{ width: "50%" }}>
              <span style={{ fontWeight: "bold" }}>Tercerizado: </span>
              <Checkbox checked={Number(item.Tercerizado)} disabled={true} />
            </p>
            <p style={{ width: "50%" }}>
              <span style={{ fontWeight: "bold" }}>Predecesor: </span>
              <Checkbox checked={Number(item.Prerrequisito)} disabled={true} />
            </p>
            <p style={{ width: "50%" }}>
              <span style={{ fontWeight: "bold" }}>Estado: </span>
              <Tag
                color={tagStatus2[item.Pendiente][item.Disentido]?.color}
                onClick={async () => {
                  handleOpenChange(true);
                  const flagsQuotes = await getFlagsQuotes(item.Id);
                  setDataTable(flagsQuotes);
                }}
              >
                {tagStatus2[item.Pendiente][item.Disentido]?.text}
              </Tag>
            </p>
            <Divider />
          </div>
        ))}

        <Modal
          title="Notas Administrativas"
          open={openNotas}
          onCancel={hideNotas}
          footer={[
            <Button key="button-cancel" onClick={hideNotas}>
              Cerrar
            </Button>,
          ]}
        >
          <Table dataSource={dataTableNotes} columns={columnsNotes} />
        </Modal>

        <Modal
          title="Citas Relacionadas"
          open={openPopover}
          onCancel={hide}
          footer={[
            <Button key="button-cancel" onClick={hide}>
              Cerrar
            </Button>,
          ]}
        >
          <Table dataSource={dataTable} columns={columns} />
        </Modal>

        <Modal
          title="Editar canal de atención"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="button-cancel" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button key="button-integrar" loading={loading} onClick={handleOk}>
              Confirmar
            </Button>,
          ]}
        >
          <div
            label="Canal de atención"
            name="canal"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Select
              mode="multiple"
              className="w-100"
              placeholder="Selecciona un canal de atención"
              onChange={handleSelectChange}
              //disabled={dataModal?.Canal_Atencion_txt == "Presencial"}
              options={listCanal}
              value={selectedOption}
            />
          </div>
        </Modal>

        <ViewQuotes
          open={openModalViewQuotes}
          setOpen={setOpenModalViewQuotes}
          dataRow={dataQuotes}
          idPaciente={idPaciente}
          setOpenPopover={setOpenPopover}
          viewButton={viewButton}
        />
        {contextHolder}
        {Cita != null ? (
          <Button>
            <EyeOutlined /> Cita
          </Button>
        ) : null}
      </div>
    </div>
  );
};
