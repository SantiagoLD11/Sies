import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Button } from "antd";
import PatientPreferences from "./PatientPreferences";
import { AffiliationData } from "./AffiliationData";
import { EditarPaciente } from "../../views/EditarPaciente";
import AsegudImg from "../../assets/images/IconosMedicos/asegurado.png";
import moment from "moment";
import "./stylesPatient.css";
import {
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  CalendarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { get_info_general_patient } from "../../appRedux/services";

const PatientInformation = ({ idPaciente, type, id, activeKey }) => {
  const [infoGeneral, setInfoGeneral] = useState(null);
  const [openModalPatient, setOpenModalPatient] = useState(false);

  const [isActualizar, setIsActualizar] = useState(false);

  const getInfo = async (id) => {
    const resp = await get_info_general_patient(id, type);
    console.log("Trae info actualizada: ", resp);
    setInfoGeneral(resp);
  };

  useEffect(async () => {
    console.log("Entro a actualizar");
    if (id && activeKey === "1") {
      getInfo(id);
    }
  }, [id, isActualizar, activeKey]);

    useEffect(async () => {
      console.log("Entro a actualizar por editar");
      if (isActualizar) {
        getInfo(id);
        setIsActualizar(false);
      }
    }, [isActualizar]);

  return (
    <>
      <div style={{ float: "right" }}>
        <Button type="primary" onClick={() => setOpenModalPatient(true)}>
          Editar
        </Button>
     </div>
      <EditarPaciente
        setIsActualizar={setIsActualizar}
        open={openModalPatient}
        setOpen={setOpenModalPatient}
        idPaciente={idPaciente}
      />
      <Row gutter={[16, 16]}>
      <Divider plain style={{ fontWeight: "bold" }}>
        Informacion Basica
      </Divider>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <PhoneOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Celular:
              </div>
              {infoGeneral?.celular || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <MailOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>Email:</div>
              {infoGeneral?.email || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <IdcardOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>Edad:</div>
              {infoGeneral?.edad || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <EnvironmentOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Dirección:
              </div>
              {infoGeneral?.direccion || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <EnvironmentOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Ciudad:
              </div>
              {infoGeneral?.ciudad || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <UserOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Genero:
              </div>
              {infoGeneral?.genero || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <CalendarOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Fecha Nacimiento:
              </div>
              {moment(infoGeneral?.fechaNacimiento, "ddd MMM DD YYYY").format(
                "YYYY-MM-DD HH:mm"
              ) || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
          <img src={AsegudImg} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Asegurador:
              </div>
              {infoGeneral?.asegurador || "Sin información"}
            </div>
          </div>
        </Col>
      </Row>
      <Divider plain style={{ fontWeight: "bold" }}>
        Preferencias Paciente
      </Divider>
      <PatientPreferences id={infoGeneral?.id} activeKey={activeKey} />
      <Divider plain style={{ fontWeight: "bold" }}>
        Datos de Afiliación
      </Divider>
      <AffiliationData id={infoGeneral?.id} activeKey={activeKey} />
    </>
  );
};

export default PatientInformation;
