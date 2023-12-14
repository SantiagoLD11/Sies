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
  getDurationPrograma,
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
  const [canalAtencionDefault, setCanalAtencionDefault] = useState(null);
  const [generoDefault, setGeneroDefault] = useState(null);

  const [dataModView, setDataModView] = useState(null);
  const [dataModEdit, setDataModEdit] = useState({
    _meses: "",
    _menor: "",
    _mayor: "",
    _firstDuracion: "",
    _duracionSeg: ""
  });

  useEffect(async () => {
    try {
      if(modalVisible){
      const respues = await getListCanalAtencion();
      setListCanalAtencion(respues);

      const resListSexo = await getlistSexoNacer();
      setListSexo(resListSexo);
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
            _meses: getDataEdit.Meses,
            _menor: getDataEdit.Menor_de,
            _mayor: getDataEdit.Mayor_de,
            _firstDuracion: getDataEdit.Duracion_1era_Visita,
            _duracionSeg: getDataEdit.Duracion_Seguimiento,
          };

          setDataModEdit(objEdit);

          setGeneroDefault(Number(getDataEdit.Sexo_al_Nacer_id));
  
          setCanalAtencionDefault(getDataEdit.Canales_ids);

          console.log(generoDefault);

        }
                  
    } catch (error) {

      console.error("Error en visualizacion");
      
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
        content: "Se ha actualizado el contrato plan, y los pacientes asociados a este correctamente!.",
      });
    }
    setLoading(false);
    closeModal();
    form.resetFields();
  };

  const validarInput = () => {
    const inputValue = form.getFieldValue('meses'); // Obtén el valor actual del campo 'meses' del formulario
    const numbersArray = inputValue.split(',').map(item => parseInt(item.trim(), 10));

    const duration = getDurationPrograma(options?.idPrograma);  
  
    const isValid = numbersArray.every(num => !isNaN(num) && num <= duration);

    const regex = /^[0-9,]*$/;
    if (regex.test(inputValue)) {
      form.setFieldsValue({
        meses: inputValue,
      });
    }else{
      Swal.fire({
        title: "Oops",
        text: "Solo es admitido numeros y comas en los meses.. por favor intentar de nuevo",
        icon: "info",
      });
      form.setFieldsValue({
        meses: "",
      });

      return false;
    }
  
    if (!isValid) {
      Swal.fire({
        title: "No es posible!",
        text: `El programa tiene una duracion de: ${_durationProgram} meses`,
        icon: "info",
      });
      const filteredNumbers = numbersArray.filter(num => !isNaN(num) && num <= _durationProgram);

      const updatedValue = filteredNumbers.join(',');
      form.setFieldsValue({
        meses: updatedValue,
      });
      return false;
    } else {
      form.setFieldsValue({
        meses: inputValue,
      });
    }
    return true;
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
          fields={[
            {
              name: ["canalAtencion"],
              value: canalAtencionDefault,
          },
          {
            name: ["Sexo_al_Nacer_txt"],
            value: generoDefault,
        },

        ]}
        >
          <Row
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Col style={{ width: "48%", marginRight: "5px"}}>

              <Form.Item initialValue ={canalAtencionDefault} label="Canal atención" name="canalAtencion" rules={[{ required: true, message: 'Campo obligatorio' }]}>

                  <Select
                    placeholder="Seleccione los canales"
                    mode="multiple"
                    style={{ width: "100%" }}
                    options={listCanalAtencion}
                  />
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
                    onBlur={validarInput}
                  />
                )}
              </Form.Item>

              <Form.Item label="Menor de (Años):" name="menor" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                {view ? (
                  <p>{dataModView?.Menor_de}</p>
                ) : (
                  <Input type="number" value={dataModEdit._menor}/>
                )}
              </Form.Item>

              <Form.Item label="Mayor de (Años):" name="mayor" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                {view ? (
                  <p>{dataModView?.Mayor_de}</p>
                ) : (
                  <Input type="number" value={dataModEdit._mayor} />
                )}
              </Form.Item>

            </Col>
            <Col style={{ width: "48%" }}>
              
            <Form.Item label="Sexo al Nacer" name="Sexo_al_Nacer_txt" rules={[{ required: true, message: 'Campo obligatorio' }]}>
                  <Select
                    placeholder="Seleccione un Genero"
                    style={{ width: "100%" }}
                    options={listSexo}
                  />
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
        </Form>
      </Modal>
    </>
  );
};
