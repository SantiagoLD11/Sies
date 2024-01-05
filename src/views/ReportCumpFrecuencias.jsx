import { Card, Table, Button } from "antd";
import { React, useEffect, useState } from "react";
import { CloudDownloadOutlined,ReloadOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  getReportCumpFrecuencs,
  TriggerReportCumpFrecuencs
} from "../appRedux/services";
import moment from "moment";
require("moment-timezone");

const ReportCumpFrecuencias = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    await TriggerReportCumpFrecuencs();
    const resp = await getReportCumpFrecuencs();
    setData(resp);
    setLoading(false);
  };

  useEffect(() => {
    onSubmit();
  }, []);

  const columns = [
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Numero Documento
        </span>
      ),
      dataIndex: "numDoc",
      key: "numDoc",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Contrato Plan
        </span>
      ),
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Programa
        </span>
      ),
      dataIndex: "program",
      key: "program",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Nombre Paciente
        </span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha Ingreso
        </span>
      ),
      dataIndex: "dateIngreso",
      key: "dateIngreso",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Asegurador
        </span>
      ),
      dataIndex: "asegurador",
      key: "asegurador",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Sede
        </span>
      ),
      dataIndex: "sede",
      key: "sede",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Etiqueta Administrativa
        </span>
      ),
      dataIndex: "etiqAdmin",
      key: "etiqAdmin",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Etiqueta Asistencial
        </span>
      ),
      dataIndex: "etiqAsis",
      key: "etiqAsis",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Tratamiento
        </span>
      ),
      dataIndex: "tratamiento",
      key: "tratamiento",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Linea de Pago
        </span>
      ),
      dataIndex: "lineaPago",
      key: "lineaPago",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Requerimiento Especialidad
        </span>
      ),
      dataIndex: "reqeEspecialidad",
      key: "reqeEspecialidad",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Ejecutado Especialidad
        </span>
      ),
      dataIndex: "ejecEspecialidad",
      key: "ejecEspecialidad",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Agendamiento Especialidad
        </span>
      ),
      dataIndex: "agenEspecialidad",
      key: "agenEspecialidad",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Total Especialidad
        </span>
      ),
      dataIndex: "totEspecialidad",
      key: "totEspecialidad",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Cumpliento Especialidad
        </span>
      ),
      dataIndex: "cumpEspecialidad",
      key: "cumpEspecialidad",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Cantidad Seguimientos Admin
        </span>
      ),
      dataIndex: "cantSeguimientos",
      key: "cantSeguimientos",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Cumplimiento Contrato
        </span>
      ),
      dataIndex: "cumpContrato",
      key: "cumpContrato",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Porcentaje Cumplimiento
        </span>
      ),
      dataIndex: "porcCumplimiento",
      key: "porcCumplimiento",
    }
  ];

  const downloadExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const date = new Date();

    const stringDate = date.getDay() +'/'+ (date.getMonth()+1) +"/"+ date.getFullYear();

    const excelFile = new Blob([excelBuffer], { type: fileType });
    saveAs(excelFile, `Informe Cumplimiento Frecuencias-${stringDate}` + fileExtension);
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

export default ReportCumpFrecuencias;
