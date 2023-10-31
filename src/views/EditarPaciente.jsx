import { Modal, Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  getInfoGeneralPacient,
  updatePatient,
  listCiudades,
} from "../appRedux/services";

export const EditarPaciente = ({
  setIsActualizar,
  open,
  setOpen,
  idPaciente,
}) => {
  const [field1Value, setField1Value] = useState("");
  const [field2Value, setField2Value] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [listaCiudades, setListaCiudades] = useState([]);
  const [paciente, setPaciente] = useState({
    Direccion: "",
    Celular: "",
    Tel: "",
    Ciudad: "",
    Email: "",
  });

  const close = () => setOpen(false);

  useEffect(() => {
    if (idPaciente && open) {
      getPaciente();
    }
  }, [open]);

  const getPaciente = async () => {
    const infoPaciente = await getInfoGeneralPacient(idPaciente);
    setPaciente(infoPaciente);
    const listaCiudades = await listCiudades();
    setListaCiudades(listaCiudades);
  };

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);

    try {
      await updatePatient(idPaciente, values);
      await messageApi.open({
        type: "success",
        content: "Paciente integrado correctamente",
      });
      close();
    } catch (error) {
      await messageApi.open({
        type: "error",
        content: error.response?.data?.message,
      });
    }

    // const resp = await updatePatient(idPaciente, values);
    // console.log("actualizar paciente: ", resp);
    // if (resp?.status === "fail") {
    //   console.log("Actualizar: ", resp);
    //   await messageApi.open({
    //     type: "error",
    //     content: resp?.message || "error",
    //   });
    // }
    // if (resp?.status === "ok") {
    //   await messageApi.open({
    //     type: "success",
    //     content: "Se ha editado correctamente el paciente",
    //   });
    // }
    setLoading(false);
    setIsActualizar(true);
    setOpen(false);
  };

  const handleInputChange = (e, field) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      e.target.value = "";
    }
    if (field === "field1") {
      setField1Value(e.target.value);
    } else if (field === "field2") {
      setField2Value(e.target.value);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Editar Paciente"
        open={open}
        onCancel={close}
        onOk={onFinish}
        footer={[
          <Button key="button-cancel" onClick={close}>
            Cancelar
          </Button>,
          <Button
            key="button-actualizar"
            htmlType="submit"
            form="basic"
            loading={loading}
            style={{ backgroundColor: "#00ABC8", color: "#FFF" }}
            // onClick={() => onFinish}
            disabled={
              //form.isFieldsTouched(false) ||
              form.getFieldsError().filter(({ errors }) => errors.length)
                .length > 0
            }
          >
            Actualizar
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="basic"
          name="basic"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          fields={[
            {
              name: ["direccion"],
              value: paciente?.Direccion || "",
            },
            {
              name: ["celular"],
              value: paciente?.Celular || "",
            },
            {
              name: ["tel"],
              value: paciente?.Tel || "",
            },
            {
              name: ["ciudad"],
              value: paciente?.Ciudad || "",
            },
            {
              name: ["email"],
              value: paciente?.Email || "",
            },
          ]}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <Form.Item
                label="Dirección"
                name="direccion"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Celular"
                name="celular"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa solo números",
                    pattern: /^[0-9]*$/,
                  },
                ]}
              >
                <Input
                  type="text"
                  //onChange={(e) => handleInputChange(e, "field1")}
                  //value={field1Value}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Teléfono"
                name="tel"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa solo números",
                    pattern: /^[0-9]*$/,
                  },
                ]}
              >
                <Input
                  type="text"
                  //onChange={(e) => handleInputChange(e, "field2")}
                  //value={field2Value}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Ciudad"
                name="ciudad"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select
                  showSearch
                  name="ciudad"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listaCiudades}
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa un correo electrónico válido",
                    type: "email",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
