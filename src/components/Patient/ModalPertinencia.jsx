import { React, useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  DatePicker,
  Modal,
  Select,
  Input,
  message,
} from "antd";
import {
  getListClaseExamenPertinencia,
  getListEspecialidadPertinencia,
  getListCanalAtencion,
  createPertinencia,
  Pertinencia_Administrativa,
} from "../../appRedux/services";
import { SelectMeses } from "../../constants/Months";
import moment from "moment";
import Swal from "sweetalert2";

export const ModalPertinencia = ({
  isModalPertinencia,
  setIsModalPertinencia,
  mes,
  ano,
  duracion,
  detailPlan,
  getData,
  idPrograma,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listProfesiones, setListProfesiones] = useState([]);
  const [listClaseExamen, setListClaseExamen] = useState(null);
  const [listCanales, setListCanales] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(async () => {
    if (isModalPertinencia) {
      form.setFieldValue("duracion", duracion);
      const listProf = await getListEspecialidadPertinencia(idPrograma);
      setListProfesiones(listProf);
      const listCanales = await getListCanalAtencion();
      setListCanales(listCanales);
      form.setFieldValue("ano", moment(`${ano}-01-01`, "YYYY-MM-DD"));
      form.setFieldValue("mes", mes);
    }
  }, [isModalPertinencia]);

  const close = () => {
    setIsModalPertinencia(false);
  };

  const onChangeProfesion = async (val) => {
    const listClaseExamen = await getListClaseExamenPertinencia(val,idPrograma);
    setListClaseExamen(listClaseExamen);
  };

  const onChangeCanal = async () => {
    // listClaseExamen?.forEach((item) => {
    //   if (item.value == val) {
    //     form.setFieldValue("duracion", item.duracion);
    //   }
    // });
    const values = form.getFieldsValue();
    const response = await Pertinencia_Administrativa(idPrograma, values);
    if (response?.Duracion) {
      form.setFieldValue("duracion", response.Duracion);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No existe duración para los canales seleccionados",
      });
    }
  };

  const onChange = (date, dateString) => {
    console.log(date.getFullYear, dateString);
  };

  const submit = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    //const response = await Pertinencia_Administrativa(idPrograma,values);
    //form.setFieldValue("Duracion_Min", response.Duracion);
    try {
      const resp = await createPertinencia(detailPlan, values);
      await messageApi.open({
        type: "success",
        content: "Se ha creado correctamente la nota",
      });
    } catch (error) {
      console.log(error.response);
      await messageApi.open({
        type: "error",
        content: error.response?.data?.message || "error",
      });
    }
    setLoading(false);
    close();
    form.resetFields();
    getData();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Agregar Pertinencia"
        open={isModalPertinencia}
        onCancel={close}
        footer={[
          <Button key="button-cancel" onClick={close}>
            Cerrar
          </Button>,
          <Button key="add" loading={loading} onClick={form.submit}>
            Agregar
          </Button>,
        ]}
      >
        <Form
          colon={false}
          onFinish={submit}
          form={form}
          autoComplete="off"
          layout="vertical"
        >
          <Row
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Form.Item
              label="Profesión"
              name="profesion"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Select
                placeholder="Seleccione una profesión"
                style={{ width: "100%" }}
                options={listProfesiones}
                onChange={(val) => {
                  onChangeProfesion(val);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Clase Examen"
              name="claseExamen"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Select
                placeholder="Seleccione un examen"
                style={{ width: "100%" }}
                options={listClaseExamen}
              />
            </Form.Item>
            <Form.Item
              label="Canal Atención"
              name="canales"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Select
                mode="multiple"
                placeholder="Seleccione canales"
                style={{ width: "100%" }}
                options={listCanales}
                onChange={onChangeCanal}
              />
            </Form.Item>
            <Form.Item label="Mes Calendario" name="mes">
              <Select
                disabled
                placeholder="Seleccione un mes"
                style={{ width: "100%" }}
                options={SelectMeses}
              />
            </Form.Item>
            <Form.Item label="Año" name="ano">
              <DatePicker
                disabled
                style={{ width: "100%" }}
                onChange={onChange}
                picker="year"
                //defaultValue={ano}
                // disabledDate={(current) =>
                //   current && current.year() < añoActual
                // }
              />
            </Form.Item>
            <Form.Item
              label="Duración"
              name="duracion"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Input
                type="text"
                disabled
                //value={duracion}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
