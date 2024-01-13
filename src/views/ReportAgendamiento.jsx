import { Card, Table, Button } from "antd";
import { React, useEffect, useState } from "react";
import { CloudDownloadOutlined, ReloadOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  getReportAgendamiento
} from "../appRedux/services";
import moment from "moment";
require("moment-timezone");

const ReportAgendamiento = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const resp = await getReportAgendamiento();
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
        const resp = await getReportAgendamiento();
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

  const calculateDaysDifference = (createdAt, fechaDisponibilidad) => {
    const createdDate = moment(createdAt);
    const availabilityDate = moment(fechaDisponibilidad);
    const differenceInDays = availabilityDate.diff(createdDate, "days");
    return differenceInDays;
  };

  const renderTextOrEmpty = (text) => {
    if (text === null || text === undefined || text === '') {
      return <>Sin información</>;
    }
    return <strong>{text}</strong>;
  };


  const columns = [
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
          Nombre Profesional
        </span>
      ),
      dataIndex: "nameProf",
      key: "nameProf",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Documento Profesional
        </span>
      ),
      dataIndex: "numDocProf",
      key: "numDocProf",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha Cita
        </span>
      ),
      dataIndex: "dateCita",
      key: "dateCita",
      render: (text) => <strong>{moment(text).format("DD/MM/YYYY")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Hora Cita
        </span>
      ),
      dataIndex: "dateCita",
      key: "dateCita",
      render: (text) => <strong>{moment(text).format("HH:mm a")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Examen
        </span>
      ),
      dataIndex: "nameExam",
      key: "nameExam",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Estado
        </span>
      ),
      dataIndex: "state",
      key: "state",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Creado Por
        </span>
      ),
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>  
         Fecha/Hora Creacion
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        if (text && moment(text).isValid()) {
          return <strong>{moment(text).format("DD/MM/YYYY HH:mm a")}</strong>;
        } else {
          return <strong>Sin Informacion</strong>;
        }
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Cancelado Por
        </span>
      ),
      dataIndex: "cancelBy",
      key: "cancelBy",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha/Hora Cancelacion
        </span>
      ),
      dataIndex: "dateCancel",
      key: "dateCancel",
      render: (text) => {
        if (text && moment(text).isValid()) {
          return <strong>{moment(text).format("DD/MM/YYYY HH:mm a")}</strong>;
        } else {
          return <strong>Sin Informacion</strong>;
        }
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Motivo Cancelacion
        </span>
      ),
      dataIndex: "motCancel",
      key: "motCancel",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Entidad
        </span>
      ),
      dataIndex: "asegurador",
      key: "asegurador",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Contrato
        </span>
      ),
      dataIndex: "codeContrac",
      key: "codeContrac",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Mes
        </span>
      ),
      dataIndex: "dateCita",
      key: "dateCita",
      render: (text) => {
        if (text && moment(text).isValid()) {
          return <strong>{moment(text).format("MMMM")}</strong>;
        } else {
          return <strong>Sin Informacion</strong>;
        }
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Franja Horaria
        </span>
      ),
      dataIndex: "franja",
      key: "franja",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Dia
        </span>
      ),
      dataIndex: "dateCita",
      key: "dateCita",
      render: (text) => {
        if (text && moment(text).isValid()) {
          return <strong>{moment(text).format("DD")}</strong>;
        } else {
          return <strong>Sin Informacion</strong>;
        }
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Sede
        </span>
      ),
      dataIndex: "sede",
      key: "sede",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Especialidad
        </span>
      ),
      dataIndex: "profesion",
      key: "profesion",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Canal
        </span>
      ),
      dataIndex: "cnlAtencion",
      key: "cnlAtencion",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Programa
        </span>
      ),
      dataIndex: "programa",
      key: "programa",
      render: (text) => renderTextOrEmpty(text),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Asiste Cita
        </span>
      ),
      dataIndex: "state",
      key: "state",
      render: (text, record) => {
        if (text === 'Asistida') {
          return <strong>Si</strong>;
        } else {
          // Aquí puedes manejar otros estados si es necesario
          return <strong>No</strong>;
        }
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha Ultima Cita
        </span>
      ),
      dataIndex: "ultFechaPac",
      key: "ultFechaPac",
      render: (text) => {
        if (text && moment(text).isValid()) {
          return <strong>{moment(text).format("DD/MM/YYYY HH:mm a")}</strong>;
        } else {
          return <strong>Sin Atencion</strong>;
        }
      },
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Ultima Atencion Especialidad
        </span>
      ),
      dataIndex: "ultFechaPacEspc",
      key: "ultFechaPacEspc",
      render: (text) => {
        if (text && moment(text).isValid()) {
          return <strong>{moment(text).format("DD/MM/YYYY HH:mm a")}</strong>;
        } else {
          return <strong>Sin Atencion</strong>;
        }
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
    saveAs(excelFile, `Reporte Agendamiento-${stringDate}` + fileExtension);
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

export default ReportAgendamiento;
