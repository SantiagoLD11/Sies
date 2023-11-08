import { React, useEffect, useState } from "react";
import {
  Select,
  Button,
  Modal,
  Form,
  Row,
  Input,
  Col,
  Checkbox,
  message,
  DatePicker,
} from "antd";
import {
  getListContrato,
  getListEspecialidad,
  getListClaseExamen,
  getListCanalAtencion,
  getListEstadio,
  getListTypeAction,
  handleGenerateChanges,
  getListAsegurador,
  getListPrograms,
  getListSede,
} from "../../appRedux/services";
import { SelectMeses } from "../../constants/Months";
import { itemsGeneratingChanges } from "../../constants/ItemsGeneratingChanges";

export const GeneratingChanges = ({ modalVisible, SetModalVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [listContrato, setListContrato] = useState(null);
  const [listEspecialidad, setListEspecialidad] = useState(null);
  const [listClaseExamen, setListClaseExamen] = useState(null);
  const [listCanalAtencion, setListCanalAtencion] = useState(null);
  const [listEstadio, setListEstadio] = useState(null);
  const [lisTipoAccion, setLisTipoAccion] = useState(null);
  const [type, setType] = useState(null);
  const [listAsegurador, setListAsegurador] = useState(null);
  const [listProgramas, setListProgramas] = useState(null);
  const [listSedes, setListSedes] = useState(null);

  console.log('Estadio', itemsGeneratingChanges[type]?.estadio);

  

  useEffect(async () => {
    if (modalVisible) {
      const respuesta = await getListTypeAction();
      setLisTipoAccion(respuesta);
    }
  }, [modalVisible]);

  const close = () => {
    SetModalVisible(false);
  };

  const onChangeTypeAction = async (value) => {
    console.log('tipo de form', value);
    setType(value);
    let one;
    let two;
    let three;
    let four;
    let five;
    let six

    switch (value) {
      case 41561613:
        six = await getListAsegurador();
        setListAsegurador(six);
        four = await getListEstadio();
        setListEstadio(four);
        five = await getListSede();
        setListSedes(five);
        two = await getListEspecialidad();
        setListEspecialidad(two);
        three = await getListCanalAtencion();
        setListCanalAtencion(three);
        break;
      case 41381695:
        six = await getListAsegurador();
        setListAsegurador(six);
        four = await getListEstadio();
        setListEstadio(four);
        five = await getListSede();
        setListSedes(five);
        two = await getListEspecialidad();
        setListEspecialidad(two);
        break;
    }
  };

  const onChangeEspecialidad = async (value) => {
    const respue = await getListClaseExamen(value);
    setListClaseExamen(respue);
  };

  const onChangeAsegurador = async (value) => {
    const respue = await getListPrograms(value);
    setListProgramas(respue);
  };

  const onSubmit = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    console.log(values);
    const resp = await handleGenerateChanges(values);
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
    close();
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Generación Cambios en Rutas de Atención"
        width="800px"
        open={modalVisible}
        onCancel={close}
        footer={[
          <Button onClick={close} key="back">
            Cerrar
          </Button>,
          <Button
            loading={loading}
            onClick={onSubmit}
            key="submit"
            type="primary"
          >
            Guardar
          </Button>,
        ]}
      >
        <Form
          colon={false}
          onFinish={onSubmit}
          form={form}
          autoComplete="off"
          layout="vertical"
          initialValues={{ checkboxField: false }}
        >
          <Row
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Col style={{ width: "40%" }}>
              <Form.Item label="Tipo Acción" name="tipoAccion">
                <Select
                  placeholder="Seleccione un tipo acción"
                  style={{ width: "100%" }}
                  options={lisTipoAccion}
                  onChange={onChangeTypeAction}
                />
              </Form.Item>
              
              {itemsGeneratingChanges[type].contrato ? (
                <Form.Item label="Contrato Plan" name="contrato">
                  <Select
                    placeholder="Seleccione un contrato"
                    style={{ width: "100%" }}
                    options={listContrato}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].especialidad ? (
                <Form.Item label="Especialidad" name="especialidad">
                  <Select
                    placeholder="Seleccione una especialidad"
                    style={{ width: "100%" }}
                    options={listEspecialidad}
                    onChange={(value) => onChangeEspecialidad(value)}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].claseExamen1 ? (
                <Form.Item label="Clase examen" name="claseExamen">
                  <Select
                    placeholder="Seleccione una clase de examen"
                    style={{ width: "100%" }}
                    options={listClaseExamen}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].estadio ? (
                <Form.Item label="Estadio" name="estadio">
                  <Select
                    placeholder="Seleccione un estadio"
                    style={{ width: "100%" }}
                    options={listEstadio}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].canalAtencion1 ? (
                <Form.Item label="Canal atención" name="canalAtencion">
                  <Select
                    placeholder="Seleccione un canal"
                    style={{ width: "100%" }}
                    options={listCanalAtencion}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].filtroAsegurador ? (
                <Form.Item label="Filtro Asegurador" name="filtroAsegurador">
                  <Select
                    placeholder="Seleccione un filtro asegurador"
                    style={{ width: "100%" }}
                    options={listAsegurador}
                    onChange={onChangeAsegurador}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].filtroPrograma ? (
                <Form.Item label="Filtro Programa" name="filtroPrograma">
                  <Select
                    placeholder="Seleccione un filtro programa"
                    style={{ width: "100%" }}
                    options={listProgramas}
                  />
                </Form.Item>
              ) : null}
            </Col>
            <Col style={{ width: "40%" }}>
              {itemsGeneratingChanges[type].meses1 ? (
                <Form.Item label="Meses Atencion" name="meses">
                  <Select
                    mode="multiple"
                    placeholder="Seleccione meses"
                    style={{ width: "100%" }}
                    options={SelectMeses}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].mesesRenovacion ? (
                <Form.Item label="Meses renovación" name="mesesRenovacion">
                  <Select
                    mode="multiple"
                    placeholder="Seleccione meses de renovación"
                    style={{ width: "100%" }}
                    options={SelectMeses}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].firstDuracion ? (
                <Form.Item label="Duración (1era vez)" name="firstDuracion">
                  <Input
                    placeholder="Digite la duración en minutos"
                    style={{ width: "100%" }}
                    type="Number"
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].duracionSeg ? (
                <Form.Item label="Duración (Seguimiento)" name="duracionSeg">
                  <Input
                    placeholder="Digite la duración en minutos"
                    style={{ width: "100%" }}
                    type="Number"
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].subPrograma ? (
                <Form.Item label="SubPrograma" name="subPrograma">
                  <Select
                    placeholder="Seleccione un subprograma"
                    style={{ width: "100%" }}
                    options={null}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].filtroEstadio ? (
                <Form.Item label="Filtro Estadio" name="filtroEstadio">
                  <Select
                    placeholder="Seleccione un filtro estadio"
                    style={{ width: "100%" }}
                    options={null}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].contrato ? (
                <Form.Item label="Contrato" name="contrato">
                  <Select
                    placeholder="Seleccione un contrato"
                    style={{ width: "100%" }}
                    options={listContrato}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].filtroSede ? (
                <Form.Item label="Filtro Sede" name="filtroSede">
                  <Select
                    placeholder="Seleccione un filtro sede"
                    style={{ width: "100%" }}
                    options={listSedes}
                  />
                </Form.Item>
              ) : null}
              {itemsGeneratingChanges[type].filtroEspecialidad ? (
                <Form.Item
                  label="Filtro Especialidad"
                  name="filtroEspecialidad"
                >
                  <Select
                    placeholder="Seleccione un filtro especialidad"
                    style={{ width: "100%" }}
                    options={listEspecialidad}
                    onChange={(value) => onChangeEspecialidad(value)}
                  />
                </Form.Item>
              ) : null}
            </Col>
          </Row>
          {itemsGeneratingChanges[type].checks ? (
            <>
              <div className="col-12 col-md-12">
                <h4 style={{ fontWeight: "bold", textAlign: "left" }}>
                  Clasificación pacientes
                </h4>
              </div>
              <Row
                gutter={[8, 4]}
                style={{
                  flexDirection: "row",
                }}
              >
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="abandonado">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Abandonado:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="primeraVez">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      1era Vez:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="tbc">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      TBC:
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="hospitalizado">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Hospitalizado:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="bimestralizado">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Bimestralizado:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item label="Mayor de (Años):" name="mayor">
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="naive">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Naive:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="menorExpuesto">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Menor Expuesto:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item label="Menor de (Años):" name="menor">
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="PacienteG">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Paciente Gestante:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="criterioM">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Criterio Medico:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="tuberculosis">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Tuberculosis:
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
                  <Form.Item valuePropName="checked" name="novo">
                    <Checkbox
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      Novo:
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : null}
          {itemsGeneratingChanges[type].dateCreate ? (
            <>
              <div className="col-12 col-md-12">
                <h4 style={{ fontWeight: "bold", textAlign: "left" }}>
                  Datos para Creación
                </h4>
              </div>
              <Row
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Col style={{ width: "40%" }}>
                  {itemsGeneratingChanges[type].canalAtencion2 ? (
                    <Form.Item label="Canal Atencion" name="canalAtencion">
                      <Select
                        mode="multiple"
                        placeholder="Seleccione un canal"
                        style={{ width: "100%" }}
                        options={listCanalAtencion}
                      />
                    </Form.Item>
                  ) : null}
                  {itemsGeneratingChanges[type].claseExamen2 ? (
                    <Form.Item label="Clase Examen" name="claseExamen">
                      <Select
                        placeholder="Seleccione un contrato"
                        style={{ width: "100%" }}
                        options={listClaseExamen}
                      />
                    </Form.Item>
                  ) : null}
                </Col>
                <Col style={{ width: "40%" }}>
                  {itemsGeneratingChanges[type].anos ? (
                    <Form.Item label="Año" name="anos">
                      <DatePicker
                        style={{ width: "100%" }}
                        picker="year"
                      />
                    </Form.Item>
                  ) : null}
                  {itemsGeneratingChanges[type].meses2 ? (
                    <Form.Item label="Meses Atencion" name="meses">
                      <Select
                        mode="multiple"
                        placeholder="Seleccione meses"
                        style={{ width: "100%" }}
                        options={SelectMeses}
                      />
                    </Form.Item>
                  ) : null}
                </Col>
              </Row>
            </>
          ) : null}
          {itemsGeneratingChanges[type].moverMesEspecialidad ? (
            <>
              <div className="col-12 col-md-12">
                <h4 style={{ fontWeight: "bold", textAlign: "left" }}>
                  Mover Mes Especialidad
                </h4>
              </div>
              <Row
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Col style={{ width: "40%" }}>
                  {itemsGeneratingChanges[type].moverAnoDe ? (
                    <Form.Item label="Mover Año de" name="moverAnoDe">
                      <DatePicker
                        style={{ width: "100%" }}
                        picker="year"
                      />
                    </Form.Item>
                  ) : null}
                  {itemsGeneratingChanges[type].moverMesDe ? (
                    <Form.Item label="Mover Mes de" name="moverMesDe">
                      <Select
                        placeholder="Seleccione un contrato"
                        style={{ width: "100%" }}
                        options={SelectMeses}
                      />
                    </Form.Item>
                  ) : null}
                </Col>
                <Col style={{ width: "40%" }}>
                  {itemsGeneratingChanges[type].moverAñoA ? (
                    <Form.Item label="Mover Año a" name="moverAñoA">
                      <DatePicker
                        style={{ width: "100%" }}
                        picker="year"
                      />
                    </Form.Item>
                  ) : null}
                  {itemsGeneratingChanges[type].moverMesA ? (
                    <Form.Item label="Mover Mes a" name="moverMesA">
                      <Select
                        placeholder="Seleccione meses"
                        style={{ width: "100%" }}
                        options={SelectMeses}
                      />
                    </Form.Item>
                  ) : null}
                </Col>
              </Row>
            </>
          ) : null}
        </Form>
      </Modal>
    </>
  );
};
//const ano = form.getFieldValue("ano")?.format("YYYY");