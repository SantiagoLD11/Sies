import { Row } from "antd";
import React, { useEffect, useState } from "react";

const GeneralInformation = ({
  infoGeneral,
  examsProfessional,
  sedeProfessional,
}) => {
  const [part1, setpart1] = useState(null);
  const [part2, setpart2] = useState(null);

  useEffect(() => {
    let mitad = Math?.floor(examsProfessional?.length / 2);
    setpart1(examsProfessional?.slice(0, mitad));
    setpart2(examsProfessional?.slice(mitad));
  }, [examsProfessional]);

  return (
    <>
      <Row>
        <div className="d-flex align-items-center">
          <img
            src="/sies/assets/images/IconosMedicos/Examenes.png"
            style={{ height: "50px" }}
            alt="Descripción del icono"
          ></img>
          <div>
            <div style={{ color: "#8c8c8c" ,fontWeight: "bold" }}>Exámenes Habilitados:</div>

            <ul>
              {examsProfessional?.map((value) => (
                <li key={value.Tipo_Examen_Txt}>
                  {value.Tipo_Examen_Txt || "Sin información"}
                </li>
              ))}
            </ul>
            {/* <ul>
              {part2?.map((value) => (
                <li key={value.Tipo_Examen_Txt}>
                  {value.Tipo_Examen_Txt || "Sin información"}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <div
          className="d-flex"
          style={{ marginLeft: "20px" }}
        >
          <img
            src="/sies/assets/images/IconosMedicos/Sedes.png"
            style={{ height: "50px" }}
            alt="Descripción del icono"
          ></img>
          <div>
            <div style={{ color: "#8c8c8c" ,fontWeight: "bold"}}>Sedes Habilitadas:</div>
            <ul>
              {sedeProfessional?.map((value) => (
                <li key={value.label}>{value.label || "Sin información"}</li>
              ))}
            </ul>
          </div>
        </div>
      </Row>
    </>
  );
};

export default GeneralInformation;
