import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Typography, Table } from "antd";
import { getInfoNotes } from "../../appRedux/services/index";
import { itemsNotes } from "../../constants/ItemsNotes";
const { Text } = Typography;

export const ViewNote = ({ open, setOpen, dataNote, idPaciente }) => {
  const [form] = Form.useForm();
  const [dataTable, setDataTable] = useState(null);
  const [dataNotes, setDataNotes] = useState({
    Fecha_Etiqueta: null,
    Etiqueta_Seguimiento_txt: null,
    Resultado_de_Contacto_txt: null,
    Motivo_Inasistencia_txt: null,
    Etiqueta_Administrativa_txt: null,
    Plan_Ruta_txt: null,
    Plan_Mensual_txt: null,
    Nota_Cambio: null,
    Observacion_Seguimiento: null,
    Tabla_Resultados: null,
  });

  useEffect(() => {
    if (idPaciente && open === true) {
      getInfoNote();
    }
  }, [open]);

  const getInfoNote = async () => {
    const Data = await getInfoNotes(dataNote.Id);
    setDataNotes(Data);
    console.log(dataNote);
    console.log("Llego: ", Data);
    if (Data.Plan_Mensual_txt) {
      setDataTable(convertirStringAArreglo(Data?.Tabla_Resultados));
      console.log("convirtio: ", dataTable);
    }
  };

  const convertirStringAArreglo = (string) => {
    const numeros = string.split(",");
    const array = [];

    for (let i = 0; i < numeros.length; i += 2) {
      const servicio = numeros[i];
      const resultado = numeros[i + 1];
      const objeto = { servicio: servicio, resultado: resultado };
      array.push(objeto);
    }

    return array;
  };

  const close = () => setOpen(false);

  const columns = [
    {
      title: "Servicio",
      dataIndex: "servicio",
      key: "servicio",
      render: (text) =><strong>{text}</strong>,
    },
    {
      title: "Resultado contacto",
      dataIndex: "resultado",
      key: "resultado",
    },
  ];

  return (
    <>
      <Modal
        title="Ver Notas Administrativas"
        open={open}
        onCancel={close}
        footer={[
          <Button key="button-cancel" onClick={close}>
            Cerrar
          </Button>,
        ]}
      >
        <Form
          id="form"
          form={form}
          name="form"
          autoComplete="off"
          layout="vertical"
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Etiqueta Seguimiento
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataNotes?.Etiqueta_Seguimiento_txt}</Text>
                </div>
              </div>
            </div>

            {dataTable == null ? (
              <div className="col-12 col-md-6">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Resultado Contacto
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{dataNotes?.Resultado_de_Contacto_txt}</Text>
                  </div>
                </div>
              </div>
            ) : null}

            {itemsNotes[dataNote.Etiqueta_Seguimiento_id]
              ?.MotivoInasistencia ? (
              <div className="col-12 col-md-6">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Motivo de inasistencia
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{dataNotes?.Motivo_Inasistencia_txt}</Text>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="col-12 col-md-6">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Etiqueta Administrativa
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataNotes?.Etiqueta_Administrativa_txt}</Text>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-12">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontWeight: "bold", textAlign: "left" }}>
                  Nota Cambio Etiqueta Administrativa
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text>{dataNotes?.Nota_Cambio}</Text>
                </div>
              </div>
            </div>

            {itemsNotes[dataNote.Etiqueta_Seguimiento_id]?.PlanRutaAtención ? (
              <div className="col-12 col-md-6">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Plan/Ruta Atención
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{dataNotes?.Plan_Ruta_txt}</Text>
                  </div>
                </div>
              </div>
            ) : null}

            {itemsNotes[dataNote.Etiqueta_Seguimiento_id]?.Servicio ? (
              <div className="col-12 col-md-6">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Servicio
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{dataNotes?.Plan_Mensual_txt}</Text>
                  </div>
                </div>
              </div>
            ) : null}

            {itemsNotes[dataNote.Etiqueta_Seguimiento_id]
              ?.ObservacionSeguimiento ? (
              <div className="col-12 col-md-12">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold", textAlign: "left" }}>
                    Observación de Seguimiento
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text>{dataNotes?.Observacion_Seguimiento}</Text>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Form>
        {dataTable != null ? (
          <Table
            style={{ marginTop: "20px" }}
            columns={columns}
            loading={false}
            dataSource={dataTable}
            //scroll={{ x: 1300 }}
          />
        ) : null}
      </Modal>
    </>
  );
};
