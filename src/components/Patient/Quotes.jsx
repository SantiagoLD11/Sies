import { React, useState, useEffect } from "react";
import { Table, Button, Tooltip, Tag, message } from "antd";
import "./stylesPatient.css";
import {
  DownSquareOutlined,
  EyeOutlined,
  DeleteOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  getQuotes,
  getViewDetailPlans,
  getInfPlans,
  deleteQuotes,
  schedule,
} from "../../appRedux/services";
import moment from "moment";
import { ViewQuotes } from "./ViewQuotes";
import { tagStatus3 } from "../../constants/Tags";

export const Quotes = ({ id, activeKey }) => {
  const [data, setData] = useState([]);
  const [dataQuotes, setDataQuotes] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [openModalViewQuotes, setOpenModalViewQuotes] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const resp = await getQuotes(id);
    setData(resp);
    console.log("data rutas atencion", resp);
  };

  useEffect(() => {
    if (id && activeKey === "1") {
      getData();
    }
  }, [id, activeKey]);

  const deleteQuote = async (id) => {
    const resp = await deleteQuotes(id);
    console.log("eliminado: ", resp);
    if (resp?.status === "fail") {
      await messageApi.open({
        type: "error",
        content: resp?.message || "error",
      });
    } else if (resp?.status === "ok") {
      await messageApi.open({
        type: "success",
        content: "Eliminada correctamente",
      });
    }
    getData();
  };

  const close = () => {
    setOpenModalViewQuotes(false);
  };

  const columns = [
    {
      title: "Cita",
      dataIndex: "name",
      key: "name",
      render: (text) => <>{text}</>,
    },
    {
      title: "Fecha Cita",
      dataIndex: "Fecha_Cita",
      key: "Fecha_Cita",
      render: (text) => moment(text).format("DD/MM/YYYY HH:MM"),
    },
    {
      title: "Duración",
      dataIndex: "duracion",
      key: "duracion",
    },
    {
      title: "Profesional",
      dataIndex: "Profesional_txt",
      key: "Profesional_txt",
      render: (text) => <>{text}</>,
    },
    // {
    //   title: "Estado",
    //   dataIndex: "Estado_Txt",
    //   render: (text) => <>{text}</>,
    // },
    {
      title: "Sede",
      dataIndex: "Sedetxt",
      key: "Sedetxt",
      render: (val) => <>{val}</>,
    },
    // {
    //   title: "Ciudad",
    //   dataIndex: "Ciudad_Txt",
    //   key: "Ciudad_Txt",
    //   render: (val) => <>{val}</>,
    // },
    {
      title: "Canal Atención",
      dataIndex: "Canal_Atencion_txt",
      key: "Canal_Atencion_txt",
    },
    {
      title: "Plan Mensual",
      dataIndex: "Plan_Mensual_txt",
      key: "Plan_Mensual_txt",
    },
    {
      title: "Codigo Tipo",
      dataIndex: "Codigo_Tipo",
      key: "Codigo_Tipo",
    },
    {
      title: "Examen",
      dataIndex: "nameExam",
      key: "nameExam",
    },
    {
      title: "Estado",
      dataIndex: "Estado_Txt",
      //key: "color",
      //fixed: "right",
      //width: "10%",
      render: (text) => (
        <Tag
          style={{ width: "100%" }}
          color={tagStatus3[text]?.color}
          //icon={tagStatus3[text]?.icon}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "action",
      align: "center",
      render: (data) => {
        return (
          <Tooltip
            trigger="click"
            placement="top"
            color="#ffff"
            title={
              <>
                <Tooltip title={"Ver"}>
                  <Button
                    onClick={async () => {
                      console.log("Sirve ver", data);
                      setDataQuotes(data);
                      setOpenModalViewQuotes(true);
                    }}
                  >
                    <EyeOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title={"Agendar"}>
                  <Button
                    disabled={
                      data.Estado_Txt == "Cancelado" ||
                      data.Estado_Txt == "Asistida" ||
                      data.Estado_Txt == "Finalizada" ||
                      data.Estado_Txt == "Solicitada" ||
                      data.Estado_Txt == "No Asistida"
                    }
                    onClick={async () => {
                      console.log("Sirve Agendar", data);
                      const resp = await schedule(data.id);
                      if (resp?.status === "fail") {
                        await messageApi.open({
                          type: "error",
                          content: resp?.message || "error",
                        });
                      } else if (resp?.status === "ok") {
                        await messageApi.open({
                          type: "success",
                          content: "Agendada exitosamente",
                        });
                      }
                    }}
                  >
                    <BellOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title={"Eliminar"}>
                  <Button
                    disabled={
                      data.Estado_Txt == "Cancelado" ||
                      data.Estado_Txt == "Asistida" ||
                      data.Estado_Txt == "Finalizada" ||
                      data.Estado_Txt == "Solicitada" ||
                      data.Estado_Txt == "No Asistida"
                    }
                    onClick={async () => {
                      console.log("Sirve eliminar", data);
                      deleteQuote(data.id);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </>
            }
          >
            <Button>
              <DownSquareOutlined />
            </Button>
          </Tooltip>
        );
      },
    },
  ];
  return (
    <>
      {contextHolder}
      <ViewQuotes
        open={openModalViewQuotes}
        setOpen={setOpenModalViewQuotes}
        dataRow={dataQuotes}
        idPaciente={id}
      />
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1300 }}
      />
    </>
  );
};
