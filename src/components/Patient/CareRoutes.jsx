import { React, useState, useEffect } from "react";
import {
  Table,
  Button,
  Tooltip,
  Checkbox,
  Modal,
  Tag,
  notification,
} from "antd";
import "./stylesPatient.css";
import { EyeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  getCareRoutes,
  getViewDetailPlans,
  getInfPlans,
  TriggerBeforeViewRoutes,
  TriggerLaboratoriesViewRoutes,
  AlertTomoLaboratorios,
} from "../../appRedux/services";
import moment from "moment";
import { ViewDetailPlans } from "./ViewDetailPlans";
import { tagStatus4 } from "../../constants/Tags";
import Swal from "sweetalert2";

export const CareRoutes = ({ id, getInfo }) => {
  const [data, setData] = useState([]);
  const [detailPlan, setDetailPlan] = useState(null);
  const [openModalViewPlans, setOpenModalViewPlans] = useState(false);
  const [viewButton, setviewButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailPlans, setDetailPlans] = useState({
    creado: "",
    fecha_inscripcion: "",
    fecha_activacion: "",
    fecha_renovacion: "",
    Sub_Programa_txt: "",
    renovacion: false,
    programa: "",
    contrato_sede: "",
    ciudad: "",
    estadio: "",
    contrato_plan: "",
    primera_vez: false,
  });
  const [listInfoPlans, setListInfoPlans] = useState(null);
  const [notificationApi, contextHolderNoti] = notification.useNotification();

  const getData = async () => {
    setLoading(true);
    showLoadingModal();
    const resp = await getCareRoutes(id);
    setData(resp);
    console.log("data rutas atencion", resp);
    setLoading(false);
    hideLoadingModal();
  };

  const showLoadingModal = () => {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera un momento..',
      icon:'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusConfirm: false,
      showConfirmButton: false, // Ocultar el botón de confirmación
      showCloseButton:false,
      didOpen: () => {
        Swal.showLoading(); // Mostrar el ícono de carga
      }
    });
  };

  const hideLoadingModal = () => {
    Swal.close(); // Cierra el modal de carga de SweetAlert2
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);

  const getDataPlains = async () => {
    setLoading(true);
    showLoadingModal();
    const detailsPlans = await getViewDetailPlans(detailPlan);
    setDetailPlans(detailsPlans);
    const infPlans = await getInfPlans(detailPlan);
    setListInfoPlans(infPlans);
    console.log("Array de arrays pro: ", infPlans);
    setLoading(false);
    hideLoadingModal();
  };

  useEffect(() => {
    if (openModalViewPlans && detailPlan) {
      console.log(detailPlan);
      getDataPlains();
    }
  }, [openModalViewPlans, detailPlan]);

  const close = () => {
    setOpenModalViewPlans(false);
    setviewButton(false);
  };

  const columns = [
    {
      title: "Plan",
      dataIndex: "contrato_sede",
      key: "contrato_sede",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Ciudad",
      dataIndex: "ciudad",
      key: "ciudad",
      render: (text) => <>{text}</>,
    },
    {
      title: "Estadio",
      dataIndex: "estadio",
      key: "estadio",
      render: (text) => <>{text}</>,
    },
    {
      title: "Fecha activación",
      dataIndex: "fecha_activacion",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Renovación",
      dataIndex: "renovacion",
      key: "Observacion_Seguimiento",
      render: (val) => <Checkbox disabled checked={val} />,
    },
    {
      title: "1ra vez",
      dataIndex: "primera_vez",
      key: "Observacion_Seguimiento",
      render: (val) => <Checkbox disabled checked={val} />,
    },
    {
      title: "Programa",
      dataIndex: "programa",
      key: "programa",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Sub programa",
      dataIndex: "Sub_Programa_txt",
      key: "Sub_Programa_txt",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => (
        <Tag style={{ width: "100%" }} color={tagStatus4[text]?.color}>
          {tagStatus4[text]?.text}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "action",
      align: "center",
      render: (data) => {
        return (
          <Tooltip title={"Ver"}>
            <Button
              onClick={async () => {
                setLoading(true);
                showLoadingModal();
                if(data.estado !== "Creado"){
                  console.log("Sirve ver", data);
                  await TriggerBeforeViewRoutes(data.id);
                  await TriggerLaboratoriesViewRoutes(data.id);
                  const resp = await AlertTomoLaboratorios(data.id);
                  if (resp) {
                    console.log(resp);
                    if (resp.Tomo_Laboratorios == 1) {
                      notificationApi.open({
                        type: "info",
                        message: "Alerta",
                        description: `El paciente tomo los laboratorios. ${resp.Resultado_Laboratorio}`,
                      });
                    } else if (resp.Tomo_Laboratorios == 0) {
                      notificationApi.open({
                        type: "info",
                        message: "Alerta",
                        description: `El paciente no ha tomado los laboratorios!.`,
                        icon: <InfoCircleOutlined style={{ color: "#e0db03" }} />,
                      });
                    }
                  }
                }
                setviewButton(true);
                setDetailPlan(data.id);
                setOpenModalViewPlans(true);
                setLoading(false);
                hideLoadingModal();
              }}
            >
              <EyeOutlined />
            </Button>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <>
      {contextHolderNoti}
      <Modal
        width={"1200px"}
        title="Ruta Atención"
        open={openModalViewPlans}
        onCancel={close}
      >
        <ViewDetailPlans
          detailPlan={detailPlan}
          idPaciente={id}
          listInfoPlans={listInfoPlans}
          setListInfoPlans={setListInfoPlans}
          detailPlans={detailPlans}
          getData={getDataPlains}
          getInfo={getInfo}
          getDataPlains={getDataPlains}
          setDataList={setData}
          viewButton={viewButton}
        />
      </Modal>
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1300 }}
      />
    </>
  );
};
