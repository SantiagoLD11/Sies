import {
  Table,
  Modal,
  Select,
  message,
  Button,
  Tag,
  Tooltip,
  Form,
  Collapse,
} from "antd";
import React, { useState } from "react";
import {
  DeleteFilled,
  CloseCircleFilled,
  ExclamationCircleOutlined,
  DownSquareOutlined,
} from "@ant-design/icons";
import {
  getListMotivos,
  createAndDeleteBloqueoMotivo,
} from "../../appRedux/services";
import moment from "moment";
import { tagStatus } from "../../constants/Tags";
import { BloqueoEliminarDesbloquear } from "../../constants/BloqueoEliminarDesbloquear";
import { FilterDisposition } from "./FilterDisposition";
const { Panel } = Collapse;

const status = [
  { value: 1, label: "Disponible" },
  { value: 2, label: "Bloqueado" },
  { value: 3, label: "Asignado Cita" },
  { value: 4, label: "Eliminado" },
];

const ListDisposition = ({
  id,
  activeKey,
  dataImported,
  setDataImported,
  changeStatus,
  setChangeStatus,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [motivo, setMotivo] = useState();
  const [motivoSelect, setMotivoSelect] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [json, setJson] = useState();
  const [bloqueoEliminar, setBloqueoEliminar] = useState("bloqueo");

  const handleMotivo = (value) => {
    setMotivoSelect(value);
    const date_end = new Date(dataUser?.fecha_hora);
    const minutesToAdd = dataUser?.duracion;
    date_end.setMinutes(date_end.getMinutes() + minutesToAdd);
    setJson({
      Fecha_Hora: new Date(dataUser?.fecha_hora).getTime(),
      Fecha_Hora_Final: new Date(date_end).getTime(),
      Hora: moment(new Date(dataUser?.fecha_hora)).format("LT"),
      Duracion: moment(new Date(date_end)).format("LT"),
      Id: value,
      BloqueoEliminar: BloqueoEliminarDesbloquear[bloqueoEliminar].tipoAgenda,
      IdProfesional: id,
    });
    console.log("datauser a enviar", json);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await createAndDeleteBloqueoMotivo(json);
      await messageApi.open({
        type: "success",
        content: BloqueoEliminarDesbloquear[bloqueoEliminar].mensaje,
      });
    } catch (error) {
      await messageApi.open({
        type: "error",
        content: error.response?.data?.message,
      });
    }
    setLoading(false);
    setIsModalOpen(false);
    setMotivoSelect(null);
    setChangeStatus(!changeStatus);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setMotivoSelect(null);
  };

  const columns = [
    {
      title: "Fecha y Hora",
      dataIndex: "fecha_hora",
      key: "fecha_hora",
      width: "12%",
      render: (text) => moment(text).format("DD/MM/YYYY : HH:mm"),
    },
    {
      title: "Examen",
      dataIndex: "idExam",
      key: "idExam",
      width: "25%",
      render: (text) => {
        const Exam = text.split(",");
        return (
          <span>
            {(
              <ul>
                {Exam?.map((value) => (
                  <li key={value}>{value || "Sin información"}</li>
                ))}
              </ul>
            ) || "-"}
          </span>
        );
      },
    },
    {
      title: "Canal de atención",
      dataIndex: "canal_atencion",
      key: "canal_atencion",
      width: "13%",
    },
    {
      title: "Duración",
      dataIndex: "duracion",
      key: "duracion",
      width: "7%",
    },
    {
      title: "Ciudad",
      dataIndex: "ciudad",
      key: "ciudad",
      width: "13%",
    },
    {
      title: "Acciones",
      key: "action",
      align: "center",
      children: [
        {
          title: "",
          key: "bloquear",
          align: "center",
          width: "5%",
          fixed: "right",
          render: (data) => {
            return (
              <Tooltip
                trigger="click"
                placement="top"
                color="#ffff"
                title={
                  <>
                    <Tooltip title={"Bloquear"}>
                      <Button
                        onClick={async () => {
                          console.log("Sirve", data);
                          setBloqueoEliminar("bloqueo");
                          setIsModalOpen(true);
                          setDataUser(data);
                          const response = await getListMotivos();
                          setMotivo(response);
                        }}
                      >
                        <CloseCircleFilled />
                      </Button>
                    </Tooltip>
                    <Tooltip title={"Eliminar"}>
                      <Button
                        onClick={async () => {
                          console.log("Sirve eliminar", data);
                          setBloqueoEliminar("eliminar");
                          setIsModalOpen(true);
                          setDataUser(data);
                          const response = await getListMotivos();
                          setMotivo(response);
                        }}
                      >
                        <DeleteFilled />
                      </Button>
                    </Tooltip>
                    <Tooltip title={"Desbloquear"}>
                      <Button
                        disabled={data.color == 4 ? true : false}
                        onClick={async () => {
                          console.log("Sirve desbloquear", data);
                          setBloqueoEliminar("desbloqueo");
                          setIsModalOpen(true);
                          setDataUser(data);
                          const response = await getListMotivos();
                          setMotivo(response);
                        }}
                      >
                        <ExclamationCircleOutlined />
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
        {
          title: "Estado",
          dataIndex: "color",
          key: "color",
          fixed: "right",
          width: "10%",
          render: (text) => (
            <Tag
              style={{ width: "100%" }}
              color={tagStatus[text]?.color}
              icon={tagStatus[text]?.icon}
            >
              {tagStatus[text]?.text}
            </Tag>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <FilterDisposition
        id={id}
        setData={setData}
        setLoading={setLoading}
        dataImported={dataImported}
        setDataImported={setDataImported}
        changeStatus={changeStatus}
        activeKey={activeKey}
      />
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1300 }}
      />
      {contextHolder}
      <Modal
        title={BloqueoEliminarDesbloquear[bloqueoEliminar]?.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        data={dataUser}
        footer={[
          <Button key="button-cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="button-integrar" loading={loading} onClick={handleOk}>
            Confirmar
          </Button>,
        ]}
      >
        <div
          label="Motivo"
          name="motivo"
          rules={[{ required: true, message: "Campo obligatorio" }]}
        >
          <Select
            id="selectmotivos"
            className="w-100"
            placeholder="Selecciona un motivo"
            onChange={handleMotivo}
            options={motivo}
            value={motivoSelect}
          />
        </div>
      </Modal>
    </>
  );
};

export default ListDisposition;
