import { Card, Table, Button } from "antd";
import { React, useEffect, useState } from "react";
import { CloudDownloadOutlined,ReloadOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  getReportProvInstall,
  TriggerReportProvInstall
} from "../appRedux/services";
import moment from "moment";
require("moment-timezone");

const ReportProvInstall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    await TriggerReportProvInstall();
    const resp = await getReportProvInstall();
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
          Sede
        </span>
      ),
      dataIndex: "sede",
      key: "sede",
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
          Sub Programa
        </span>
      ),
      dataIndex: "subPrograma",
      key: "subPrograma",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Especialidad
        </span>
      ),
      dataIndex: "especialidad",
      key: "especialidad",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Canal de Atencion
        </span>
      ),
      dataIndex: "cnlAtencion",
      key: "cnlAtencion",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Mes Calendario
        </span>
      ),
      dataIndex: "mesCal",
      key: "mesCal",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Cupos Requeridos Netos
        </span>
      ),
      dataIndex: "cupsReqNetos",
      key: "cupsReqNetos",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Cupos Requeridos Pendientes
        </span>
      ),
      dataIndex: "cupsReqPend",
      key: "cupsReqPend",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Cupos Habilitados Netos
        </span>
      ),
      dataIndex: "cupsHabNetos",
      key: "cupsHabNetos",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Cupos Habilitados Pendientes
        </span>
      ),
      dataIndex: "cupsHabPendientes",
      key: "cupsHabPendientes",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Proyeccion Neta
        </span>
      ),
      dataIndex: "proyecNeta",
      key: "proyecNeta",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Proyeccion Pendiente
        </span>
      ),
      dataIndex: "proyectPendiente",
      key: "proyectPendiente",
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
    saveAs(excelFile, `Proyeccion Instalada-${stringDate}` + fileExtension);
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

export default ReportProvInstall;
