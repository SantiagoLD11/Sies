import { React, useState, useEffect } from "react";
import "./stylesPatient.css";
import uno from "../../assets/images/IconosMedicos/votacion.png";
import dos from "../../assets/images/IconosMedicos/historial-medico.png";
import tres from "../../assets/images/IconosMedicos/necesitar.png";
import cuatro from "../../assets/images/IconosMedicos/obituario.png";
import cinco from "../../assets/images/IconosMedicos/examen.png";
import seis from "../../assets/images/IconosMedicos/receta.png";
import siete from "../../assets/images/IconosMedicos/prueba-de-sangre.png";
import ocho from "../../assets/images/IconosMedicos/hospitalizacion.png";
import nueve from "../../assets/images/IconosMedicos/historial-medico.png";
import { Row, Switch, Col } from "antd";
import { getTagsCare } from "../../appRedux/services";

export const TagsCare = ({ id, activeKey }) => {
  const [data, setData] = useState([]);

  const getData = async (id) => {
    const resp = await getTagsCare(id);
    setData(resp);
    console.log("data preferencias", resp);
  };

  useEffect(() => {
    if (id && activeKey === "3") {
      getData(id);
    }
  }, [id, activeKey]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img src={uno} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Abandonado:
              </div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Abandonado == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img src={dos} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Menor expuesto:
              </div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Menor_Expuesto == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img src={tres} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>Naive:</div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Naive == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img
              src={cuatro}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Fallecido:
              </div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Fallecido == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img
              src={cinco}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Bimestralizado:
              </div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Bimestralizado == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img src={seis} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Paciente gestante:
              </div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Paciente_Gestante == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img
              src={siete}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>Novo:</div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Novo == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img src={ocho} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Hospitalizado:
              </div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Hospitalizado == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img
              src={nueve}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>TBC:</div>
              <Switch
                className="my-element"
                disabled
                checked={data?.TBC == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="d-flex align-items-center ">
            <img
              src={siete}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Alta del programa:
              </div>
              <Switch
                className="my-element"
                disabled
                checked={data?.Alta_del_Programa == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
