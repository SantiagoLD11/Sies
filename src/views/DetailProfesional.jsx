import { Avatar, Card, Tabs, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
// import bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import GeneralInformation from "../components/Professional/GeneralInformation";
import {
  get_info_general_professional,
  getSedesProfessional,
  getExamsProfessional,
} from "../appRedux/services";
import ListNews from "../components/Professional/ListNews";
import ModalDisposition from "../components/Professional/ModalDisposition";
import ListDisposition from "../components/Professional/ListDisposition";
import CalendarDisposition from "../components/Professional/CalendarDisposition";
import BlockDisposition from "./blockDisposition";
import { QuotesProfessional } from "../components/Professional/QuotesProfessional";

const DetailProfesional = () => {
  const { id } = useParams();
  const [notificationApi, contextHolder] = notification.useNotification();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("1");
  const [infoGeneral, setInfoGeneral] = useState(null);
  const [activeTab, setActiveTab] = useState("professional");
  const history = useHistory();
  const [dataImported, setDataImported] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [sedeProfessional, setSedeProfessional] = useState(null);
  const [examsProfessional, setExamsProfessional] = useState(null);

  console.log("localizacion", location?.state);
  const getInfo = async (id) => {
    const response = await getSedesProfessional(id);
    setSedeProfessional(response);
    const respon = await getExamsProfessional(id);
    setExamsProfessional(respon);
    const resp = await get_info_general_professional(
      id,
      location?.state?.type === "numero_document" ? true : false
    );
    setInfoGeneral(resp);
  };

  useEffect(() => {
    getInfo(id);
    if (location.state) {
      const { detail } = location.state;
      console.log(detail);
      if (detail) {
        if (detail.length > 0) {
          for (const val of detail) {
            notificationApi.open({
              type: "info",
              description: ` ${val?.WS_Response}`,
            });
            //await actualizarRegistroNovedadInformado(val?.id);
          }
        }
      }
    }
  }, [id]);
  const onChange = (key) => {
    console.log(key);
    setActiveKey(key);
  };

  const items = {
    professional: [
      {
        key: "1",
        label: `Información Básica`,
        children: (
          <GeneralInformation
            infoGeneral={infoGeneral}
            sedeProfessional={sedeProfessional}
            examsProfessional={examsProfessional}
          />
        ),
      },
    ],
    disposition: [
      {
        key: "1",
        label: `Lista de disponibilidades`,
        children: (
          <ListDisposition
            id={infoGeneral?.id}
            activeKey={activeKey}
            dataImported={dataImported}
            setDataImported={setDataImported}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
          />
        ),
      },
      {
        key: "2",
        label: `Calendario de disponibilidades`,
        children: (
          <CalendarDisposition
            id={infoGeneral?.id}
            activeKey={activeKey}
            dataImported={dataImported}
            setDataImported={setDataImported}
            changeStatus={changeStatus}
            setChangeStatus={setChangeStatus}
          />
        ),
      },
      {
        key: "3",
        label: `Novedades`,
        children: <ListNews id={infoGeneral?.id} activeKey={activeKey} />,
      },
    ],
  };
  const itemsDisposition = {
    quote: <QuotesProfessional id={infoGeneral?.id} activeKey={activeKey} />,
  };
  return (
    <>
      {contextHolder}
      <div
        className="gx-profile-banner"
        style={{
          display: "flex",
          padding: "32px 32px 70px",
        }}
      >
        <div className="gx-profile-container">
          <div
            className="gx-profile-banner-top"
            style={{ justifyContent: "space-between", marginBottom: "30px" }}
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
                <li onClick={() => setActiveTab("professional")}>
                  <span className="gx-link">Detalle del profesional</span>
                </li>
                <li onClick={() => setActiveTab("disposition")}>
                  <span className="gx-link">Disponibilidades</span>
                </li>
                <li onClick={() => setActiveTab("quote")}>
                  <span className="gx-link">Citas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          //bodyStyle={{ display: "flex" }}
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex - start",
          }}
        >
          {/* <div className="d-flex align-items-center">
            <i style={{ fontSize: "50px" }} className="icon icon-phone" />
            <div>
              <div style={{ color: "#8c8c8c", fontSize: "bold" }}>Celular:</div>
              {infoGeneral?.celular || "Sin información"}
            </div>
          </div> */}
          <div className="d-flex align-items-center mt-3">
            <i style={{ fontSize: "50px" }} className="icon icon-graduation" />{" "}
            <div>
              <div style={{ color: "#8c8c8c", fontSize: "bold" }}>
                Profesión:
              </div>
              {infoGeneral?.profesion || "Sin información"}
            </div>
          </div>
        </div>
        <div
          className="gx-profile-banner-bottom"
          style={{ width: "10%", alignItems: "flex-end" }}
        >
          <span
            className="gx-link gx-profile-setting"
            onClick={() => {
              if (location?.state?.type === "numero_document") {
                history.push(`/edit-professional/${infoGeneral?.id}`);
              } else {
                history.push(`/edit-professional/${id}`);
              }
            }}
          >
            <i className="icon icon-edit gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle" />
            <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
              Editar
            </span>
          </span>
        </div>
      </div>
      <Card
        style={{ zIndex: 1 }}
        extra={
          activeTab === "disposition" ? (
            <>
              <ModalDisposition
                id={infoGeneral?.id}
                rango={infoGeneral?.rango_propio}
                setDataImported={setDataImported}
                numeroDocumento={infoGeneral?.numero_documento}
              />
              <BlockDisposition id={id} setDataImported={setDataImported} />
            </>
          ) : (
            ""
          )
        }
      >
        {activeTab === "quote" ? itemsDisposition[activeTab] : null}
        <Tabs
          defaultActiveKey="1"
          items={items[activeTab]}
          onChange={onChange}
        />
      </Card>
    </>
  );
};

export default DetailProfesional;
