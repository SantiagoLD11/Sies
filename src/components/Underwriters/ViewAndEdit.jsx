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
  getListCanalAtencion,
  getlistSexoNacer,
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
  const [inputDate, setInputDate] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [listSexo, setListSexo] = useState(null);
  const [listCanalAtencion, setListCanalAtencion] = useState(null);
  const [dataModView, setDataModView] = useState(null);
  const [dataModEdit, setDataModEdit] = useState({
    _canalAtencion: "",
    _meses: "",
    _menor: "",
    _mayor: "",
    _firstDuracion: "",
    _duracionSeg: "",
    _gen:""
  });

  useEffect(async () => {
    if (modalVisible) {
      if (view == false) {
        const getDataEdit = await getEditContractsPlans(idContract);

        console.log("Datos "+getDataEdit.Canales_ids);

        form.setFieldValue("canalAtencion", getDataEdit.Canales_ids);
        form.setFieldValue("meses", getDataEdit.Meses);
        form.setFieldValue("menor", getDataEdit.Menor_de);
        form.setFieldValue("mayor", getDataEdit.Mayor_de);
        form.setFieldValue("firstDuracion", getDataEdit.Duracion_1era_Visita);
        form.setFieldValue("duracionSeg", getDataEdit.Duracion_Seguimiento);
        form.setFieldValue("Sexo_al_Nacer_txt", getDataEdit.Sexo_al_Nacer_id);

        const objEdit = {
          _canalAtencion: getDataEdit.Canales_ids,
          _meses: getDataEdit.Meses,
          _menor: getDataEdit.Menor_de,
          _mayor: getDataEdit.Mayor_de,
          _firstDuracion: getDataEdit.Duracion_1era_Visita,
          _duracionSeg: getDataEdit.Duracion_Seguimiento,
          _gen: getDataEdit.Sexo_al_Nacer_id
        };

        setDataModEdit(objEdit);

        const respues = await getListCanalAtencion();
        setListCanalAtencion(respues);

        const resListSexo = await getlistSexoNacer();
        setListSexo(resListSexo);
        
      } else {
        const respuesta = await ViewContractsPlans(idContract);
        setDataModView(respuesta);
      }
    }
  }, [modalVisible]);

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
            <Col style={{ width: "50%" }}>

              <Form.Item label="Canal atención" name="canalAtencion" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                {view ? (
                  <p>{dataModView?.Canales}</p>
                ) : (
                  <Select
                    placeholder="Seleccione un canal"
                    style={{ width: "100%" }}
                    options={listCanalAtencion}
                    value={dataModEdit._canalAtencion}
                  />
                )}
              </Form.Item>

              <Form.Item label="Meses" name="meses" rules={[{ required: true, message: 'Campo obligatorio' }]} >
                {view ? (
                  <p>{dataModView?.Meses}</p>
                ) : (
                  <Input
                    placeholder="Digite los meses separados por comas"
                    style={{ width: "100%" }}
                    value={dataModEdit._meses}
                    defaultValue={dataModEdit._meses}
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
                )}
              </Form.Item>

              <Form.Item label="Menor de (Años):" name="menor" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                {view ? (
                  <p>{dataModView?.Menor_de}</p>
                ) : (
                  <Input type="number" value={dataModEdit._menor} defaultValue={dataModEdit._menor}/>
                )}
              </Form.Item>

              <Form.Item label="Mayor de (Años):" name="mayor" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                {view ? (
                  <p>{dataModView?.Mayor_de}</p>
                ) : (
                  <Input type="number" value={dataModEdit._mayor} defaultValue={dataModEdit._mayor}/>
                )}
              </Form.Item>

            </Col>
            <Col style={{ width: "50%" }}>
              
            <Form.Item label="Sexo al Nacer" name="Sexo_al_Nacer_txt" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                {view ? <p>{dataModView?.Sexo_al_Nacer_txt}</p> : (
                  <Select
                    placeholder="Seleccione un Genero"
                    style={{ width: "100%" }}
                    options={listSexo}
                    value={dataModEdit._gen}
                  />
                )}
              </Form.Item>
              <Form.Item label="Duración (1era vez)" name="firstDuracion" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                {view ? (
                  <p>{dataModView?.Duracion_1era_Visita}</p>
                ) : (
                  <Input
                    placeholder="Digite la duración en minutos"
                    style={{ width: "100%" }}
                    type="Number"
                    value={dataModEdit._firstDuracion}
                    defaultValue={dataModEdit._firstDuracion}
                  />
                )}
              </Form.Item>
              <Form.Item label="Duración (Seguimiento)" name="duracionSeg" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                {view ? (
                  <p>{dataModView?.Duracion_Seguimiento}</p>
                ) : (
                  <Input
                    placeholder="Digite la duración en minutos"
                    style={{ width: "100%" }}
                    type="Number"
                    value={dataModEdit._duracionSeg}
                    defaultValue={dataModEdit._duracionSeg}
                  />
                )}
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
