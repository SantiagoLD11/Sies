import { Button, Form, Collapse, Row, Col, DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  getListExam,
  getListCitysProfessionals,
  getListDispositionFilters,
  getListPrograma,
} from "../../appRedux/services";
const { Panel } = Collapse;

const status = [
  { value: 1, label: "Disponible" },
  { value: 2, label: "Bloqueado" },
  { value: 3, label: "Asignado Cita" },
  { value: 4, label: "Eliminado" },
];

export const FilterDisposition = ({
  id,
  setData,
  changeStatus,
  dataImported,
  setDataImported,
  activeKey,
}) => {
  const [form] = Form.useForm();
  const [listExams, setListExams] = useState([]);
  const [listCitys, setListCitys] = useState([]);
  const [listPrograma, setListPrograma] = useState([]);
  let final_values = null;

  const json = {
    date_start: undefined,
    date_end: undefined,
    exam: undefined,
    city: undefined,
    status: 1,
    programa: undefined,
  };

  const getlist = async () => {
    const listExam = await getListExam(id);
    setListExams(listExam);
    const listCity = await getListCitysProfessionals(id);
    setListCitys(listCity);
    const listPrograma = await getListPrograma(id);
    setListPrograma(listPrograma);
  };

  useEffect(() => {
    getlist();
  }, []);

  const getDataList = async (value) => {
    const resp = await getListDispositionFilters(value, id);
    setData(resp);
  };

  useEffect(() => {
    console.log("se disparo active ", final_values);
    if (
      final_values != null &&
      id &&
      (activeKey === "2" || activeKey === "3")
    ) {
      console.log("sirve actualizar tabla");
      onSubmit(final_values);
    }
    if (
      final_values == null &&
      id &&
      (activeKey === "2" || activeKey === "3")
    ) {
      console.log("sirve actualizar tabla");
      getDataList(json);
    }
  }, [activeKey]);

  useEffect(() => {
    console.log("se disparo", changeStatus, dataImported);
    if (final_values != null) {
      console.log("sirve actualizar tabla");
      onSubmit(final_values);
      setDataImported(false);
    }
    if (final_values == null) {
      console.log("sirve actualizar tabla");
      getDataList(json);
      setDataImported(false);
    }
  }, [dataImported, changeStatus]);

  const onSubmit = async (values) => {
    const fecha = values?.date_start?.format("YYYY-MM-DD HH:mm");
    //fecha.setHours(0, 0, 0, 0);
    const SecondFecha = values?.date_end?.format("YYYY-MM-DD HH:mm");
    //SecondFecha.setHours(23, 59, 59, 999);
    final_values = {
      date_start: fecha,
      date_end: SecondFecha,
      exam: values?.exam,
      city: values?.city,
      status: values?.status,
      programa: values?.programa,
    };
    console.log(values);
    getDataList(final_values);
  };

  return (
    <>
      <Collapse>
        <Panel header="Filtros" key="1">
          <Form
            colon={false}
            onFinish={onSubmit}
            form={form}
            autoComplete="off"
            layout="vertical"
          >
            <Row style={{ flexDirection: "row" }} gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Fecha y Hora Inicio" name="date_start">
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: "100%" }}
                    onChange={() => {
                      console.log("inicio: ", form.getFieldValue("date_start"));
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Fecha y Hora Final" name="date_end">
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: "100%" }}
                    onChange={() => {
                      console.log("fin: ", form.getFieldValue("date_end"));
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Examen" name="exam">
                  <Select
                    placeholder="Seleccione un examen"
                    options={listExams}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Ciudad" name="city">
                  <Select
                    placeholder="Seleccione una ciudad"
                    options={listCitys}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Estado" name="status">
                  <Select defaultValue={1} placeholder="Seleccione un estado" options={status} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Programa" name="programa">
                  <Select
                    placeholder="Seleccione un programa"
                    options={listPrograma}
                  />
                </Form.Item>
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
                span={8}
              >
                <Button type="primary" onClick={form.submit}>
                  Filtrar
                </Button>
                <Button
                  //htmlType="submit"
                  onClick={() => {
                    form.resetFields();
                    getDataList(undefined);
                  }}
                >
                  Limpiar Filtros
                </Button>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </>
  );
};
