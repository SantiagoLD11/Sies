import { React, useEffect, useState } from "react";
import {
  Select,
  Form,
  Row,
  Input,
  Col,
  Checkbox,
  message,
  Modal,
  Button,
} from "antd";
import {
  ViewContractsPlans,
  getListContrato,
  getListEspecialidad,
  getListCanalAtencion,
  getListEstadio,
  getListClaseExamen,
  updatePlanContract,
  getEditContractsPlans,
} from "../../appRedux/services";
import { SelectMeses } from "../../constants/Months";

export const ViewAndEdit = ({
  modalVisible,
  setModalVisible,
  view,
  idContract,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [listContrato, setListContrato] = useState(null);
  const [listEspecialidad, setListEspecialidad] = useState(null);
  const [listClaseExamen, setListClaseExamen] = useState(null);
  const [listCanalAtencion, setListCanalAtencion] = useState(null);
  const [listEstadio, setListEstadio] = useState(null);
  const [dataModView, setDataModView] = useState(null);

  useEffect(async () => {
    if (modalVisible) {
      if (view == false) {
        const resp = await getListContrato();
        setListContrato(resp);
        const respu = await getListEspecialidad();
        setListEspecialidad(respu);
        const respues = await getListCanalAtencion();
        setListCanalAtencion(respues);
        const respuest = await getListEstadio();
        setListEstadio(respuest);
        const getDataEdit = getEditContractsPlans(idContract);
        await onChangeEspecialidad(getDataEdit.Profesion_txt);
        form.setFieldValue("contrato", getDataEdit.name);
        form.setFieldValue("especialidad", getDataEdit.Profesion_txt);
        form.setFieldValue("claseExamen", getDataEdit.Clase_Examen_txt);
        form.setFieldValue("estadio", getDataEdit.Estadio_txt);
        form.setFieldValue("canalAtencion", getDataEdit.Canales);
        const meses = getDataEdit.Meses.split(",").map((item) => Number(item));
        form.setFieldValue("meses", meses);
        //  const renovacion = getDataEdit.Renovacion.split(",").map((item) =>
        //    Number(item)
        //  );
        //form.setFieldValue("mesesRenovacion", renovacion);
        form.setFieldValue("firstDuracion", getDataEdit.Duracion_1era_Visita);
        form.setFieldValue("duracionSeg", getDataEdit.Duracion_Seguimiento);
        form.setFieldValue("subPrograma", getDataEdit.Sub_Programa);
        form.setFieldValue("mayor", getDataEdit.Mayor_de);
        form.setFieldValue("menor", getDataEdit.Menor_de);
        //form.setFieldValue("abandonado", getDataEdit.Abandonado);
        //form.setFieldValue("hospitalizado", getDataEdit.Hospitalizado);
        // form.setFieldValue("naive", respuesta.Naive);
        // form.setFieldValue("PacienteG", respuesta.Paciente_Gestante);
        // form.setFieldValue("tuberculosis", respuesta.Tuberculosis);
        // form.setFieldValue("primeraVez", respuesta.Primera_Vez);
        // form.setFieldValue("bimestralizado", respuesta.Bimestralizado);
        // form.setFieldValue("menorExpuesto", respuesta.Menor_Expuesto);
        // form.setFieldValue("novo", respuesta.Novo);
        // form.setFieldValue("tbc", respuesta.TBC);
        // form.setFieldValue("criterioM", respuesta.Criterio_Medico);
      } else {
        const respuesta = await ViewContractsPlans(idContract);
        setDataModView(respuesta);
      }
    }
  }, [modalVisible]);

  const onChangeEspecialidad = async (value) => {
    const respue = await getListClaseExamen(value);
    setListClaseExamen(respue);
  };

  const onSubmit = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    console.log(values);
    const resp = await updatePlanContract(idContract, values);
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
        content: "Se ha modificado correctamente",
      });
    }
    setLoading(false);
    closeModal();
    form.resetFields();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={view ? "Ver contrato plan" : "Editar contrato plan"}
        width="800px"
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button onClick={closeModal} key="back">
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
              <Form.Item label="Contrato" name="contrato">
                {view ? (
                  <p>{dataModView?.name}</p>
                ) : (
                  <Select
                    placeholder="Seleccione un contrato"
                    style={{ width: "100%" }}
                    options={listContrato}
                  />
                )}
              </Form.Item>

              <Form.Item label="Primera Vez" name="Primera_Vez">
                {view ? <p>{dataModView?.Primera_Vez}</p> : null}
              </Form.Item>

              <Form.Item label="Especialidad" name="especialidad">
                {view ? (
                  <p>{dataModView?.Profesion_txt}</p>
                ) : (
                  <Select
                    placeholder="Seleccione una especialidad"
                    style={{ width: "100%" }}
                    options={listEspecialidad}
                    onChange={(value) => onChangeEspecialidad(value)}
                  />
                )}
              </Form.Item>

              <Form.Item label="Clase examen" name="claseExamen">
                {view ? (
                  <p>{dataModView?.Clase_Examen_txt}</p>
                ) : (
                  <Select
                    placeholder="Seleccione una clase de examen"
                    style={{ width: "100%" }}
                    options={listClaseExamen}
                  />
                )}
              </Form.Item>

              <Form.Item label="Estadio" name="estadio">
                {view ? (
                  <p>{dataModView?.Estadio_txt}</p>
                ) : (
                  <Select
                    placeholder="Seleccione un estadio"
                    style={{ width: "100%" }}
                    options={listEstadio}
                  />
                )}
              </Form.Item>

              <Form.Item label="Canal atención" name="canalAtencion">
                {view ? (
                  <p>{dataModView?.Canales}</p>
                ) : (
                  <Select
                    placeholder="Seleccione un canal"
                    style={{ width: "100%" }}
                    options={listCanalAtencion}
                  />
                )}
              </Form.Item>

              <Form.Item
                label="Etiquetas Asistenciales"
                name="Etiquetas_Asistenciales_txt"
              >
                {view ? (
                  <p>{dataModView?.Etiquetas_Asistenciales_txt}</p>
                ) : null}
              </Form.Item>

              <Form.Item
                label="Etiquetas Administrativas"
                name="Etiquetas_Administrativas_txt"
              >
                {view ? (
                  <p>{dataModView?.Etiquetas_Administrativas_txt}</p>
                ) : null}
              </Form.Item>
            </Col>
            <Col style={{ width: "40%" }}>
              <Form.Item label="Meses" name="meses">
                {view ? (
                  <p>{dataModView?.Meses}</p>
                ) : (
                  <Select
                    mode="multiple"
                    placeholder="Seleccione meses"
                    style={{ width: "100%" }}
                    options={SelectMeses}
                  />
                )}
              </Form.Item>
              <Form.Item label="Meses renovación" name="mesesRenovacion">
                {view ? (
                  <p>{dataModView?.Renovacion}</p>
                ) : (
                  <Select
                    mode="multiple"
                    placeholder="Seleccione meses de renovación"
                    style={{ width: "100%" }}
                    options={SelectMeses}
                  />
                )}
              </Form.Item>
              <Form.Item label="Duración (1era vez)" name="firstDuracion">
                {view ? (
                  <p>{dataModView?.Duracion_1era_Visita}</p>
                ) : (
                  <Input
                    placeholder="Digite la duración en minutos"
                    style={{ width: "100%" }}
                    type="Number"
                  />
                )}
              </Form.Item>
              <Form.Item label="Duración (Seguimiento)" name="duracionSeg">
                {view ? (
                  <p>{dataModView?.Duracion_Seguimiento}</p>
                ) : (
                  <Input
                    placeholder="Digite la duración en minutos"
                    style={{ width: "100%" }}
                    type="Number"
                  />
                )}
              </Form.Item>
              <Form.Item label="SubPrograma" name="subPrograma">
                {view ? (
                  <p>{dataModView?.Sub_Programa}</p>
                ) : (
                  <Select
                    placeholder="Seleccione un subprograma"
                    style={{ width: "100%" }}
                    options={null}
                  />
                )}
              </Form.Item>

              <Form.Item label="Menor de (Años):" name="menor">
                {view ? (
                  <p>{dataModView?.Menor_de}</p>
                ) : (
                  <Input type="number" />
                )}
              </Form.Item>

              <Form.Item label="Mayor de (Años):" name="mayor">
                {view ? (
                  <p>{dataModView?.Mayor_de}</p>
                ) : (
                  <Input type="number" />
                )}
              </Form.Item>

              <Form.Item label="Sexo al Nacer" name="Sexo_al_Nacer_txt">
                {view ? <p>{dataModView?.Sexo_al_Nacer_txt}</p> : null}
              </Form.Item>
            </Col>
          </Row>
          {/* <div className="col-12 col-md-12">
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
                  disabled={view}
                >
                  Abandonado:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="primeraVez">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  1era Vez:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="tbc">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  TBC:
                </Checkbox>
              </Form.Item>
            </Col>

            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="hospitalizado">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  Hospitalizado:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="bimestralizado">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  Bimestralizado:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item label="Mayor de (Años):" name="mayor">
                {view ? (
                  <p>{dataModView?.Mayor_de}</p>
                ) : (
                  <Input type="number" />
                )}
              </Form.Item>
            </Col>

            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="naive">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  Naive:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="menorExpuesto">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  Menor Expuesto:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item label="Menor de (Años):" name="menor">
                {view ? (
                  <p>{dataModView?.Menor_de}</p>
                ) : (
                  <Input type="number" />
                )}
              </Form.Item>
            </Col>

            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="PacienteG">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  Paciente Gestante:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="criterioM">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  Criterio Medico:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="tuberculosis">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  Tuberculosis:
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: "flex", flexDirection: "row" }} span={8}>
              <Form.Item valuePropName="checked" name="novo">
                <Checkbox
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  disabled={view}
                >
                  Novo:
                </Checkbox>
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
      </Modal>
    </>
  );
};
