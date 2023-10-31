import { React, useEffect, useState } from "react";
import {
  UserOutlined,
  UploadOutlined,
  RedoOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  LaptopOutlined,
  UserDeleteOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Col, Row, Button } from "antd";
import { getPatientPreferences } from "../../appRedux/services";
import "./stylesPatient.css";
import { EditPatientPreferences } from "./EditPatientPreferences";

const PatientPreferences = ({ id, activeKey }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paciente, setPaciente] = useState(null);
  const [openModalPreferences, setOpenModalPreferences] = useState(false);
  const [franjas, setFranjas] = useState(null);
  const [professio, setProfessio] = useState(null);

  const getData = async (id) => {
    setLoading(true);
    const resp = await getPatientPreferences(id);
    setData(resp);
    setFranjas(resp.FranjasHorarias?.split(","));
    setProfessio(resp.ProfesionalesNoDeseados?.split(","));
    console.log("data preferencias", resp);
    setLoading(false);
  };

  const editPreferences = () => {
    setPaciente(id);
    setOpenModalPreferences(true);
  };

  useEffect(() => {
    if (id && activeKey === "1") {
      getData(id);
    }
  }, [id, activeKey]);

  return (
    <>
      <div style={{ float: "right" }}>
        <Button type="primary" onClick={editPreferences}>
          Editar
        </Button>
      </div>
      <EditPatientPreferences
        open={openModalPreferences}
        setOpen={setOpenModalPreferences}
        idPaciente={paciente}
        getData={getData}
      />
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <UserOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Persona Autorizada Contacto:
              </div>
              {data?.PersonaAutorizadaContacto || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <RedoOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Ultima Actualización:
              </div>
              {moment(data?.UltimaActualizacion, "ddd MMM DD YYYY").format(
                "YYYY-MM-DD HH:mm"
              ) || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <MessageOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Llamar Como:
              </div>
              {data?.LlamarComo || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <ClockCircleOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Horarios Agendamiento:
              </div>
              <ul>
                {franjas?.map((value) => (
                  <li key={value}>{value || "Sin información"}</li>
                ))}
              </ul>
              {/* {data?.FranjasHorarias || "Sin información"} */}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <LaptopOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Dispositivo para telemedicina:
              </div>
              {data?.DispositivoTelemedicina || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <WifiOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Conexión a internet:
              </div>
              {data?.ConexionInternet || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <UploadOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Canal Envio confirmación:
              </div>
              {data?.CanalEnviConfirmacion || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <UserDeleteOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Profesionales no Deseados:
              </div>
              <ul>
                {professio?.map((value) => (
                  <li key={value}>{value || "Sin información"}</li>
                ))}
              </ul>
              {/* {data?.ProfesionalesNoDeseados || "Sin información"} */}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <ClockCircleOutlined style={{ fontSize: "40px", margin: "10px" }} />
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Horario Contacto:
              </div>
              {data?.HorarioSugeridoContacto || "Sin información"}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PatientPreferences;
