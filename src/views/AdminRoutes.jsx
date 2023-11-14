import React, { useEffect, useState } from "react";
import {
  Card,
  Select,
  Button,
  Tabs,
  Modal,
  Steps,
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
  getListSedesSies,
  getListCanalAtencion,
  getListEstadio,
  getListBomba,
  getListBimTrim,
  getListTipoIngreso,
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

var objForm = null;
var objForm2 = null;

const AdminRoutes = () => {
  const [form] = Form.useForm();
  const [inputDate, setInputDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [activeK, setActiveKey] = useState(0);
  const [current, setCurrent] = useState(0);
  const [listContrato, setListContrato] = useState(null);
  const [contrato, setContrato] = useState(false);
  const [_idProgram, setProgram] = useState(false);
  const [listSubprograma, setSubprograma] = useState(null);
  const [tipoIngresoDefault, setTipoIngresoDefault] = useState(null); 
  const [clBimTrimDefault, setClBimTrimDefault] = useState(null);
  const [clBombaDefault, setClBombaDefault] = useState(null);
  const [listEspecialidad, setListEspecialidad] = useState(null);
  const [listClaseExamen, setListClaseExamen] = useState(null);
  const [listCanalAtencion, setListCanalAtencion] = useState(null);
  const [listEstadio, setListEstadio] = useState(null);
  const [listEtiquetasAdim, setListEtiquetasAdim] = useState(null);
  const [listClasBimTrim, setlistClasBimTrim] = useState(null);
  const [listTipoIngreso, setlistTipoIngreso] = useState(null);
  const [listClasBomba, setlistClasBomba] = useState(null);
  const [listEtAsistencial, setListEtAsistencial] = useState(null);
  const [listSedes, setListSedes] = useState(null);
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
      label: `Historial Cambios Rutas`,
      children: <RouteChangeHistory activeKey={activeK} />,
    },
  ];

  const steps = [
    {
      title: "1",
      content: "1",
    },
    {
      title: "2",
      content: "2",
    }
  ];

  const itemsSteps = steps.map((item) => ({
    key: item.title,
    //title: item.title,
  }));

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
      const resListTpIngreso = await getListTipoIngreso();
      setlistTipoIngreso(resListTpIngreso);
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

  const next = async () => {
    const isValid = await validateForm();
    if (current < 1 && isValid)
    {
      console.log('valores form Paso 1', form.getFieldsValue());
      objForm = null;
      objForm = {...form.getFieldsValue()};
      console.log('obj form Paso 1', objForm);
      setCurrent(current + 1);
    }
    else if(current == 1 && isValid){
      console.log('valores form Paso 2', form.getFieldsValue());
      objForm2 = null;
      objForm2 = form.getFieldsValue();
      console.log('obj form Final', {...objForm,...objForm2});
      //setCurrent(current + 1);
      await onSubmit({...objForm,...objForm2});
      form.resetFields();
    }
  };
  const prev = () => {
    if (current > 0)
      setCurrent(current - 1);
    else if(current == 0)
      closeModalCreate();
  };


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
    setCurrent(current - 1);
    setActiveKey(0);
    setActiveKey(1);
  };

  const validateForm = async () => {
    try {
      // Use Ant Design Form's validateFields to validate the form fields
      await form.validateFields();
      return true; // Form is valid
    } catch (errorInfo) {
      // Handle validation errors and show error messages
  
      // Show error messages to the user (you can customize this part)
      console.log(`Form validation failed: ${errorInfo}`);
  
      return false; // Form is not valid
    }
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
        title="Creación Contrato Plan"
        width="800px"
        open={modalVisible}
        onCancel={closeModalCreate}
        footer={[
          <Button
            key="back"
            onClick={() => {
              prev();
            }}
          >
            Cerrar
          </Button>,
          <Button
            form="crear_plan_contrato"
            htmlType="button"
            loading={loading}
            key="submit-form-plan"
            type="primary"
            onClick={() => {
              next();
            }}
          >
            Continuar
          </Button>,
        ]}
      >
        <Form
          name="crear_plan_contrato"
          id="crear_plan_contrato"
          colon={false}
          form={form}
          autoComplete="off"
          layout="vertical"
          initialValues={{ checkboxField: false }}
          fields={[
            {
              name: ["cBomba"],
              value: clBombaDefault || Number(47939476),
            },
            {
              name: ["tIngreso"],
              value: tipoIngresoDefault || Number(47918782),
            },
            {
              name: ["cBimTrim"],
              value: clBimTrimDefault || Number(47939326),
            },
            {
              name: ["primeraVez"], 
              value: false,
            },
            {
              name: ["Prerrq"],
              value: false,
            }
          ]}
        >
          <Steps
            current={current}
            items={itemsSteps}
            style={{ marginBottom: "20px" }}
          />
          {current === 0 ? (

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
                        const resListBimTrim = await getListBimTrim();
                        setlistClasBimTrim(resListBimTrim);
                        const resListBomba = await getListBomba();
                        setlistClasBomba(resListBomba);
                        const resListSedes = await getListSedesSies(value);
                        setListSedes(resListSedes);
                        setContrato(true);
                        setTipoIngresoDefault(Number(47918782));
                        setClBimTrimDefault(Number(47939326));
                        setClBombaDefault(Number(47939476));
                        setProgram(parseInt(options?.idPrograma));
                        console.log("id Programa" + _idProgram);
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item label="Profesion" name="especialidad" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                  <Select
                    placeholder="Seleccione una Profesion"
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
                <Form.Item label="Etiquetas Asistenciales" name="etAsitenciales" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                  <Select
                    placeholder="Seleccione"
                    style={{ width: "100%" }}
                    options={listEtAsistencial}
                  />
                </Form.Item>
              </div>
            </div>
          ) : null}
          {current === 1 ? (
            <div className="row"
            >
              <div className="col-12 col-md-12">
                <h4 style={{ fontWeight: "bold", textAlign: "left" }}>
                  Clasificación pacientes
                </h4>
              </div>
              <div className="row"
              >
                <div className="col-12 col-md-6">
                  <div>
                    <Form.Item valuePropName="checked" name="primeraVez">
                      <Checkbox
                        style={{ display: "flex", flexDirection: "row-reverse", justifyContent: 'flex-end' }}
                      >
                        1era Vez:
                      </Checkbox>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item valuePropName="checked" name="Prerrq"> 
                      <Checkbox
                        style={{ display: "flex", flexDirection: "row-reverse", justifyContent: 'flex-end' }}
                      >
                        Predecesor:
                      </Checkbox>
                    </Form.Item>
                  </div>

                </div>
                <div className="col-12 col-md-6">
                  <Form.Item label="Mayor de (Años):" name="mayor" rules={[{ required: true, message: 'Campo obligatorio' }]}>
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
                  <Form.Item label="Menor de (Años):" name="menor" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                    <Input type="number" />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <Form.Item label="Clasificacion Bim/Trim" name="cBimTrim" rules={[{ required: _idProgram == 18147640, message: 'Campo obligatorio' }]}>
                    <Select
                      placeholder="Seleccione"
                      style={{ width: "100%" }}
                      options={listClasBimTrim}
                      disabled={ _idProgram !== 18147640}
                    />
                  </Form.Item>
                </div>
                <div className="col-12 col-md-6">
                  <Form.Item label="Tipo Ingreso" name="tIngreso" rules={[{ required: _idProgram == 18147640, message: 'Campo obligatorio' }]}>
                    <Select
                      placeholder="Seleccione"
                      style={{ width: "100%" }}
                      options={listTipoIngreso}
                      disabled = {_idProgram !== 18147640}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <Form.Item label="Clasificacion Bomba" name="cBomba" rules={[{ required: _idProgram == 27357773, message: 'Campo obligatorio' }]}>
                    <Select
                      placeholder="Seleccione"
                      style={{ width: "100%" }}
                      options={listClasBomba}
                      disabled={ _idProgram !== 27357773}
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
              <div className="row">
                <div className="col-12 col-md-6">
                  <Form.Item label="Sedes(Opcional)" name="sedesSies" >
                    <Select
                      placeholder="Seleccione"
                      mode="multiple"
                      style={{ width: "100%" }}
                      options={listSedes}
                      disabled={listSedes?.length === 0 || !contrato}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          ) : null}
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