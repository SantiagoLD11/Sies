import { Card, Tabs, notification, Switch, Divider, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// import bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import PatientInformation from "../components/Patient/PatientInformation";
import {
  get_info_general_patient,
  actualizarRegistroNovedadInformado,
  getAtributesGenerateNote,
} from "../appRedux/services";
import { FiltersNotes } from "../components/Patient/FiltersNotes";
import { CareRoutes } from "../components/Patient/CareRoutes";
import { Quotes } from "../components/Patient/Quotes";
import { CalendarQuotes } from "../components/Patient/CalendarQuotes";
import { RemissionQuotes } from "../components/Patient/RemissionQuotes";

import { icons } from "../constants/icons";

const DetailPatient = () => {
  const { id } = useParams();
  const [notificationApi, contextHolder] = notification.useNotification();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("1");
  const [infoGeneral, setInfoGeneral] = useState(null);
  const [activeTab, setActiveTab] = useState("paciente");
  const [type, setType] = useState(undefined);
  const [atribEtiquetas, setAtribEtiquetas] = useState(null);

  const getInfo = async (id) => {
    const response = await getAtributesGenerateNote(id);
    setAtribEtiquetas(response);
  };

  useEffect(async () => {
    setType(location?.state?.type === "numero_document" ? true : false);
    localStorage.setItem("idPaciente", id);
    const resp = await get_info_general_patient(
      id,
      location?.state?.type === "numero_document" ? true : false
    );
    setInfoGeneral(resp);
    getInfo(id);
    if (location.state) {
      const { detail } = location.state;
      console.log(detail);
      if (detail.length > 0) {
        for (const val of detail) {
          notificationApi.open({
            type: "info",
            description: ` ${val?.cambio}`,
          });
          await actualizarRegistroNovedadInformado(val?.id);
        }
      }
    }
  }, [id]);
  const onChange = (key) => {
    console.log("Key: "+key);
    setActiveKey(key);
  };

  const items = {
    paciente: [
      {
        key: "1",
        label: `Informacion Paciente`,
        children: (
          <PatientInformation
            type={type}
            id={infoGeneral?.id}
            activeKey={activeKey}
            idPaciente={id}
          />
        ),
      },
    ],
    citas: [
      {
        key: "1",
        label: `Modo Lista`,
        children: <Quotes id={id} activeKey={activeKey} />,
      },
      {
        key: "2",
        label: `Modo Calendario`,
        children: <CalendarQuotes id={id} activeKey={activeKey} />,
      },
      {
        key: "3",
        label: `Citas Remisiones`,
        children: <RemissionQuotes id={id} activeKey={activeKey} />,
      },
    ],
  };
  const itemsDisposition = {
    notas: <FiltersNotes id={infoGeneral?.id} activeKey={activeKey} />,
    rutas: (
      <CareRoutes
        id={infoGeneral?.id}
        activeKey={activeKey}
        getInfo={getInfo}
      />
    ),
    citas: <Quotes id={infoGeneral?.id} activeKey={activeKey} />,
  };

  return (
    <>
      {contextHolder}
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
            style={{ justifyContent: "space-between", marginBottom: "62px" }}
          >
            <div className="gx-profile-banner-top-left">
              <div className="gx-profile-banner-avatar-info">
                <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">
                  {infoGeneral?.nombre} {infoGeneral?.apellido}
                </h2>
                <p className="gx-mb-0 gx-fs-lg">
                  {infoGeneral?.tipo_documento} {infoGeneral?.numero_documento}
                </p>
              </div>
            </div>
          </div>
          <div className="gx-profile-banner-bottom">
            <div className="gx-tab-list">
              <ul className="gx-navbar-nav">
                <li onClick={() => setActiveTab("paciente")}>
                  <span className="gx-link">Detalle del paciente</span>
                </li>
                <li onClick={() => setActiveTab("notas")}>
                  <span className="gx-link">Notas Administrativas</span>
                </li>
                <li onClick={() => setActiveTab("rutas")}>
                  <span className="gx-link">Rutas de Atención</span>
                </li>
                <li onClick={() => setActiveTab("citas")}>
                  <span className="gx-link">Citas</span>
                </li>
              </ul>
            </div>
            <span className="gx-link gx-profile-setting">
              {/* <i onClick={editPacient} className="icon icon-edit gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle" />
              <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                Editar
              </span> */}
            </span>
            {/* <EditarPaciente
              open={openModalPatient}
              setOpen={setOpenModalPatient}
              idPaciente={paciente}
            /> */}
          </div>
        </div>
        <div
          // bodyStyle={{ display: "flex" }}
          style={{ marginBottom: "0px", width: "440px" }}
        >

        </div>
      </div>
      <Card style={{ zIndex: 2 }}>
        {/* {activeTab === "professional" ? (
          <FiltersNotes id={infoGeneral?.id} activeKey={activeKey} />
        ) : null} */}
        {activeTab === "notas" ? itemsDisposition[activeTab] : null}
        {activeTab === "rutas" ? itemsDisposition[activeTab] : null}
        {/* {activeTab === "citas" ? itemsDisposition[activeTab] : null} */}
        <Tabs
          defaultActiveKey="1"
          // items={activeTab === "paciente" ? items : null}
          items={items[activeTab]}
          onChange={onChange}
        />
      </Card>
    </>
  );
};

export default DetailPatient;
