import { React, useEffect, useState } from "react";
import { Button, Modal, Select, Input, message, Form } from "antd";
import {
  cancelarCita,
  getListMotivoCancel,
  triggerCancelarCita,
  triggerReagendarCita,
  getFlagsQuotes,
  getInfPlans,
} from "../../appRedux/services";
const { TextArea } = Input;

export const CancelAppointment = ({
  isModalCancel,
  setIsModalCancel,
  dataRow,
  getInfo,
  isCancel,
  setListInfoPlans,
  setDataTable,
  detailPlan,
  idPmPlan,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listMotivoCancel, setListMotivoCancel] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(async () => {
    const response = await getListMotivoCancel();
    setListMotivoCancel(response);
  }, []);

  const handleCancel = () => {
    setIsModalCancel(false);
    form.resetFields();
  };
  const validateForm = async () => {
    try {
      // Use Ant Design Form's validateFields to validate the form fields
      if(await form.validateFields()){
        return true; // Form is valid
      }else{
        return false;
      }
    } catch (errorInfo) {
      // Handle validation errors and show error messages
  
      // Show error messages to the user (you can customize this part)
      console.log(`Form validation failed: ${errorInfo}`);
  
      return false; // Form is not valid
    }
  };
  const handleOk = async () => {
    const isValid = validateForm();
    if(isValid){
      const values = form.getFieldsValue();
      const json = {
        idCita: dataRow?.id,
        Motivo: values?.motivo,
        TexA: values?.observacion,
      };
      setLoading(true);
      const resp = await cancelarCita(json);
      if (resp.status == "ok") {
        await messageApi.open({
          type: "success",
          content: isCancel
            ? "Cita cancelada exitosamente"
            : "Cita reagendada exitosamente",
        });
      } else {
        await messageApi.open({
          type: "error",
          content: "error",
        });
      }
      if (isCancel) {
        await triggerCancelarCita(json.idCita);
      } else {
        await triggerReagendarCita(json.idCita);
      }
      if(idPmPlan){
        console.log(idPmPlan);
        //const flagsQuotes = await getFlagsQuotes(idPmPlan);
       // setDataTable(flagsQuotes);
        const infPlans = await getInfPlans(detailPlan);
      }
      setLoading(false);
      setIsModalCancel(false);
      getInfo();
    }
  };

  return (
    <Modal
      title={isCancel ? "Cancelar Cita" : "Reagendar Cita"}
      open={isModalCancel}
      onCancel={handleCancel}
      footer={[
        <Button key="button-cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="button-integrar" loading={loading} onClick={form.submit}>
          Confirmar
        </Button>,
      ]}
    >
      {contextHolder}
      <Form
        colon={false}
        onFinish={handleOk}
        form={form}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Motivo cancelación"
          name="motivo"
          rules={[{ required: true, message: "Campo obligatorio" }]}
          style={{ marginBottom: "20px" }}
        >
          <Select
            className="w-100"
            placeholder="Selecciona un motivo cancelación"
            options={listMotivoCancel}
          />
        </Form.Item>
        <Form.Item
          label="Observación"
          name="observacion"
          rules={[{ required: true, message: "Campo obligatorio" }]}
          style={{ marginBottom: "20px" }}
        >
          <TextArea className="w-100" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
