import { Button, Card, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  get_info_general_professional,
  list_documents,
  updateProfessional,
} from "../appRedux/services";

const EditProfesional = () => {
  const { id } = useParams();
  const history = useHistory();
  const [typeDocs, setTypeDoc] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [professional, setProfessional] = useState({
    nombre: "",
    apellido: "",
    tipo_documento: "",
    numero_documento: "",
    celular: "",
  });
  const onFinish = async (values) => {
    setLoading(true);
    const resp = await updateProfessional(professional?.id, values);
    if (resp.status === "fail") {
      await messageApi.open({
        type: "error",
        content: resp?.message || "error",
      });
    }
    if (resp.status === "ok") {
      await messageApi.open({
        type: "success",
        content: "Se ha editado correctamente el profesional",
      });
    }
    history.push(`/detail-professional/${id}`);
    setLoading(false);
  };

  const getTypesDocuments = async () => {
    const types_documents = await list_documents();
    setTypeDoc(types_documents);
  };
  const getProfessional = async () => {
    const infoProfessional = await get_info_general_professional(id);
    setProfessional(infoProfessional);
  };

  useEffect(() => {
    getTypesDocuments();
  }, []);

  useEffect(() => {
    if (id) {
      getProfessional();
    }
  }, [id]);

  return (
    <>
      {contextHolder}
      <Card title="Editar Profesional">
        <Form
          name="basic"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          fields={[
            {
              name: ["nombres"],
              value: professional?.nombre || "",
            },
            {
              name: ["apellidos"],
              value: professional?.apellido || "",
            },
            {
              name: ["tipo_documento"],
              value: professional?.tipo_documento || "",
            },
            {
              name: ["numero_documento"],
              value: professional?.numero_documento || "",
            },
            {
              name: ["celular"],
              value: professional?.celular || "",
            },
          ]}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <Form.Item
                label="Nombres"
                name="nombres"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Apellidos"
                name="apellidos"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
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
            <div className="col-12 col-md-6">
              <Form.Item
                label="Número de documento"
                name="numero_documento"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Número de celular" name="celular">
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType="button" onClick={ () => history.push(`/detail-professional/${id}`)
            } >
              Regresar
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Actualizar
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default EditProfesional;
