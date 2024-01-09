import { Card, Table, Button } from "antd";
import { React, useEffect, useState } from "react";
import { CloudDownloadOutlined, ReloadOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  getReportAprovAgenda
} from "../appRedux/services";
import moment from "moment";
require("moment-timezone");

const ReportAprovAgenda = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const resp = await getReportAprovAgenda();
      console.log('Respuesta de getReport:', resp); // Verifica la respuesta recibida
      setData(resp);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await getReportAprovAgenda();
        console.log('Respuesta de getReport:', resp); // Verifica la respuesta recibida
        setData(resp);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderState = (state) => {
    let renderedText = "";
    switch (state) {
      case 1:
        renderedText = "Disponible";
        break;
      case 2:
        renderedText = "Bloqueado";
        break;
      case 3:
        renderedText = "Asignado Cita";
        break;
      default:
        renderedText = "Desconocido";
        break;
    }
    return renderedText;
  };

  const renderTextOrEmpty = (text) => {
    if (text === null || text === undefined || text === '') {
      return <strong>Sin Cita</strong>;
    }
    return <strong>{text}</strong>;
  };

  const calculateDaysDifference = (createdAt, fechaDisponibilidad) => {
    const createdDate = moment(createdAt);
    const availabilityDate = moment(fechaDisponibilidad);
    const differenceInDays = availabilityDate.diff(createdDate, "days");
    return differenceInDays;
  };


  const columns = [
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Documento Profesional
        </span>
      ),
      dataIndex: "numDocProf",
      key: "numDocProf",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Nombre Profesional
        </span>
      ),
      dataIndex: "nameProf",
      key: "nameProf",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Tipo Examen
        </span>
      ),
      dataIndex: "nameExam",
      key: "nameExam",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Sede
        </span>
      ),
      dataIndex: "sedeSies",
      key: "sedeSies",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha Creacion
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <strong>{moment(text).format("DD/MM/YYYY")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Hora Creacion
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <strong>{moment(text).format("HH:mm a")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha Disponibilidad
        </span>
      ),
      dataIndex: "fechaHora",
      key: "fechaHora",
      render: (text) => <strong>{moment(text).format("DD/MM/YYYY")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Hora Disponibilidad
        </span>
      ),
      dataIndex: "fechaHora",
      key: "fechaHora",
      render: (text) => <strong>{moment(text).format("HH:mm a")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Creado Por
        </span>
      ),
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Estado
        </span>
      ),
      dataIndex: "state",
      key: "state",
      render: (text) => <strong>{renderState(text)
      }</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Duración
        </span>
      ),
      dataIndex: "duration",
      key: "duration",
      render: (text) => text + ' Min',
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Motivo de Bloqueo
        </span>
      ),
      dataIndex: "motBloc",
      key: "motBloc",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Documento Paciente
        </span>
      ),
      dataIndex: "numDocPac",
      key: "numDocPac",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Nombre Paciente
        </span>
      ),
      dataIndex: "namePac",
      key: "namePac",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Estado Cita
        </span>
      ),
      dataIndex: "stateCita",
      key: "stateCita",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha Cancelación
        </span>
      ),
      dataIndex: "dateCancel",
      key: "dateCancel",
      render: (text) => {
        if (text && moment(text).isValid()) {
          return <strong>{moment(text).format("DD/MM/YYYY HH:mm a")}</strong>;
        } else {
          return <strong>No Aplica</strong>;
        }
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Motivo Cancelación
        </span>
      ),
      dataIndex: "motCancel",
      key: "motCancel",
      render: (text) => {
        if (text ) {
          return <strong>{text}</strong>;
        } else {
          return <strong>No Aplica</strong>;
        }
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Franja
        </span>
      ),
      dataIndex: "franja",
      key: "franja",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Oportunidad Habilitación
        </span>
      ),
      dataIndex: "createdAt",
      key: "differenceInDays",
      render: (text, record) => {
        const difference = calculateDaysDifference(record.createdAt, record.fechaHora);
        return <strong>{difference}</strong>;
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Especialidad
        </span>
      ),
      dataIndex: "especialidad",
      key: "especialidad",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Programa
        </span>
      ),
      dataIndex: "programa",
      key: "programa",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Oportunidad Cancelacion
        </span>
      ),
      dataIndex: "dateCancel",
      key: "differenceInDays",
      render: (text, record) => {
        const difference = calculateDaysDifference(record.dateCancel, record.fechaHora);
        return <strong>{difference||"No Aplica"}</strong>;
      },
    }
  ];

  const downloadExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const date = new Date();

    const stringDate = date.getDay() + '/' + (date.getMonth() + 1) + "/" + date.getFullYear();

    const excelFile = new Blob([excelBuffer], { type: fileType });
    saveAs(excelFile, `Aprovechamiento Agenda-${stringDate}` + fileExtension);
  };

  return (
    <>
      <div
        className="gx-profile-banner"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "32px 32px 70px",
        }}
      >
        <div className="gx-profile-container">
          <div
            className="gx-profile-banner-top"
            style={{ justifyContent: "space-between", marginBottom: "10px" }}
          >
            <Button onClick={downloadExcel}
              style={{ backgroundColor: "#484d55", color: "#FFF" }}>
              <CloudDownloadOutlined />
              Descargar Excel
            </Button>

            <Button onClick={onSubmit}>
              <ReloadOutlined />
              Actualizar
            </Button>
          </div>

        </div>
      </div>

      <Card style={{ zIndex: 2 }}>
        <Table
          columns={columns}
          loading={loading}
          dataSource={data}
          scroll={{ x: 1300 }}
        />
      </Card>
    </>
  );
};

export default ReportAprovAgenda;
