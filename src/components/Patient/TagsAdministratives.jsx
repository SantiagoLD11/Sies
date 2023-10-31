import { React, useState, useEffect } from "react";
import "./stylesPatient.css";
import uno from "../../assets/images/IconosMedicos/obituario.png";
import dos from "../../assets/images/IconosMedicos/historial-medico.png";
import tres from "../../assets/images/IconosMedicos/lista.png";
import cuatro from "../../assets/images/IconosMedicos/rechazado.png";
import ocho from "../../assets/images/IconosMedicos/documento.png";
import { Row, Switch, Col } from "antd";
import { getTagsAdministratives } from "../../appRedux/services";

export const TagsAdministratives = ({ id, activeKey }) => {
  const [data, setData] = useState([]);

  const getData = async (id) => {
    const resp = await getTagsAdministratives(id);
    setData(resp);
    console.log("data preferencias", resp);
  };

  useEffect(() => {
    if (id && activeKey === "4") {
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
                Fallecido pendiente soporte:
              </div>
              <Switch
                disabled
                checked={data?.Fallecido_Pendiente_Soporte == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img src={dos} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Entregado asegurador:
              </div>
              <Switch
                disabled
                checked={data?.Entregado_asegurador == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img src={tres} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Activo:
              </div>
              <Switch disabled checked={data?.Activo == 1 ? true : false} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img
              src={cuatro}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Suspendido:
              </div>
              <Switch disabled checked={data?.Suspendido == 1 ? true : false} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img
              src={cuatro}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Terminación contrato:
              </div>
              <Switch
                disabled
                checked={data?.Terminacion_Contrato == 1 ? true : false}
              />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img
              src={cuatro}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                No ingreso:
              </div>
              <Switch disabled checked={data?.NI == 1 ? true : false} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img
              src={cuatro}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                Retirado:
              </div>
              <Switch disabled checked={data?.Retirado == 1 ? true : false} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img src={ocho} className="icons" alt="Descripción del icono"></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                No ingreso pendiente criterios:
              </div>
              <Switch disabled checked={data?.NIPCC == 1 ? true : false} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="d-flex align-items-center ">
            <img
              src={cuatro}
              className="icons"
              alt="Descripción del icono"
            ></img>
            <div>
              <div style={{ color: "#8c8c8c", fontWeight: "bold" }}>
                No ingreso - No cumple criterios:
              </div>
              <Switch disabled checked={data?.NICC == 1 ? true : false} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
