import { Modal, Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  listHorariosContacto,
  updateEditPatientPreferences,
  updatePreferences,
  listDispositivosTelemedicina,
  listProfesionalesNoDeseados,
  listCanalEnvios,
  getInfoPreferencesPacient,
  listConexionInternet,
} from "../../appRedux/services/index";

export const EditPatientPreferences = ({
  open,
  setOpen,
  idPaciente,
  getData,
}) => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [telemedicina, setTelemedicina] = useState([]);
  const [canal, setCanal] = useState([]);
  const [profesionalesNo, setProfesionalesNo] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [conexion, setConexion] = useState([]);

  let Json = {
    dispositivo: null,
    canal: null,
    conexion: null,
    profesionales: null,
    horarios: null,
  };

  const [preferences, setPreferences] = useState({
    personaAuth: null,
    dispositivo: null,
    llamar: null,
    canal: null,
    HorarioSugeridoContacto: null,
    conexion: null,
    profesionales: undefined,
    horarios: undefined,
  });

  useEffect(() => {
    if (idPaciente && open === true) {
      getPreferences();
    }
  }, [open]);

  const getPreferences = async () => {
    const InfoPreferences = await getInfoPreferencesPacient(idPaciente);
    console.log(InfoPreferences);
    setPreferences(InfoPreferences);
    const Telemedicina = await listDispositivosTelemedicina();
    setTelemedicina(Telemedicina);
    const Canal = await listCanalEnvios();
    setCanal(Canal);
    const ProfesionalesNo = await listProfesionalesNoDeseados();
    setProfesionalesNo(ProfesionalesNo);
    const Horarios = await listHorariosContacto();
    setHorarios(Horarios);
    const Conexion = await listConexionInternet();
    setConexion(Conexion);
  };

  const jsonToSend = async (values) => {
    for (let tele of telemedicina) {
      if (tele.value === values.dispositivo) {
        Json.dispositivo = tele.code;
        break;
      }
    }
    for (let cana of canal) {
      if (cana.value === values.canal) {
        Json.canal = cana.code;
        break;
      }
    }
    for (let conexio of conexion) {
      if (conexio.value === values.conexion) {
        Json.conexion = conexio.code;
        break;
      }
    }
    //Json.horarios = values.horarios?.join('|');
    Json.profesionales = values.profesionales?.join("|");
  };

  const onFinish = async (values) => {
    await jsonToSend(values);
    console.log(Json);
    setLoading(true);
    await updateEditPatientPreferences(idPaciente, values, Json);
    const resp = await updatePreferences(idPaciente, values, Json);
    console.log("actualizar preferencias: ", resp);
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
        content: "Se ha editado correctamente las preferencias del paciente",
      });
    }
    getData(idPaciente);
    setLoading(false);
    setOpen(false);
  };

  const close = () => setOpen(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Edición preferencias"
        width={"720px"}
        open={open}
        onCancel={close}
        footer={[
          <Button key="button-cancel" onClick={close}>
            Cerrar
          </Button>,
          <Button
            key="button-actualizar"
            htmlType="submit"
            form="basic"
            loading={loading}
          >
            Guardar
          </Button>,
        ]}
      >
        <Form
          id="basic"
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          fields={[
            {
              name: ["personaAuth"],
              value: preferences?.personaAuth || "",
            },
            {
              name: ["dispositivo"],
              value: preferences?.dispositivo || "",
            },
            {
              name: ["llamar"],
              value: preferences?.llamar || "",
            },
            {
              name: ["canal"],
              value: preferences?.canal || "",
            },
            {
              name: ["horario_contacto"],
              value: preferences?.HorarioSugeridoContacto || "",
            },
            {
              name: ["conexion"],
              value: preferences?.conexion || "",
            },
            {
              name: ["profesionales"],
              value: preferences?.profesionales || undefined,
            },
            {
              name: ["horarios"],
              value: preferences?.horarios || null,
            },
          ]}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <Form.Item
                label="Persona autorizada contacto"
                name="personaAuth"
                //rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Dispositivo para Telemedicina"
                name="dispositivo"
                //rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Select onChange={handleChange} options={telemedicina} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Llamar como"
                name="llamar"
                //rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Canal envío confirmación" name="canal">
                <Select onChange={handleChange} name="ciudad" options={canal} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Horario contacto"
                name="horario_contacto"
                //rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Conexión a internet" name="conexion">
                <Select options={conexion} onChange={handleChange} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Profesionales no deseados" name="profesionales">
                <Select
                  showSearch
                  onChange={handleChange}
                  options={profesionalesNo}
                  placeholder="Seleccione profesionales"
                  mode="multiple"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Horarios agendamiento" name="horarios">
                <Select
                  options={horarios}
                  //mode="multiple"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
          </div>
          <Button
            Style="display: none;"
            id="your-form-submit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Actualizar
          </Button>
        </Form>
      </Modal>
    </>
  );
};
