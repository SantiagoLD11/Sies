import { React, useState, useEffect } from "react";
import "./stylesPatient.css";
import uno from "../../assets/images/IconosMedicos/nivel.png";
import dos from "../../assets/images/IconosMedicos/comportamiento-del-cliente.png";
import tres from "../../assets/images/IconosMedicos/estatus-social.png";
import { Row, Col } from "antd";
import { getAffiliationData } from "../../appRedux/services";

export const AffiliationData = ({ id, activeKey }) => {
  const [data, setData] = useState([]);

  const getData = async (id) => {
    const resp = await getAffiliationData(id);
    setData(resp);
    console.log("data preferencias", resp);
  };

  useEffect(() => {
    if (id && activeKey === "1") {
      getData(id);
    }
  }, [id, activeKey]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img src={uno} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Nivel afiliación:
              </div>
              {data?.NivelAfiliacion || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img src={dos} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Tipo afiliación:
              </div>
              {data?.TipoAfiliacion || "Sin información"}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img src={tres} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Regimen afiliación:
              </div>
              {data?.RegimenAfiliacion || "Sin información"}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
