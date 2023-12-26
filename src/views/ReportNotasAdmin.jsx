import { Card, Table, Button } from "antd";
import { React, useEffect, useState } from "react";
import { CloudDownloadOutlined,ReloadOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  getReportNotasAdmin
} from "../appRedux/services";
import moment from "moment";
require("moment-timezone");

const ReportNotasAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const resp = await getReportNotasAdmin();
      console.log('Respuesta de getReportNotasAdmin:', resp); // Verifica la respuesta recibida
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
        const resp = await getReportNotasAdmin();
        console.log('Respuesta de getReportNotasAdmin:', resp); // Verifica la respuesta recibida
        setData(resp);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  const columns = [
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Documento Paciente
        </span>
      ),
      dataIndex: "numDoc",
      key: "numDoc",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Nro. Nota
        </span>
      ),
      dataIndex: "secuen",
      key: "secuen",
      render: (text) => <strong>{text}</strong>,
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
          Fecha Registro
        </span>
      ),
      dataIndex: "fechaHoraRegistro",
      key: "fechaHoraRegistro",
      render: (text) =><strong>{moment(text).format("DD/MM/YYYY")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Hora Registro
        </span>
      ),
      dataIndex: "fechaHoraRegistro",
      key: "fechaHoraRegistro",
      render: (text) =><strong>{moment(text).format("HH:mm a")}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Responsable
        </span>
      ),
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Etiqueta Administrativa
        </span>
      ),
      dataIndex: "etAdmin",
      key: "etAdmin",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Observacion Etiqueta Administrativa
        </span>
      ),
      dataIndex: "noteChange",
      key: "noteChange",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Etiqueta Seguimiento
        </span>
      ),
      dataIndex: "etSeguimiento",
      key: "etSeguimiento",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Observacion Seguimiento
        </span>
      ),
      dataIndex: "observacion_Seguimiento",
      key: "observacion_Seguimiento",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Motivo Inasistencia
        </span>
      ),
      dataIndex: "motInasis",
      key: "motInasis",
    }
  ];

  for (let index = 0; index < 7; index++) {
    columns.push(
      {
        title: (
          <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
            {`Mes/Año Plan Mensual #${index + 1}`}
          </span>
        ),
        dataIndex: `mesYear_${index + 1}`,
        key: `mesYear_${index + 1}`,
      },
      {
        title: (
          <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
            {`Servicio/Plan Mensual #${index + 1}`}
          </span>
        ),
        dataIndex: `servicio_${index + 1}`,
        key: `servicio_${index + 1}`,
        render: (text) => <strong>{text}</strong>,
      },
      {
        title: (
          <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
            {`Resultado de Contacto #${index + 1}`}
          </span>
        ),
        dataIndex: `resultado_${index + 1}`,
        key: `resultado_${index + 1}`,
        render: (text) => text, // Puedes aplicar el renderizado que necesites aquí
      }
    );
    
  }

  const downloadExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const date = new Date();

    const stringDate = date.getDay() +'/'+ (date.getMonth()+1) +"/"+ date.getFullYear();

    const excelFile = new Blob([excelBuffer], { type: fileType });
    saveAs(excelFile, `Informe Pacientes-${stringDate}` + fileExtension);
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

export default ReportNotasAdmin;
