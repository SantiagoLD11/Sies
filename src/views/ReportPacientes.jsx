import { Card, Table, Button } from "antd";
import { React, useEffect, useState } from "react";
import { CloudDownloadOutlined,ReloadOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  getReportPacientes
} from "../appRedux/services";
import moment from "moment";
require("moment-timezone");

const ReportPacientes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const resp = await getReportPacientes();
    setLoading(false);
    setData(resp);
  };

  useEffect(() => {
    onSubmit();
  }, []);

  const columns = [
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Documento
        </span>
      ),
      dataIndex: "numDoc",
      key: "numDoc",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Nombre
        </span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Celular
        </span>
      ),
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Edad
        </span>
      ),
      dataIndex: "edad",
      key: "edad",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Correo
        </span>
      ),
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Direccion
        </span>
      ),
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Ciudad
        </span>
      ),
      dataIndex: "ciudad",
      key: "ciudad",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Genero
        </span>
      ),
      dataIndex: "genero",
      key: "genero",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Programas
        </span>
      ),
      dataIndex: "programas",
      key: "programas",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Etiquetas Administrativas
        </span>
      ),
      dataIndex: "etAdmins",
      key: "etAdmins",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Etiquetas Asistenciales
        </span>
      ),
      dataIndex: "etAsist",
      key: "etAsist",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Fecha Nacimiento
        </span>
      ),
      dataIndex: "fnacimiento",
      key: "fnacimiento",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Persona Autorizada
        </span>
      ),
      dataIndex: "personAuto",
      key: "personAuto",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Ultima Actualizacion
        </span>
      ),
      dataIndex: "ultmUpdate",
      key: "ultmUpdate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Llamar Como
        </span>
      ),
      dataIndex: "llamarComo",
      key: "llamarComo",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Franjas Agendamiento
        </span>
      ),
      dataIndex: "frajas",
      key: "frajas",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Dispositivo Telemedicina
        </span>
      ),
      dataIndex: "dispoTele",
      key: "dispoTele",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Conexion Internet
        </span>
      ),
      dataIndex: "conexionInternet",
      key: "conexionInternet",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Canal Confirmacion
        </span>
      ),
      dataIndex: "canalConfirmacion",
      key: "canalConfirmacion",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Profesionales no Deseados
        </span>
      ),
      dataIndex: "profesionales",
      key: "profesionales",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Horario Contacto
        </span>
      ),
      dataIndex: "horarioSugerido",
      key: "horarioSugerido",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Nivel Afiliacion
        </span>
      ),
      dataIndex: "nAfiliacion",
      key: "nAfiliacion",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Tipo Afiliacion
        </span>
      ),
      dataIndex: "tAfiliacion",
      key: "tAfiliacion",
    },
    {
      title: (
        <span style={{ backgroundColor: "#184F9D", color: "#fff" }}>
          Regimen Afiliacion
        </span>
      ),
      dataIndex: "rAfiliacion",
      key: "rAfiliacion",
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

export default ReportPacientes;
