import { Button, Form, Input, notification, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  create_professional,
  list_documents_integ_pro,
} from "../appRedux/services";

const CreateProfesional = ({
  open,
  setOpen,
  numero_doc,
  dataIntegrarProfesional,
  getDatagrid,
  setDataIntegrarProfesional,
  cargando,
}) => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const close = () => setOpen(false);
  const [typeDocs, setTypeDoc] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [values, setValues] = useState({
    tipo_documento: "",
    numero_documento: "",
  });
  const [form] = Form.useForm();

  const onSubmit = async (_values) => {
    setLoading(true);
    try {
      await create_professional(_values);
      await notificationApi.open({
        type: "success",
        description: "Profesional integrado correctamente",
      });
      history.push({
        pathname: `/detail-professional/${_values?.numero_documento}`,
        state: { type: "numero_document" },
      });
      close();
    } catch (error) {
      await notificationApi.open({
        type: "error",
        description: error.response?.data?.message,
      });
    }
    setLoading(false);
  };

  const on_change = ({ target }) => {
    console.log("target", target);
    setValues({ ...values, [target.name]: target.value });
  };

  const getDocuments = async () => {
    const resp = await list_documents_integ_pro();
    setTypeDoc(resp);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(async () => {
    let TipoValue;
    if (dataIntegrarProfesional.Integrar) {
      for (let doc of typeDocs) {
        if (doc.label === dataIntegrarProfesional?.Tipo_Documento) {
          TipoValue = doc.value;
          break;
        }
      }
      const json = {
        tipo_documento: TipoValue,
        numero_documento: dataIntegrarProfesional?.Numero_Documento,
      };
      try {
        await create_professional(json);
        await notificationApi.open({
          type: "success",
          description: "Profesional integrado correctamente",
        });
        getDatagrid(dataIntegrarProfesional?.filtros);
        //close();
      } catch (error) {
        await notificationApi.open({
          type: "error",
          description: error.response?.data?.message,
        });
        cargando(false);
        // setDataIntegrarProfesional({
        //   Integrar: false,
        //   Tipo_Documento: null,
        //   Numero_Documento: null,
        //   filtros: null,
        // });
      }
    }
  }, [dataIntegrarProfesional]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Crear Profesional"
        open={open}
        onCancel={close}
        footer={[
          <Button key="button-cancel" onClick={close}>
            Cancelar
          </Button>,
          <Button
            key="button-integrar"
            loading={loading}
            onClick={() => form.submit()}
          >
            Integrar
          </Button>,
        ]}
      >
        <Form
          name="wrap"
          layout="vertical"
          colon={false}
          onFinish={onSubmit}
          form={form}
          autoComplete="off"
          // fields={[
          //   {
          //     name: ["numero_documento"],
          //     value: numero_doc || "",
          //   },
          // ]}
        >
          <div className="row align-items-center">
            <div className="col-12 col-md-6 col-lg-6">
              <Form.Item
                label="Tipo de documento"
                name="tipo_documento"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select
                  className="w-100"
                  showSearch
                  placeholder="Selecciona tipo de documento"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={typeDocs}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <Form.Item
                label="Número de documento"
                name="numero_documento"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input onChange={on_change} name="numero_documento" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProfesional;
