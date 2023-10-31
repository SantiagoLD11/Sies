import React, { useEffect, useState } from "react";
import {
  Card,
  Select,
  Button,
  Tabs,
  Modal,
  Form,
  Row,
  Input,
  Col,
  Checkbox,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ContractsPlans } from "../components/AdminRoutesAttention/ContractsPlans";
import { RouteChangeHistory } from "../components/AdminRoutesAttention/RouteChangeHistory";
import {
  getListContrato,
  getListEspecialidad,
  getListClaseExamen,
  getListCanalAtencion,
  getListEstadio,
  createPlanContract,
  triggerUpdateDates,
  getListSubProgramas,
  getListEtiquetasAdmin,
  getlistSexoNacer,
  getListEtAsistencial,
} from "../appRedux/services";
import { SelectMeses } from "../constants/Months";
import "../styles/global/customGlobal.css";
import { GeneratingChanges } from "../components/Underwriters/GeneratingChanges";

const AdminRoutes = () => {
  const [form] = Form.useForm();
  const [inputDate, setInputDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [activeK, setActiveKey] = useState(0);
  const [listContrato, setListContrato] = useState(null);
  const [contrato, setContrato] = useState(false);
  const [listSubprograma, setSubprograma] = useState(null);
  const [listEspecialidad, setListEspecialidad] = useState(null);
  const [listClaseExamen, setListClaseExamen] = useState(null);
  const [listCanalAtencion, setListCanalAtencion] = useState(null);
  const [listEstadio, setListEstadio] = useState(null);
  const [listEtiquetasAdim, setListEtiquetasAdim] = useState(null);
  const [listEtAsistencial, setListEtAsistencial] = useState(null);
  const [listSexo, setListSexo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [
    isOpenModalGenerateChangesRoutes,
    setIsOpenModalGenerateChangesRoutes,
  ] = useState(false);
  const items = [
    {
      key: 1,
      label: `Contratos Planes`,
      children: <ContractsPlans activeKey={activeK} />,
    },
    {
      key: 2,
      label: `Historial Cambios Ruta`,
      children: <RouteChangeHistory activeKey={activeK} />,
    },
  ];

  useEffect(() => {
    setActiveKey(1);
    console.log(`Funciona: ${activeK}`);
  }, []);

  useEffect(async () => {
    if (modalVisible) {
      const resp = await getListContrato();
      setListContrato(resp);
      const respu = await getListEspecialidad();
      setListEspecialidad(respu);
      const respues = await getListCanalAtencion();
      setListCanalAtencion(respues);
      const respuest = await getListEstadio();
      setListEstadio(respuest);
      const resListAsistencial = await getListEtAsistencial();
      setListEtAsistencial(resListAsistencial);
      const resListSexo = await getlistSexoNacer();
      setListSexo(resListSexo);
    }
  }, [modalVisible]);

  const onChange = (key) => {
    setActiveKey(key);
  };

  const onChangeEspecialidad = async (value) => {
    const respue = await getListClaseExamen(value);
    setListClaseExamen(respue);
  };

  const openModalCreate = () => {
    setModalVisible(true);
  };

  const closeModalCreate = () => {
    setModalVisible(false);
  };

  console.log('valores form', form.getFieldsValue());

  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    const resp = await createPlanContract(values);
    if (resp?.status === "fail") {
      console.log("Actualizar: ", resp);
      await messageApi.open({
        type: "error",
        content: resp?.message || "error",
      });
    }
    if (resp?.status === "ok") {
      await messageApi.open({
        type: "success",
        content: "Se ha creado correctamente",
      });
    }
    setLoading(false);
    closeModalCreate();
    form.resetFields();
  };

  return (
    <>
      {contextHolder}

      <Button
        onClick={async () => {
          setLoading(true);
          const resp = await triggerUpdateDates();
          console.log(resp);
          if (resp?.status === "fail") {
            await messageApi.open({
              type: "error",
              content: resp?.message || "error",
            });
          } else if (resp?.status === "ok") {
            await messageApi.open({
              type: "success",
              content: "Se ha actualizado correctamente los datos paramétricos",
            });
          }
          setLoading(false);
        }}
        loading={loading}
      >
        <PlusOutlined />
        Actualizar Datos
      </Button>

      <Button
        onClick={() => {
          setIsOpenModalGenerateChangesRoutes(true);
        }}
      >
        <PlusOutlined />
        Generar Cambio Rutas
      </Button>
      <GeneratingChanges
        modalVisible={isOpenModalGenerateChangesRoutes}
        SetModalVisible={setIsOpenModalGenerateChangesRoutes}
      />
      <Button
        style={{ backgroundColor: "#184F9D", color: "#FFF" }}
        onClick={openModalCreate}
      >
        <PlusOutlined />
        Crear Contrato Plan
      </Button>
      <Modal
        title="Creación contrato plan"
        width="800px"
        open={modalVisible}
        onCancel={closeModalCreate}
        footer={[
          <Button onClick={closeModalCreate} key="back">
            Cerrar
          </Button>,
          <Button
            form="crear_plan_contrato"
            htmlType="submit"
            loading={loading}
            key="submit-form-plan"
            type="primary"
          >
            Guardar
          </Button>,
        ]}
      >
        <Form
          name="crear_plan_contrato"
          id="crear_plan_contrato"
          colon={false}
          onFinish={onSubmit}
          form={form}
          autoComplete="off"
          layout="vertical"
          initialValues={{ checkboxField: false }}
        >
          <div className="row"
          >
            <div className="col-12 col-md-6">
              <Form.Item label="Contrato" name="contrato" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Select
                  placeholder="Seleccione un contrato"
                  style={{ width: "100%" }}
                  options={listContrato}
                  onChange={async (value, options) => {
                    if (options?.idPrograma) {
                      const subProgramas = await getListSubProgramas(options?.idPrograma);
                      setSubprograma(subProgramas);
                      const etiquetasAdmin = await getListEtiquetasAdmin(options?.idPrograma);
                      setListEtiquetasAdim(etiquetasAdmin);
                      setContrato(true);
                    }
                  }}
                />
              </Form.Item>

              <Form.Item label="Especialidad" name="especialidad" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Select
                  placeholder="Seleccione una especialidad"
                  style={{ width: "100%" }}
                  options={listEspecialidad}
                  onChange={(value) => onChangeEspecialidad(value)}
                />
              </Form.Item>

              <Form.Item label="Clase examen" name="claseExamen" rules={[{ required: form.getFieldValue('especialidad') && listClaseExamen?.length !== 0, message: 'Campo obligatorio' }]}>
                <Select
                  placeholder="Seleccione una clase de examen"
                  style={{ width: "100%" }}
                  options={listClaseExamen}
                  disabled={listClaseExamen?.length === 0 || !form.getFieldValue('especialidad')}
                />
              </Form.Item>

              <Form.Item label="Estadio" name="estadio" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Select
                  placeholder="Seleccione un estadio"
                  style={{ width: "100%" }}
                  options={listEstadio}
                />
              </Form.Item>

              <Form.Item label="Canal atención" name="canalAtencion" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Select
                  mode="multiple"
                  placeholder="Seleccione un canal"
                  style={{ width: "100%" }}
                  options={listCanalAtencion}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Meses" name="meses" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Input
                  placeholder="Digite los meses separados por comas"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    form.setFieldsValue({
                      meses: inputDate,
                    });
                    const value = e.target.value;
                    const regex = /^[0-9,]*$/;
                    if (regex.test(value)) {
                      form.setFieldsValue({
                        meses: value,
                      });
                      setInputDate(value);
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="Duración (1era vez)" name="firstDuracion" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Input
                  placeholder="Digite la duración en minutos"
                  style={{ width: "100%" }}
                  type="Number"
                />
              </Form.Item>
              <Form.Item label="Duración (Seguimiento)" name="duracionSeg" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Input
                  placeholder="Digite la duración en minutos"
                  style={{ width: "100%" }}
                  type="Number"
                />
              </Form.Item>
              <Form.Item label="SubPrograma" name="subPrograma" rules={[{ required: form.getFieldValue('contrato') && listSubprograma?.length !== 0, message: 'Campo obligatorio' }]}>
                <Select
                  placeholder="Seleccione un subprograma"
                  style={{ width: "100%" }}
                  options={listSubprograma}
                  disabled={listSubprograma?.length === 0 || !contrato}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-12 col-md-12">
            <h4 style={{ fontWeight: "bold", textAlign: "left" }}>
              Clasificación pacientes
            </h4>
          </div>
          <div className="row"
          >
            <div className="col-12 col-md-6">
              <Form.Item valuePropName="checked" name="primeraVez">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse", justifyContent: 'flex-end' }}
                >
                  1era Vez:
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item valuePropName="checked" name="bomba">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse", justifyContent: 'flex-end' }}
                >
                  Bomba:
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Etiquetas Asistenciales" name="etAsitenciales" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Select
                  placeholder="Seleccione"
                  style={{ width: "100%" }}
                  options={listEtAsistencial}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Mayor de (Años):" name="mayor" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Menor de (Años):" name="menor" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Input type="number" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <Form.Item label="Etiquetas Administrativas" name="etAdmin" rules={[{ required: form.getFieldValue('contrato') && listEtiquetasAdim?.length !== 0, message: 'Campo obligatorio' }]}>
                <Select
                  mode="multiple"
                  placeholder="Seleccione"
                  style={{ width: "100%" }}
                  options={listEtiquetasAdim}
                  disabled={listEtiquetasAdim?.length === 0 || !contrato}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Sexo al nacer" name="sexoNacer" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                <Select
                  placeholder="Seleccione"
                  style={{ width: "100%" }}
                  options={listSexo}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      <Card>
        <Tabs
          defaultActiveKey={1}
          activeKey={activeK}
          items={items}
          onChange={onChange}
        />
      </Card>
    </>
  );
};

export default AdminRoutes;
