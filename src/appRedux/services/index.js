import { httpClient } from "../../util/Api";

export const get_client = async () => {
  const token = localStorage.getItem("token");
  const id_client = localStorage.getItem("id_client");

  try {
    let query = encodeURI(
      `SELECT Url_Logo,Nombre,Num_Documento,Telefono,streetAddr1 FROM Cliente1 WHERE  id = ${id_client}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const values = data[0];
      return {
        logo: values[0],
        name: values[1],
        document: values[2],
        phone: values[3],
        address: values[4],
      };
    } else {
      return {};
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const list_professionals = async (documento, value) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      value?.nombre === undefined ||
        value?.nombre === "" ||
        value?.nombre === null
        ? `SELECT Nombre, Apellido,  Tipo_Documento_Txt,Numero_Documento , Celular, Profesion_Txt, id, Ultima_Actualizacion, R41839212 FROM Profesional Where Numero_Documento = ${documento} AND Tipo_Documento = ${value.tipo_doc}`
        : `SELECT Nombre, Apellido, Tipo_Documento_Txt,Numero_Documento , Celular, Profesion_Txt, id, Ultima_Actualizacion, R41839212 FROM Profesional Where name like ("%${value.nombre}%")`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=10&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => ({
        nombres: value[0],
        apellidos: value[1],
        tipo_documento: value[2],
        numero_documento: value[3],
        celular: value[4],
        profesion: value[5],
        id_professional: value[6],
        ultima_actualizacion: value[7],
        id: value[8],
      }));
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const list_documents = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Profesional&fieldName=Tipo_Documento&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListTypeAction = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Cambio_Ruta&fieldName=Tipo_Accion&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEstadosContratoPlan = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Contrato_Plan&fieldName=Estado&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListAsegurador = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Cliente1`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListProgramas = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Programa`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListSede = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM IPS_Afiliada`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const list_reason = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Agenda&fieldName=Motivo&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const list_schedule_type = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Agenda&fieldName=Tipo_Agenda&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const create_professional = async (values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Gomedisys_Profesional&TipoDocumento=${values?.tipo_documento}&NumeroDocumento=${values?.numero_documento}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const get_info_general_professional = async (id, isDocument = false) => {
  const token = localStorage.getItem("token");

  try {
    let query = encodeURI(
      isDocument
        ? `SELECT Nombre, Apellido, Tipo_Documento_Txt,Numero_Documento , Celular, Profesion_Txt,id, Rango_Propio FROM Profesional Where Numero_Documento = ${id}`
        : `SELECT Nombre, Apellido, Tipo_Documento_Txt,Numero_Documento , Celular, Profesion_Txt,id, Rango_Propio FROM Profesional Where id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        nombre: values[0],
        apellido: values[1],
        tipo_documento: values[2],
        numero_documento: values[3],
        celular: values[4],
        profesion: values[5],
        id: values[6],
        rango_propio: values[7],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getSedesProfessional = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name FROM Profesional_Sede WHERE R22922868 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=100&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => ({
        name: value[0],
      }));
      return final_data;
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getExamsProfessional = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Tipo_Examen_Txt FROM Profesional_Examen WHERE R22880409 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=100&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => ({
        Tipo_Examen_Txt: value[0],
      }));
      return final_data;
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListSedes = async (id) => {
  const token = localStorage.getItem("token");

  try {
    let query = encodeURI(
      ` SELECT name,Estado_txt,Id_Gomedisys,codeOffice,SedeTxt,Profesion FROM Profesional_Sede WHERE R22922868 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=100&query=${query}&sessionId=${token}&output=json`
    );
    console.log("data", data);
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => ({
        name: value[0],
        estado: value[1],
        id_gomedisys: value[2],
        codigo_oficina: value[3],
        sede: value[4],
        profesion: value[5],
      }));
      console.log("información del servicio", final_data);
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListNews = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Dias_Semana_txt FROM Agenda WHERE R20549543 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=100&query=${query}&sessionId=${token}&output=json`
    );
    console.log("data", data);
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => ({
        nombre: value[0],
        fecha_inicio: value[1],
        fecha_final: value[2],
        hora_inicio: value[3],
        hora_final: value[4],
        tipo_agenda: value[5],
        motivo: value[6],
        dias_semana: value[7],
      }));
      console.log("información del servicio", final_data);
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListExams = async (id) => {
  const token = localStorage.getItem("token");

  try {
    let query = encodeURI(
      `SELECT name,Tipo_Examen_Txt,Estado_txt FROM Profesional_Examen WHERE  R22880409 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=100&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => ({
        nombre: value[0],
        tipo_examen: value[1],
        estado: value[2],
      }));
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListDisposition = async (id) => {
  const token = localStorage.getItem("token");

  try {
    let query = encodeURI(
      `SELECT Fecha_Hora,Hora,GROUP_CONCAT(Nombre_Examen SEPARATOR ','),GROUP_CONCAT(Canal_Atencion_txt SEPARATOR '-') ,Duracion,Ciudad_txt, R16325243, Programa_txt,GROUP_CONCAT(id SEPARATOR ','),Disponible,Programa_txt,GROUP_CONCAT(R17614108 SEPARATOR ','),Color FROM Disponibilidad GROUP BY Duracion,Fecha_Hora,R16325243,Programa_txt,Ciudad_txt,Hora,Disponible,Color  HAVING R16325243 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=5000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => ({
        fecha_hora: value[0],
        hora: value[0],
        idExam: value[2],
        idSlot: value[6],
        canal_atencion: value[3],
        duracion: value[4],
        programa: value[7],
        ciudad: value[5],
        id: value[8],
        disponibilidad: value[9],
        separator: value[11],
        color: value[12],
      }));
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const updateDisposition = async (
  id,
  fecha_inicio,
  fecha_final,
  rango
) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Profesional&id=${id}&Fecha_Inicio=${fecha_inicio}&Fecha_Final=${fecha_final}&Rango_Propio=${rango}&sessionId=${token}&output=json`
    );
    if (data.status === "ok") {
      await executePreImg(id);
      const result = await httpClient.get(
        `/runTrigger?sessionId=${token}&id=${id}&triggerId=UjS7Y7fzTzmiWEUsdDcZjA&output=json`
      );
      console.log("retornar data");
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const executePreImg = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await httpClient.get(
      `/runTrigger?sessionId=${token}&id=${id}&triggerId=-85S8TEATxCjlCwNV9LU8A&output=json`
    );
    if (data.status === "ok") {
      const result = await httpClient.get(
        `/runTrigger?sessionId=${token}&id=${id}&triggerId=YYpZYn7fQDWLx3bsjcqYPw&output=json`
      );
      return result.data;
    }
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const createBlockDisposition = async (id, values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Agenda&Fecha_Inicio=${values?.fecha_inicio}&Fecha_Final=${values?.fecha_final}&Hora_Inicio=${values?.hora_inicio}&Hora_Final=${values?.hora_final}&Motivo=${values?.motivo}&Tipo_Agenda=${values?.tipo_novedad}&R20549543=${id}&R20666471=${values?.dia_semana}&sessionId=${token}&output=json`
    );
    console.log("valores de la data", data);
    // if (data?.status === "ok") {
    //   const infoTrigger = await TriggerBlockDisposition(id);
    //   console.log("infoTrigger", infoTrigger);
    // }
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const TriggerBlockDisposition = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/runTrigger?sessionId=${token}&id=${id}&triggerId=qaXdVHwHTJOvHw_DOY16BA&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const TriggerBeforeViewRoutes = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/runTrigger?sessionId=${token}&id=${id}&triggerId=Rw18Xi5ETlif-m8aAiGBCQ&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const TriggerLaboratoriesViewRoutes = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/runTrigger?sessionId=${token}&id=${id}&triggerId=B3qSga4iTjKnG4ynS8ZjeA&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProfessional = async (id, values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `updateRecord?output=json&objName=Profesional&id=${id}&Tipo_Documento=${values?.tipo_documento
      }&Numero_Documento=${values?.numero_documento}&Nombre=${values?.nombres
      }&Apellido=${values?.apellidos}&Celular=${values?.celular || ""}&email=${values?.email || ""
      }&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const TriggerUpdateProfessional = async (id, idProfRun) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/runTrigger?sessionId=${token}&id=${id}&triggerId=N7yboGaWSOCWMY8V83cUMw&output=json`
    );
    if (data.status === "ok") {
      const result = await httpClient.get(
        `/runTrigger?sessionId=${token}&id=${id}&triggerId=ILteAO_nRDm-hqXtqKYIOg&output=json`
      );
      const resultado = await httpClient.post(
        `rest/api/runAction?output=json&sessionId=${token}&objName=Profesional&id=${idProfRun}&actionId=GeJtoIj1QDa3phIpPMGFBw&output=json`
      );
    }
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getIdProfessional = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT id FROM Gomedisys_Profesional WHERE NumeroDocumento = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    console.log("información data", data);
    if (data.length > 0) {
      return data;
    } else {
      return Promise.reject(data);
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListMotivos = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `getPicklist?objName=Agenda&fieldName=Motivo&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data Motivos", data);
      const final_data = data.map((value) => ({
        value: value.id,
        label: value.name,
        code: value.code,
      }));
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const createAndDeleteBloqueoMotivo = async ({
  Fecha_Hora,
  Hora,
  Duracion,
  Id,
  IdProfesional,
  BloqueoEliminar,
  Fecha_Hora_Final,
}) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Agenda&Fecha_Inicio=${Fecha_Hora}&Fecha_Final=${Fecha_Hora_Final}&Hora_Inicio=${Hora}&Hora_Final=${Duracion}&Motivo=${Id}&Tipo_Agenda=${BloqueoEliminar}&R20549543=${IdProfesional}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listHistoricoBloqueos = async () => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Dias_Semana_txt  FROM Agenda`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          nombres: value[0],
          fecha_inicio: value[1],
          fecha_final: value[2],
          hora_inicio: value[3],
          hora_final: value[4],
          tipo_novedad: value[5],
          motivo: value[6],
          dias_semana: value[7],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const ViewContractsPlans = async (id) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT name,Primera_Vez,Estadio_txt,Sub_Programa,Meses,Profesion_txt,Clase_Examen_txt,Canales,Etiquetas_Asistenciales_txt,Etiquetas_Administrativas_txt,Sexo_al_Nacer_txt,Menor_de,Mayor_de,Duracion_1era_Visita,Duracion_Seguimiento,id FROM Contrato_Plan WHERE id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=2&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      console.log("información data", data);
      const final_data = {
        name: values[0],
        Primera_Vez: values[1],
        Estadio_txt: values[2],
        Sub_Programa: values[3],
        Meses: values[4],
        Profesion_txt: values[5],
        Clase_Examen_txt: values[6],
        Canales: values[7],
        Etiquetas_Asistenciales_txt: values[8],
        Etiquetas_Administrativas_txt: values[9],
        Sexo_al_Nacer_txt: values[10],
        Menor_de: values[11],
        Mayor_de: values[12],
        Duracion_1era_Visita: values[13],
        Duracion_Seguimiento: values[14],
        id: values[15],
      };
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getEditContractsPlans = async (id) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT name,Sexo_al_Nacer,Sexo_al_Nacer_txt,Meses,Mayor_de,Menor_de,Duracion_Seguimiento,Duracion_1era_Visita,Canal_Atencion_txt FROM Contrato_Plan WHERE id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=2&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      console.log("información data", data);
      const final_data = {
        name: values[0],
        Sexo_al_Nacer_id: values[1],
        Sexo_al_Nacer_txt: values[2],
        Meses: values[3],
        Mayor_de: values[4],
        Menor_de: values[5],
        Duracion_Seguimiento: values[6],
        Duracion_1era_Visita: values[7],
        Canales_ids: values[8] != null ? values[8].split(",").map(Number) : null
      };
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListContractsPlans = async () => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT name,Primera_Vez,Estadio_txt,Sub_Programa,Meses,Profesion_txt,Clase_Examen_txt,Canales,Etiquetas_Asistenciales_txt,Etiquetas_Administrativas_txt,Sexo_al_Nacer_txt,Menor_de,Mayor_de,Duracion_1era_Visita,Duracion_Seguimiento,Estado_txt,id,Sedes_txt,Clasificacion_Bomba_txt,Clasificacion_BT_txt,Tipo_Ingreso_txt,Prerrequisito FROM Contrato_Plan ORDER BY createdAt DESC`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          name: value[0],
          Primera_Vez: value[1],
          Estadio_txt: value[2],
          Sub_Programa: value[3],
          Meses: value[4],
          Profesion_txt: value[5],
          Clase_Examen_txt: value[6],
          Canales: value[7],
          Etiquetas_Asistenciales_txt: value[8],
          Etiquetas_Administrativas_txt: value[9],
          Sexo_al_Nacer_txt: value[10],
          Menor_de: value[11],
          Mayor_de: value[12],
          Duracion_1era_Visita: value[13],
          Duracion_Seguimiento: value[14],
          Estado_txt: value[15],
          id: value[16],
          Sedes_txt: value[17],
          Clasificacion_Bomba_txt: value[18],
          Clasificacion_BT_txt: value[19],
          Tipo_Ingreso_txt: value[20],
          Prerrequisito: value[21]
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListChangeHistory = async () => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT name,Tipo_Accion_txt,Contrato_Plan_txt,Filtro_Profesion, Meses,Renovacion,Mover_yyy_de, Mover_Mes_de,Mover_yyy_a,Mover_Mes_a,Filtro_Sede,Filtro_Programa  FROM Cambio_Ruta`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          name: value[0],
          Tipo_Accion_txt: value[1],
          Contrato_Plan_txt: value[2],
          Filtro_Profesion: value[3],
          Meses: value[4],
          Renovacion: value[5],
          Mover_yyy_de: value[6],
          Mover_Mes_de: value[7],
          Mover_yyy_a: value[8],
          Mover_Mes_a: value[9],
          Filtro_Sede: value[10],
          Filtro_Programa: value[11],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listProfessionals = async (name) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT name,id  FROM Profesional`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    console.log("información data", data);
    if (data.length > 0) {
      const final_data = data.map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return final_data;
    } else {
      return Promise.reject(data);
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listHistoricoBloqueosFiltrados = async (type, value) => {
  const token = localStorage.getItem("token");
  const filtros = {
    Profesional: `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Estado_txt FROM Agenda WHERE name like ("%${value.profesional}%")`,
    Motivo: `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Estado_txt FROM Agenda WHERE Motivo = ${value.motivo}`,
    Tipo_Novedad: `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Estado_txt FROM Agenda WHERE Tipo_Agenda = ${value.tipo_novedad}`,
    Profesional_Motivo: `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Estado_txt FROM Agenda WHERE name like ("%${value.profesional}%") AND Motivo = ${value.motivo}`,
    Profesional_Tipo: `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Estado_txt FROM Agenda WHERE name like ("%${value.profesional}%") AND Tipo_Agenda= ${value.tipo_novedad}`,
    Motivo_Tipo: `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Estado_txt FROM Agenda WHERE Tipo_Agenda = ${value.tipo_novedad} AND Motivo = ${value.motivo}`,
    Profesional_Motivo_Tipo: `SELECT name,Fecha_Inicio,Fecha_Final,Hora_Inicio,Hora_Final,Tipo_Novedad_Txt,Motivo_txt,Estado_txt FROM Agenda WHERE name like ("%${value.profesional}%") AND Motivo = ${value.motivo} AND Tipo_Agenda= ${value.tipo_novedad}`,
  };
  console.log("token guardado", token);
  try {
    let query = encodeURI(filtros[type]);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => ({
        nombres: value[0],
        fecha_inicio: value[1],
        fecha_final: value[2],
        hora_inicio: value[3],
        hora_final: value[4],
        tipo_novedad: value[5],
        motivo: value[6],
        estado: value[7],
      }));
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const list_patients = async (documento, value) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      value.nombre === undefined || value.nombre === "" || value.nombre === null
        ? `SELECT Nombre, Apellido, Tipo_Documento_Txt,Numero_Documento , Celular, TipoAfiliacion,NivelAfiliacion ,id FROM Candidato Where Numero_Documento = ${documento} AND Tipo_Documento = ${value.tipo_doc}`
        : `SELECT Nombre, Apellido, Tipo_Documento_Txt,Numero_Documento , Celular, TipoAfiliacion,NivelAfiliacion ,id FROM Candidato WHERE name like ("%${value.nombre}%")`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=10&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => ({
        nombres: value[0],
        apellidos: value[1],
        tipo_documento: value[2],
        numero_documento: value[3],
        celular: value[4],
        tipoAfiliacion: value[5],
        nivelAfiliacion: value[6],
        id: value[7],
      }));
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const createPatient = async (values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Gomedisys_Paciente&TipoDocumento=${values?.tipo_documento}&NumeroDocumento=${values?.numero_documento}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listDocumentsPatients = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Candidato&fieldName=Tipo_Documento&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfoGeneralPacient = async (id, isDocument = false) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Direccion,email,Ciudadtxt,Celular,Telefono FROM Candidato WHERE id= ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        Direccion: values[0],
        Email: values[1],
        Ciudad: values[2],
        Celular: values[3],
        Tel: values[4],
        id: values[5],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const updatePatient = async (id, values) => {
  const token = localStorage.getItem("token");
  const { data } = await httpClient
    .get(
      `updateRecord?output=json&objName=Candidato&id=${id}&Celular=${values?.celular}&Direccion=${values?.direccion}&email=${values?.email}&R15049289=${values?.ciudad}&Telefono=${values?.tel}&sessionId=${token}&output=json`
    )
    .then((response) => {
      console.log("resp ", response);
      return response;
    })
    .catch(async (error) => {
      console.log("error ", Promise.reject(error));
      return Promise.reject(error);
    });
  console.log("data ", data);
  //return data;
};

export const TriggerUpdatePatient = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const id_paciente = await getIdPatient(id);
    if (id_paciente) {
      const { data } = await httpClient.get(
        `/runTrigger?sessionId=${token}&id=${id_paciente}&triggerId=C2UOBr5VTTSGk7vNBWi9wA&output=json`
      );
      if (data.status === "ok") {
        const result = await httpClient.get(
          `/runTrigger?sessionId=${token}&id=${id_paciente}&triggerId=z61fdoyDR3aH90PgWltOHA&output=json`
        );
        if (result.data.status === "ok") {
          const resp = await httpClient.get(
            `/runTrigger?sessionId=${token}&id=${id_paciente}&triggerId=-h9qJU_FSeKyXtFUMxYXcA&output=json`
          );
          return resp.data;
        }
        return result.data;
      }
      return data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getIdPatient = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT id FROM Gomedisys_Paciente WHERE NumeroDocumento = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    console.log("información data", data);
    if (data.length > 0) {
      return data;
    } else {
      return Promise.reject(data);
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listDays = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT Nombre,id FROM Dia_Semana`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=7&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listCiudades = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT Nombre,id FROM Ciudad`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1300&query=${query}&sessionId=${token}&output=json`
    )
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    };
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListCanalAtencionfilter = async (canal) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id FROM Canal_Atencion WHERE id IN (${canal})`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1300&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListContratoSedesAsync = async (idContrato) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT R18621257,GROUP_CONCAT(R49002959 SEPARATOR ',') FROM Contrato_Sede WHERE R18621257 = ${idContrato} GROUP BY R18621257 `
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1300&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListSedesSies = async (idContrato) => {
  const token = localStorage.getItem("token");
  try {

    const dataCs = await getListContratoSedesAsync(idContrato);

    if(dataCs.length > 0){
      console.log("Datos: "+JSON.stringify(dataCs, null, 2));
      console.log("id Contrato: "+idContrato);
      let query = encodeURI(
        `SELECT id,name FROM IPS_Afiliada WHERE id IN(${dataCs[0].label})`
      );
      const { data } = await httpClient.get(
        `/selectQuery?maxRows=1300&query=${query}&sessionId=${token}&output=json`
      );
      if (data.length > 0) {
        const final_data = data.map((value) => {
          return { value: value[0], label: value[1] };
        });
        return final_data;
      } else {
        return [];
      }

    } else{
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListCanalAtencion = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Canal_Atencion`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1300&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListMotivoCancel = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Motivo`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1300&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListContrato = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name,R18147771 FROM Contrato`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1], idPrograma: value[2] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEspecialidad = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Profesion`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEspecialidadPertinencia = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT DISTINCT R45323002,Profesion_txt FROM Pertinencia_Administrativa`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListClaseExam = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Clase_Examen`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListClaseExamen = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT id,name FROM Clase_Examen WHERE R22497892 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1], duracion: value[2] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListClaseExamenPertinencia = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT DISTINCT R45225364,Clase_Examen_txt FROM Pertinencia_Administrativa WHERE R45323002 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEstadio = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Estadio`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListSubProgramas = async (id_Programa) => {
  const token = localStorage.getItem("token");
  try {
    let query = id_Programa !== null ? encodeURI(`SELECT id,name FROM Sub_Programas WHERE R45358267 = ${id_Programa}`) :
    encodeURI(`SELECT id,name FROM Sub_Programas`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListBomba = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Clasificacion_Bomba`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=3&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListBimTrim = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Clasificacion_Bim_Trim`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=3&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListTipoIngreso = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Tipo_Ingreso`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=10&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEtiquetasAdmin = async (idPrograma) => {
  const token = localStorage.getItem("token");
  try {
    let query = idPrograma !== null ? encodeURI(`SELECT id,name FROM Etiqueta_Administrativa1 WHERE Programa_txt LIKE ('%${idPrograma}%')`)
    : encodeURI(`SELECT id,name FROM Etiqueta_Administrativa1`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getlistSexoNacer = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Contrato_Plan&fieldName=Sexo_al_Nacer&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const list_documents_integ_pro = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Gomedisys_Profesional&fieldName=TipoDocumento&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const list_documents_integ_patient = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Gomedisys_Paciente&fieldName=TipoDocumento&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const get_info_general_patient = async (id, isDocument = false) => {
  const token = localStorage.getItem("token");
  const idPac = localStorage.getItem("idPaciente");
  if (id) {
    try {
      let query = encodeURI(
        isDocument
          ? `SELECT Nombre, Apellido, Tipo_Documento_Txt,Numero_Documento , Celular, Profesion_Txt,id, Rango_Propio FROM Profesional Where Numero_Documento = ${id}`
          : `SELECT Nombre, Apellido, Tipo_Documento_Txt, Numero_Documento, Celular, Telefono, email, Ciudadtxt, Genero_txt, Fecha_Nacimiento, Direccion, id FROM Candidato Where id = ${id === undefined ? idPac : id
          }`
      );
      const { data } = await httpClient.get(
        `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
      );
      if (data.length > 0) {
        let values = data[0];
        const fechaNacimiento = new Date(values[9]);
        const fechaActual = new Date();
        const diferenciaMilisegundos =
          fechaActual.getTime() - fechaNacimiento.getTime();
        const edad = Math.floor(
          diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25)
        );
        return {
          nombre: values[0],
          apellido: values[1],
          tipo_documento: values[2],
          numero_documento: values[3],
          celular: values[4],
          telefono: values[5],
          email: values[6],
          ciudad: values[7],
          genero: values[8],
          fechaNacimiento: values[9],
          direccion: values[10],
          id: values[11],
          edad: edad,
        };
      } else {
        return null;
      }
    } catch (error) {
      httpClient.defaults.headers.common["Authorization"] = "";
      return Promise.reject(error);
    }
  } else return null;
};

export const getPatientPreferences = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Llamar_Como, Ultima_Actualizacion,Horarios_Contacto_txt,Profesionales_txt,Persona_Autorizada_Contacto,Dispositivo_telemedicina_txt,Conexin_a_internet_txt, Canal_Envi_Confirmacion_txt, Horario_Sugerido_Contacto FROM Candidato Where id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        LlamarComo: values[0],
        UltimaActualizacion: values[1],
        FranjasHorarias: values[2],
        ProfesionalesNoDeseados: values[3],
        PersonaAutorizadaContacto: values[4],
        DispositivoTelemedicina: values[5],
        ConexionInternet: values[6],
        CanalEnviConfirmacion: values[7],
        HorarioSugeridoContacto: values[8],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listDispositivosTelemedicina = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Candidato&fieldName=Dispositivo_para_Telemedicina&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name, code: value.code };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listCanalEnvios = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Candidato&fieldName=Canal_Envi_Confirmacion&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name, code: value.code };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listConexionInternet = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/getPicklist?objName=Candidato&fieldName=Conexion_a_internet&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value.id, label: value.name, code: value.code };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listProfesionalesNoDeseados = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT name,id  FROM Profesional`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listHorariosContacto = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT name,id  FROM Franja`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=100&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfoPreferencesPacient = async (id, isDocument = false) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Llamar_Como, Ultima_Actualizacion,R40686379_txt,R40686349_txt,Persona_Autorizada_Contacto,Dispositivo_para_Telemedicina,Conexion_a_internet, Canal_Envi_Confirmacion, Horario_Sugerido_Contacto FROM Candidato Where id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      const listprofesionales =
        values[3] != null ? values[3].split(",").map(Number) : null;
      // const listHorarios =
      //   values[2] != null ? values[2].split(",").map(Number) : null;
      return {
        personaAuth: values[4],
        dispositivo: values[5],
        llamar: values[0],
        canal: values[7],
        conexion: values[6],
        profesionales: listprofesionales,
        horarios: Number(values[2]),
        HorarioSugeridoContacto: values[8],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfPacient = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT R40686379_txt FROM Candidato Where id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        R40686379_txt: values[0],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const updatePreferences = async (id, values, Json) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Candidato&id=${id}&R40686379=${values.horarios}&Horario_Sugerido_Contacto=${values.horario_contacto}&Llamar_Como=${values.llamar}&R40686349=${Json.profesionales}&Persona_Autorizada_Contacto=${values.personaAuth}&Dispositivo_para_Telemedicina=${Json.dispositivo}&Conexion_a_internet=${Json.conexion}&Canal_Envi_Confirmacion=${Json.canal}&sessionId=${token}&output=json`
    );
    if (data.status === "ok") {
      console.log("retornar data");
      return data;
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return error;
  }
};

export const updateEditPatientPreferences = async (id, values, Json) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/rest/api/updateRecord?output=json&objName=Candidato&id=${id}&R40686379=${values.horarios}&R40686349=${Json.profesionales}&sessionId=${token}&output=json`
    );
    if (data.status === "ok") {
      console.log("retornar data");
      return data;
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return error;
  }
};

export const getTagsCare = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Abandonado,Bimestralizado,Hospitalizado, Menor_Expuesto,Paciente_Gestante,TBC, Naive, Novo,Fallecido, Alta_del_Programa FROM Candidato Where id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        Abandonado: values[0],
        Bimestralizado: values[1],
        Hospitalizado: values[2],
        Menor_Expuesto: values[3],
        Paciente_Gestante: values[4],
        TBC: values[5],
        Naive: values[6],
        Novo: values[7],
        Fallecido: values[8],
        Alta_del_Programa: values[9],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getTagsAdministratives = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Fallecido_Pendiente_Soporte,Suspendido, Retirado,Entregado_asegurador,Terminacion_Contrato, NIPCC,Activo,NI,NICC FROM Candidato Where id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        Fallecido_Pendiente_Soporte: values[0],
        Suspendido: values[1],
        Retirado: values[2],
        Entregado_asegurador: values[3],
        Terminacion_Contrato: values[4],
        NIPCC: values[5],
        Activo: values[6],
        NI: values[7],
        NICC: values[8],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getAffiliationData = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT NivelAfiliacion,TipoAfiliacion,RegimenAfiliacion,Tipo_Ingreso_txt FROM Candidato WHERE id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        NivelAfiliacion: values[0],
        TipoAfiliacion: values[1],
        RegimenAfiliacion: values[2],
        tipoIngreso: values[3],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfoFilterNotes = async (type, value, id) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  const filtros = {
    Nada: `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt,Resultado_de_Contacto_txt, Observacion_Seguimiento, id, R40261931 FROM Notas_Administrativas WHERE R40261478 = ${id} ORDER BY Fecha_Etiqueta DESC`,
    Todo: `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt,Resultado_de_Contacto_txt, Observacion_Seguimiento, id, R40261931 FROM Notas_Administrativas WHERE R40261478 = ${id} AND R40261931 = ${value?.Etiqueta_seguimiento} AND R40263248 = ${value?.Resultado_contacto} AND Fecha_Etiqueta = ${value?.fecha_etiqueta} ORDER BY Fecha_Etiqueta DESC`,
    Fecha: `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt,Resultado_de_Contacto_txt, Observacion_Seguimiento, id, R40261931 FROM Notas_Administrativas WHERE R40261478 = ${id} AND Fecha_Etiqueta >= "${value?.fecha_etiqueta}" AND Fecha_Etiqueta <= "${value?.second_fecha}" ORDER BY Fecha_Etiqueta DESC`,
    Seguimiento: `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt,Resultado_de_Contacto_txt, Observacion_Seguimiento, id, R40261931 FROM Notas_Administrativas WHERE R40261478 = ${id} AND R40261931 = ${value?.Etiqueta_seguimiento} ORDER BY Fecha_Etiqueta DESC`,
    Contacto: `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt,Resultado_de_Contacto_txt, Observacion_Seguimiento, id, R40261931 FROM Notas_Administrativas WHERE R40261478 = ${id} AND R40263248 = ${value?.Resultado_contacto} ORDER BY Fecha_Etiqueta DESC`,
    Fecha_Seguimiento: `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt,Resultado_de_Contacto_txt, Observacion_Seguimiento, id, R40261931 FROM Notas_Administrativas WHERE R40261478 = ${id} AND R40261931 = ${value?.Etiqueta_seguimiento} AND Fecha_Etiqueta = ${value?.fecha_etiqueta} ORDER BY Fecha_Etiqueta DESC`,
    Fecha_Contacto: `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt,Resultado_de_Contacto_txt, Observacion_Seguimiento, id, R40261931 FROM Notas_Administrativas WHERE R40261478 = ${id} AND R40263248 = ${value?.Resultado_contacto} AND Fecha_Etiqueta = ${value?.fecha_etiqueta} ORDER BY Fecha_Etiqueta DESC`,
    Seguimiento_Contacto: `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt,Resultado_de_Contacto_txt, Observacion_Seguimiento, id, R40261931 FROM Notas_Administrativas WHERE R40261478 = ${id} AND R40263248 = ${value?.Resultado_contacto} AND R40261931 = ${value?.Etiqueta_seguimiento} ORDER BY Fecha_Etiqueta DESC`,
  };
  try {
    let query = encodeURI(filtros[type]);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          Fecha_Etiqueta: value[0],
          Etiqueta_Seguimiento_txt: value[1],
          Resultado_de_Contacto_txt: value[2],
          Observacion_Seguimiento: value[3],
          Id: value[4],
          Etiqueta_Seguimiento_id: value[5],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfoFilterContratPlans = async (final_values) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  let query = `SELECT name,Primera_Vez,Estadio_txt,Sub_Programa,Meses,Profesion_txt,Clase_Examen_txt,Canales,Etiquetas_Asistenciales_txt,Etiquetas_Administrativas_txt,Sexo_al_Nacer_txt,Menor_de,Mayor_de,Duracion_1era_Visita,Duracion_Seguimiento,Estado_txt,id,Sedes_txt,Clasificacion_Bomba_txt,Clasificacion_BT_txt,Tipo_Ingreso_txt,Prerrequisito FROM Contrato_Plan`;
  try {
    if (final_values) {
      if (
        final_values.estadio !== undefined ||
        final_values.contrato !== undefined ||
        final_values.profesion !== undefined ||
        final_values.claseExamen !== undefined ||
        final_values.subPrograma !== undefined ||
        final_values.etAsistencial !== undefined ||
        final_values.etAdmin !== undefined ||
        final_values.sede !== undefined ||
        final_values.state !== undefined ||
        final_values.tpIngreso !== undefined ||
        final_values.clsBimTrim !== undefined ||
        final_values.genero !== undefined ||
        final_values.bomba !== undefined ||
        final_values.cnlAtencion !== undefined 
      ) {
        query += ` WHERE`;
        if (final_values.estadio) {
          query += ` R19917234 = ${final_values.estadio}`;
        }
        if (final_values.contrato) {
          query +=
            final_values.estadio != undefined
              ? ` AND R18147928 = ${final_values.contrato}`
              : ` R18147928 = ${final_values.contrato}`;
        }
        if (final_values.profesion) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined
              ? ` AND R18147953 = ${final_values.profesion}`
              : ` R18147953 = ${final_values.profesion}`;
        }
        if (final_values.claseExamen) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined
              ? ` AND R42695674 = ${final_values.claseExamen}`
              : ` R42695674 = ${final_values.claseExamen}`;
        }
        if (final_values.subPrograma) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined 
              ? ` AND R45397404 = ${final_values.subPrograma}`
              : ` R45397404 = ${final_values.subPrograma}`;
        }
        if (final_values.etAsistencial) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined 
              ? ` AND R45397437 = ${final_values.etAsistencial}`
              : ` R45397437 = ${final_values.etAsistencial}`;
        }
        if (final_values.etAdmin) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined ||
              final_values.etAsistencial != undefined
              ? ` AND Etiquetas_Admin_Ids LIKE('%${final_values.etAdmin}%')`
              : ` Etiquetas_Admin_Ids LIKE('%${final_values.etAdmin}%')`;
        }
        if (final_values.sede) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined ||
              final_values.etAsistencial != undefined ||
              final_values.etAdmin != undefined
              ? ` AND CadenasIdsSedes LIKE('%${final_values.sede}%')`
              : ` CadenasIdsSedes LIKE('%${final_values.sede}%')`;
        }
        if (final_values.state) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined ||
              final_values.etAsistencial != undefined ||
              final_values.etAdmin != undefined  ||
              final_values.sede != undefined
              ? ` AND Estado = ${final_values.state}`
              : ` Estado = ${final_values.state}`;
        }
        if (final_values.tpIngreso) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined ||
              final_values.etAsistencial != undefined ||
              final_values.etAdmin != undefined  ||
              final_values.sede != undefined ||
              final_values.state != undefined
              ? ` AND R47918753 = ${final_values.tpIngreso}`
              : ` R47918753 = ${final_values.tpIngreso}`;
        }
        if (final_values.clsBimTrim) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined ||
              final_values.etAsistencial != undefined ||
              final_values.etAdmin != undefined  ||
              final_values.sede != undefined ||
              final_values.state != undefined ||
              final_values.tpIngreso != undefined
              ? ` AND R47939308 = ${final_values.clsBimTrim}`
              : ` R47939308 = ${final_values.clsBimTrim}`;
        }
        if (final_values.genero) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined ||
              final_values.etAsistencial != undefined ||
              final_values.etAdmin != undefined  ||
              final_values.sede != undefined ||
              final_values.state != undefined ||
              final_values.tpIngreso != undefined ||
              final_values.clsBimTrim != undefined
              ? ` AND Sexo_al_Nacer = ${final_values.genero}`
              : ` Sexo_al_Nacer = ${final_values.genero}`;
        }
        if (final_values.bomba) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined ||
              final_values.etAsistencial != undefined ||
              final_values.etAdmin != undefined  ||
              final_values.sede != undefined ||
              final_values.state != undefined ||
              final_values.tpIngreso != undefined ||
              final_values.clsBimTrim != undefined ||
              final_values.genero != undefined 
              ? ` AND R47939456 = ${final_values.bomba}`
              : ` R47939456 = ${final_values.bomba}`;
        }
        if (final_values.cnlAtencion) {
          query +=
            final_values.estadio != undefined ||
              final_values.contrato != undefined ||
              final_values.profesion != undefined ||
              final_values.claseExamen != undefined ||
              final_values.subPrograma != undefined ||
              final_values.etAsistencial != undefined ||
              final_values.etAdmin != undefined  ||
              final_values.sede != undefined ||
              final_values.state != undefined ||
              final_values.tpIngreso != undefined ||
              final_values.clsBimTrim != undefined ||
              final_values.genero != undefined  ||
              final_values.bomba != undefined
              ? ` AND R47939456 = ${final_values.cnlAtencion}`
              : ` R47939456 = ${final_values.cnlAtencion}`;
        }
      }
    }
    let querys = encodeURI(query);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${querys}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          name: value[0],
          Primera_Vez: value[1],
          Estadio_txt: value[2],
          Sub_Programa: value[3],
          Meses: value[4],
          Profesion_txt: value[5],
          Clase_Examen_txt: value[6],
          Canales: value[7],
          Etiquetas_Asistenciales_txt: value[8],
          Etiquetas_Administrativas_txt: value[9],
          Sexo_al_Nacer_txt: value[10],
          Menor_de: value[11],
          Mayor_de: value[12],
          Duracion_1era_Visita: value[13],
          Duracion_Seguimiento: value[14],
          Estado_txt: value[15],
          id: value[16],
          Sedes_txt: value[17],
          Clasificacion_Bomba_txt: value[18],
          Clasificacion_BT_txt: value[19],
          Tipo_Ingreso_txt: value[20],
          Prerrequisito: value[21]
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfoFilterChangesRoutes = async (final_values) => {
  //console.log(values?.fecha?.format("YYYY/MM/DD"));
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  let query = `SELECT name,Tipo_Accion_txt,Contrato_Plan_txt,Filtro_Profesion, Meses,Renovacion,Mover_yyy_de, Mover_Mes_de,Mover_yyy_a,Mover_Mes_a,Filtro_Sede,Filtro_Programa FROM Cambio_Ruta`;
  try {
    if (final_values) {
      if (
        final_values.tipoAccion !== undefined ||
        final_values.asegurador !== undefined ||
        final_values.programas !== undefined ||
        final_values.sede !== undefined ||
        final_values.profesion !== undefined ||
        final_values.fecha !== undefined ||
        final_values.mesDe !== undefined ||
        final_values.mesA !== undefined
      ) {
        query += ` WHERE`;
        if (final_values.tipoAccion) {
          query += ` Tipo_Accion = ${final_values.tipoAccion}`;
        }
        if (final_values.asegurador) {
          query +=
            final_values.tipoAccion != undefined
              ? ` AND Filtro_Asegurador = ${final_values.asegurador}`
              : ` Filtro_Asegurador = ${final_values.asegurador}`;
        }
        if (final_values.programas) {
          query +=
            final_values.tipoAccion != undefined ||
              final_values.asegurador != undefined
              ? ` AND Filtro_Programa = ${final_values.programas}`
              : ` Filtro_Programa = ${final_values.programas}`;
        }
        if (final_values.sede) {
          query +=
            final_values.tipoAccion != undefined ||
              final_values.asegurador != undefined ||
              final_values.programas != undefined
              ? ` AND Filtro_Sede = ${final_values.sede}`
              : ` Filtro_Sede = ${final_values.sede}`;
        }
        if (final_values.profesion) {
          query +=
            final_values.tipoAccion != undefined ||
              final_values.asegurador != undefined ||
              final_values.programas != undefined ||
              final_values.sede != undefined
              ? ` AND Filtro_Profesion = ${final_values.profesion}`
              : ` Filtro_Profesion = ${final_values.profesion}`;
        }
        if (final_values.fecha) {
          const date = final_values.fecha?.format("YYYY/MM/DD");
          query +=
            final_values.tipoAccion != undefined ||
              final_values.asegurador != undefined ||
              final_values.programas != undefined ||
              final_values.sede != undefined ||
              final_values.profesion != undefined
              ? ` AND Fecha = ${date}`
              : ` Fecha = ${date}`;
        }
        if (final_values.mesDe) {
          query +=
            final_values.tipoAccion != undefined ||
              final_values.asegurador != undefined ||
              final_values.programas != undefined ||
              final_values.sede != undefined ||
              final_values.profesion != undefined ||
              final_values.fecha != undefined
              ? ` AND Mover_Mes_de = ${final_values.mesDe}`
              : ` Mover_Mes_de = ${final_values.mesDe}`;
        }
        if (final_values.mesA) {
          query +=
            final_values.tipoAccion != undefined ||
              final_values.asegurador != undefined ||
              final_values.programas != undefined ||
              final_values.sede != undefined ||
              final_values.profesion != undefined ||
              final_values.fecha != undefined ||
              final_values.mesDe != undefined
              ? ` AND Mover_Mes_a = ${final_values.mesA}`
              : ` Mover_Mes_a = ${final_values.mesA}`;
        }
      }
    }
    let querys = encodeURI(query);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${querys}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          name: value[0],
          Tipo_Accion_txt: value[1],
          Contrato_Plan_txt: value[2],
          Filtro_Profesion: value[3],
          Meses: value[4],
          Renovacion: value[5],
          Mover_yyy_de: value[6],
          Mover_Mes_de: value[7],
          Mover_yyy_a: value[8],
          Mover_Mes_a: value[9],
          Filtro_Sede: value[10],
          Filtro_Programa: value[11],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEtiquetaSeguimiento = async (radio) => {
  const idSeguimiento = radio == 1 ? 40414474 : 40262982;
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id FROM Etiqueta_Seguimiento WHERE id != ${idSeguimiento}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEtiquetaSeguimientoForProgram = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id FROM Etiqueta_Seguimiento WHERE Programa_txt LIKE ('%${id}%')`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListHorarioAgendamiento = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT name,id FROM Franja`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListResultadoContacto = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name, id FROM Resultado_Contacto WHERE Etiquetas_Seguimiento_txt LIKE ("%${id}%")`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListResultadoContactoForProgram = async (id, idProgram) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name, id FROM Resultado_Contacto WHERE Etiquetas_Seguimiento_txt LIKE ("%${id}%") AND Programa_txt LIKE ('%${idProgram}%')`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListResultadoContactoQuotes = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT name, id FROM Resultado_Contacto`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListPlanesMensualesWithID = async (id, valores) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT id,name,R18387304 FROM Plan_Mensual WHERE R18387241 = ${id} AND Mes= ${valores?.mes
      } AND Year = ${valores?.ano?.format("YYYY")}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1], idProfesion: value[2] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListProfesionalesWithProfesion = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT id,name FROM Profesional WHERE R15450619 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEtiquetaAdministrativa = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT name,id  FROM Etiqueta_Administrativa1`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};
export const getListEtAsistencial = async () => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT id,name FROM Etiqueta_Asistencial`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListEtiquetaAdministrativaForProgram = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id FROM Etiqueta_Administrativa1 WHERE Programa_txt LIKE ('%${id}%')`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListMotivoInasistencia = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id  FROM  Motivo_Inasistencia WHERE R40263888 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListMotivoInasistenciaForProgram = async (id, idProgram) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id FROM Motivo_Inasistencia WHERE R40263888 = ${id} AND Programa_txt LIKE ('%${idProgram}%')`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListPlanRutaAtencion = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT name,id  FROM  Plan WHERE R18387076 = ${id}`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListServicio = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id  FROM  Plan_Mensual WHERE R18387241 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListServicioXMonth = async (id, month, ano) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id  FROM  Plan_Mensual WHERE R18387241 = ${id} AND Mes = ${month} AND Year = ${ano}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getConsulta = async (doc) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT id,Cambio FROM Gomedisys_Novedad WHERE Informado = 0`
    );
    //AND Num_Doc_Paciente = ${doc}
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { id: value[0], cambio: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getConsultaProfessionals = async (doc) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=SELECT dateEnd FROM Parametro&sessionId=${token}&output=json`
    );
    console.log(data);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const dateBegin = `${year}-${month}-${day} ${hours}:${minutes}`;
    if (data[0][0]) {
      let query = encodeURI(
        `SELECT WS_Response,NumeroDocumento,dateBegin,dateEnd FROM Integracion_Slot GROUP BY WS_Response,NumeroDocumento,dateBegin,dateEnd HAVING WS_Response LIKE("%ERROR%") AND NumeroDocumento = ${doc} AND dateBegin > "${dateBegin}" AND dateEnd = "${data[0][0]}"`
      );
      const result = await httpClient.get(
        `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
      );
      console.log(result);
      //return result.data;
      if (result.data.length > 0) {
        const final_data = result.data.map((value) => {
          return {
            WS_Response: value[0],
            NumeroDocumento: value[1],
            dateBegin: value[2],
            dateEnd: value[3],
          };
        });
        console.log("Final: ", final_data);
        return final_data;
      } else {
        return [];
      }
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const actualizarRegistroNovedadInformado = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Gomedisys_Novedad&id=${id}&Informado=1&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const inactivarContratoPlan = async (id,idEstado) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&useIds=true&objName=Contrato_Plan&id=${id}&Estado=${idEstado}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const actualizarFiltrosPlanesXProfesionales = async (json) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Plan_Mensual&id=${json?.plan}&Aplicar_Profesional_Deseado=true&R44772587=${json?.profesional}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const cancelarCita = async (json) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Consulta&id=${json?.idCita}&R24095077=${json?.Motivo}&Observacin_Cancelacin=${json?.TexA}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const createNotes = async (id, values, json) => {
  const token = localStorage.getItem("token");
  const idPac = localStorage.getItem("idPaciente");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Notas_Administrativas&R40261478=${id === undefined ? idPac : id
      }&R40261931=${values?.Etiqueta_seguimiento}&R40263248=${values?.Resultado_contacto
      }&R40414475=${json?.Servicios}&R40263239=${values?.Motivo_inasistencia
      }&R41388823=${values?.Etiqueta_administrativa}&Observacion_Seguimiento=${json?.Observacion_seguimiento
      }&Nota_Cambio=${json?.Nota_cambio_etiqueta_administrativa
      }&Plan_Ruta_txt=${json?.Plan_Ruta_txt}&Tabla_Resultados=${values?.Tabla_Resultados
      }&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const createPlanContract = async (values) => {
  const token = localStorage.getItem("token");
  console.log('llega al servicio');
  try {
    const { data } = await httpClient.get(`/create2?output=json&useIds=true&objName=Contrato_Plan&R18147928=${values?.contrato
    }&R18147953=${values?.especialidad
    }&R42695674=${values?.claseExamen || 0
    }&R19917234=${values?.estadio
    }&R42695687=${values?.canalAtencion?.join("|")
    }&Meses=${values?.meses
    }&Renovacion=${values?.meses
    }&Duracion_1era_Visita=${values?.firstDuracion
    }&Duracion_Seguimiento=${values?.duracionSeg
    }&Mayor_de=${values?.mayor
    }&Menor_de=${values?.menor
    }&R44803067=${values?.etAdmin?.join("|")
    }&R45397437=${values?.etAsitenciales
    }&R45397404=${values?.subPrograma || 0
    }&Sexo_al_Nacer=${values?.sexoNacer
    }&Primera_Vez=${values?.primeraVez || false
    }&Prerrequisito=${values?.Prerrq || false
    }&R47939456=${values?.cBomba
    }&R47939308=${values?.cBimTrim
    }&R47918753=${values?.tIngreso
    }&R48813645=${values?.sedesSies?.join("|")
    }&sessionId=${token}&output=json`)
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const handleGenerateChanges = async (values) => {
  switch (values.Tipo_Accion) {
    case 41346129:
      addContractPlan(values);
      break;
    case 41561613:
      addContractPlan2(values);
      break;
    case 41381695:
      addContractPlan3(values);
      break;
  }
};

export const addContractPlan = async (values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Cambio_Ruta&Tipo_Accion=${values?.tipoAccion
      }&R41349167=${values?.contrato}&R41346608 =${values?.especialidad
      }&R45175661=${values?.claseExamen}&R41346618=${values?.estadio
      }&R45175677=${values?.canalAtencion}&Meses=${values?.meses?.join(
        ","
      )}&Renovacion=${values?.mesesRenovacion?.join(
        ","
      )}&Duracion_1era_Visita=${values?.firstDuracion}&Duracion_Seguimiento=${values?.duracionSeg
      }&Mayor_de=${values?.mayor}&Menor_de=${values?.menor}&Abandonado=${values?.abandonado === 1
      }&Hospitalizado=${values?.hospitalizado === 1}&Naive=${values?.naive === 1
      }&Paciente_Gestante=${values?.PacienteG === 1}&Tuberculosis=${values?.tuberculosis === 1
      }&Primera_Vez=${values?.primeraVez === 1}&Bimestralizado=${values?.bimestralizado === 1
      }&Menor_Expuesto=${values?.menorExpuesto === 1}&Novo=${values?.novo === 1
      }&TBC=${values?.tbc === 1}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const addContractPlan2 = async (values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Cambio_Ruta&Tipo_Accion=${values?.tipoAccion
      }&Filtro_Asegurador=${values?.filtroAsegurador}&Filtro_Programa=${values?.filtroPrograma
      }&Filtro_Estadio=${values?.filtroEstadio}&Filtro_Sede=${values?.filtroSede
      }&Filtro_Profesion=${values?.filtroEspecialidad}&R45175661=${values?.claseExamen
      }&R45175677=${values?.canalAtencion?.join(
        "|"
      )}&Meses=${values?.meses?.join(",")}&Mover_yyy_de=${values?.anos?.format(
        "YYYY"
      )}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const addContractPlan3 = async (values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Cambio_Ruta&Tipo_Accion=${values?.tipoAccion
      }&Filtro_Asegurador=${values?.filtroAsegurador}&Filtro_Programa=${values?.filtroPrograma
      }&Filtro_Estadio=${values?.filtroEstadio}&Filtro_Sede=${values?.filtroSede
      }&Filtro_Profesion=${values?.filtroEspecialidad
      }&Mover_yyy_de=${values?.moverAnoDe?.format(
        "YYYY"
      )}&Mover_yyy_a=${values?.moverAñoA?.format("YYYY")}&Mover_Mes_de=${values?.moverMesDe
      }&Mover_Mes_a=${values?.moverMesA}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const updatePlanContract = async (id, values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&useIds=true&objName=Contrato_Plan&id=${id}&R42695687=${values?.canalAtencion?.join("|")
      }&Sexo_al_Nacer=${values?.Sexo_al_Nacer_txt}&Meses=${values?.meses
      }&Renovacion=${values?.meses
      }&Mayor_de=${values?.mayor}&Menor_de=${values?.menor
      }&Duracion_1era_Visita=${values?.firstDuracion}&Duracion_Seguimiento=${values?.duracionSeg
      }&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const createPertinencia = async (id, values) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Plan_Mensual&R18387304=${values?.profesion
      }&R42695739=${values?.claseExamen}&R20664485=${values?.canales?.join(
        "|"
      )}&R18387241=${id}&Mes=${values?.mes}&Year=${values?.ano?.format(
        "YYYY"
      )}&Duracion_Min=${values?.duracion == null ? 0 : values?.duracion
      }&Origen=Pertinencia Administrativa&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const createNotesForm2 = async (id, values, json) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/create2?output=json&useIds=true&objName=Notas_Administrativas&R40261478=${id}&R40261931=${values?.Etiqueta_seguimiento}&R40263239=${values?.Motivo_inasistencia}&R41388823=${values?.Etiqueta_administrativa}&Observacion_Seguimiento=${json?.Observacion_seguimiento}&Nota_Cambio=${json?.Nota_cambio_etiqueta_administrativa}&Plan_Ruta_txt=${json?.Plan_Ruta_txt}&Tabla_Resultados=${values?.Tabla_Resultados}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfoNotes = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Fecha_Etiqueta,Etiqueta_Seguimiento_txt, Resultado_de_Contacto_txt, Motivo_Inasistencia_txt, Etiqueta_Administrativa_txt,Plan_Ruta_txt,Plan_Mensual_txt,Nota_Cambio,Observacion_Seguimiento,Tabla_Resultados FROM Notas_Administrativas WHERE id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        Fecha_Etiqueta: values[0],
        Etiqueta_Seguimiento_txt: values[1],
        Resultado_de_Contacto_txt: values[2],
        Motivo_Inasistencia_txt: values[3],
        Etiqueta_Administrativa_txt: values[4],
        Plan_Ruta_txt: values[5],
        Plan_Mensual_txt: values[6],
        Nota_Cambio: values[7],
        Observacion_Seguimiento: values[8],
        Tabla_Resultados: values[9],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfoQuote = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,Secuencia,Fecha_Cita,Canal_Atencion_txt,Ciudad_Txt,Sedetxt,codeOffice,Codigo_Tipo,Paciente_txt,Plan_Mensual_txt,Especialidad_txt,Profesional_txt,Importado,nameExam,Estado_Txt,Motivo_Cancelacin_txt,Observacin_Cancelacin FROM Consulta WHERE id = ${id} ORDER BY Fecha_Cita DESC`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        name: values[0],
        Secuencia: values[1],
        Fecha_Cita: values[2],
        Canal_Atencion_txt: values[3],
        Ciudad_Txt: values[4],
        Sedetxt: values[5],
        codeOffice: values[6],
        Codigo_Tipo: values[7],
        Paciente_txt: values[8],
        Plan_Mensual_txt: values[9],
        Especialidad_txt: values[10],
        Profesional_txt: values[11],
        Importado: values[12],
        nameExam: values[13],
        Estado_Txt: values[14],
        Motivo_Cancelacin_txt: values[15],
        Observacin_Cancelacin: values[16],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getCitasRemisiones = async (id, idcita) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,Fecha_Cita, MesRemision, Estado_txt,Especialidad_txt,CanalRemision,Remitente_txt,Resultado FROM Cita_Remision WHERE R24483667 = ${id} AND R24229378 = ${idcita}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=10000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        name: values[0],
        Fecha_Cita: values[1],
        MesRemision: values[2],
        Estado_txt: values[3],
        Especialidad_txt: values[4],
        CanalRemision: values[5],
        Remitente_txt: values[6],
        Resultado: values[7],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListAllResultadoContacto = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT name, id FROM Resultado_Contacto`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getCareRoutes = async (id) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT name,Ciudad_txt,Estadio_txt,Fecha_Activacion,Renovacion,Primera_Vez,Programa_txt,Sub_Programa_txt,Estado_txt,id FROM Plan WHERE R18387076 = ${id} ORDER BY status ASC`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          contrato_sede: value[0],
          ciudad: value[1],
          estadio: value[2],
          fecha_activacion: value[3],
          renovacion: value[4],
          primera_vez: value[5],
          programa: value[6],
          Sub_Programa_txt: value[7],
          estado: value[8],
          id: value[9],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getAtributesGenerateNote = async (id) => {
  const token = localStorage.getItem("token");
  const idPac = localStorage.getItem("idPaciente");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT id_Etiqueta_Amin_Actual, Etiqueta_Amin_Actual, id_Etiqueta_Asistencial_Actual,Etiqueta_Asistencial_Actual FROM Candidato WHERE id = ${id === undefined ? idPac : id
      }`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);

      return {
        id_Etiqueta_Amin_Actual: data[0][0],
        Etiqueta_Amin_Actual: data[0][1],
        id_Etiqueta_Asistencial_Actual: data[0][2],
        Etiqueta_Asistencial_Actual: data[0][3],
      };
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getViewDetailPlans = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT createdAt,Fecha_Inscripcion,Fecha_Activacion,Fecha_Renovacion,Sub_Programa_txt,Renovacion,Programa_txt,Sede_txt,Ciudad_txt,Estadio_txt,Contrato_Plan_Gomedisys_txt,Primera_Vez,Estado_txt,R25170505,Contrato_Gomedisys_txt,R45912497,Etiqueta_Asistencial_txt,R45912488,Etiqueta_Administrativa_txt,Clasificacion_BT_txt,Clasificacion_Bomba_txt FROM Plan WHERE id=${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        creado: values[0],
        fecha_inscripcion: values[1],
        fecha_activacion: values[2],
        fecha_renovacion: values[3],
        Sub_Programa_txt: values[4],
        renovacion: values[5],
        programa: values[6],
        Sede_txt: values[7],
        ciudad: values[8],
        estadio: values[9],
        contrato_plan: values[10],
        primera_vez: values[11],
        Estado_txt: values[12],
        idPrograma: values[13],
        contratoGomedisys: values[14],
        idEtAsistencial: values[15],
        nameEtAsistencial: values[16],
        idEtAdmin: values[17],
        nameEtAdmin: values[18],
        csBT: values[19],
        csBomba: values[20],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const Pertinencia_Administrativa = async (id, values) => {
  const token = localStorage.getItem("token");
  let query = `SELECT id,name,Duracion FROM Pertinencia_Administrativa WHERE R45225326 = ${id} AND R45225364 = ${values.claseExamen} `;
  if (values.canales) {
    if (values.canales.length > 1) {
      values.canales.forEach((item) => {
        query += `AND Canal_Atencion_txt LIKE('%${item}%') `;
      });
    } else {
      query += `AND Canal_Atencion_txt = ${values.canales[0]}`;
    }
  }
  try {
    const final = encodeURI(query);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${final}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      let values = data[0];
      return {
        id: values[0],
        name: values[1],
        Duracion: values[2],
      };
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getFlagsQuotes = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT id, name, Estado_Txt FROM Consulta WHERE R18590121 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { id: value[0], name: value[1], Estado_Txt: value[2] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getNotesAdminTable = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Fecha_Etiqueta,Tabla_Resultados FROM Notas_Administrativas WHERE Ids_Plan_Mensual_txt LIKE("%${id}%") ORDER BY Fecha_Etiqueta DESC`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return {
          Fecha_Etiqueta: value[0],
          Tabla_Resultados: value[1],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getInfPlans = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT GROUP_CONCAT(Canal_Atencion_txt SEPARATOR ','),GROUP_CONCAT(Origen SEPARATOR ','),GROUP_CONCAT(Disentido SEPARATOR ','),GROUP_CONCAT(Pendiente SEPARATOR ','),GROUP_CONCAT(Tercerizado SEPARATOR ','),GROUP_CONCAT(Examen_txt SEPARATOR ','),GROUP_CONCAT(Duracion_Min SEPARATOR ','),Year,Mes,GROUP_CONCAT(id SEPARATOR ','),GROUP_CONCAT(Notas_Administrativas_txt SEPARATOR ','),GROUP_CONCAT(name SEPARATOR ','),GROUP_CONCAT(Canales_Iniciales SEPARATOR '-'),GROUP_CONCAT(Canal_Atencion_IdString SEPARATOR '-'),GROUP_CONCAT(Prerrequisito SEPARATOR ',') FROM Plan_Mensual WHERE R18387241 = ${id} GROUP BY Year,Mes ORDER BY Year,Mes ASC`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((item) => {
        const valuesLength = item[0].split(",").length;
        const group = [];
        for (let i = 0; i < valuesLength; i++) {
          const obj = {
            Canal_Atencion_txt: item[0].split(",")[i].trim(),
            Origen: item[1].split(",")[i].trim(),
            Disentido: item[2].split(",")[i].trim(),
            Pendiente: item[3].split(",")[i].trim(),
            Tercerizado: item[4].split(",")[i].trim(),
            Examen_txt: item[5].split(",")[i].trim(),
            Duracion_Min: item[6].split(",")[i].trim(),
            Year: item[7],
            Mes: item[8],
            //Cita: item[9].split(",")[i].trim(),
            Id: item[9].split(",")[i].trim(),
            Notas_Administrativas_txt: item[10]?.split(",")[i].trim(),
            Name: item[11]?.split(",")[i].trim(),
            Canales_Iniciales: item[12]?.split("-")[i].trim(),
            Canal_Atencion_IdString: item[13]?.split("-")[i].trim(),
            Prerrequisito: item[14].split(",")[i].trim(),
          };

          group.push(obj);
        }

        return group;
      });
      return final_data;
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListQuotes = async () => {
  const token = localStorage.getItem("token");
  const idPac = localStorage.getItem("idPaciente");
  try {
    let query = encodeURI(
      `SELECT GROUP_CONCAT( id SEPARATOR ','),GROUP_CONCAT( nameExam SEPARATOR ','),GROUP_CONCAT( Fecha_Cita SEPARATOR ','),GROUP_CONCAT( Profesional_txt SEPARATOR ','),GROUP_CONCAT( Canal_Atencion_txt SEPARATOR ','),Fecha_txt  FROM Consulta WHERE R15590447 = ${idPac} AND status = 18100663 GROUP BY Fecha_txt`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((item) => {
        const valuesLength = item[0].split(",").length;
        const group = [];
        for (let i = 0; i < valuesLength; i++) {
          const obj = {
            id: item[0].split(",")[i].trim(),
            nameExam: item[1].split(",")[i].trim(),
            Fecha_Cita: item[2].split(",")[i].trim(),
            Profesional_txt: item[3].split(",")[i].trim(),
            Canal_Atencion_txt: item[4].split(",")[i].trim(),
            Fecha_txt: item[5],
          };
          group.push(obj);
        }

        return group;
      });
      return final_data;
    } else {
      return null;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListExam = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT Tipo_Examen_Txt, idExamen FROM Profesional_Examen WHERE  R22880409 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListCitysProfessionals = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name,id FROM Profesional_Sede WHERE R22922868 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const identificarPlanesM = async (id, json) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT name, id, id_citas FROM Plan_Mensual WHERE R18387241 = ${id} AND Mes = ${json?.mes} AND Year = ${json?.ano}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[1], label: value[0], extra: value[2] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListPrograma = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT R42507491,Programa_txt FROM Profesional_Examen WHERE R22880409 = ${id} GROUP BY R42507491,Programa_txt `
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListDispositionFilters = async (final_values, id) => {
  const token = localStorage.getItem("token");
  console.log("values: ", final_values);
  let query = `SELECT Fecha_Hora, Hora, GROUP_CONCAT(Nombre_Examen SEPARATOR ','), GROUP_CONCAT(DISTINCT Canal_Atencion_txt SEPARATOR '-'), Duracion, Ciudad_txt, R16325243, GROUP_CONCAT(id SEPARATOR ','), Disponible, GROUP_CONCAT(DISTINCT Programa_txt SEPARATOR '-'), GROUP_CONCAT(R17614108 SEPARATOR ','), Color FROM Disponibilidad`;
  if (final_values) {
    if (
      final_values.date_start !== undefined ||
      final_values.date_end !== undefined ||
      final_values.exam !== undefined ||
      final_values.programa !== undefined
    ) {
      query += ` WHERE`;
      if (final_values.date_start && final_values.date_end) {
        query += ` Fecha_Hora >= "${final_values.date_start}" AND Fecha_Hora <= "${final_values.date_end}"`;
      } else if (final_values.date_start) {
        query += ` Fecha_Hora >= "${final_values.date_start}"`;
      } else if (final_values.date_end) {
        query += ` Fecha_Hora <= "${final_values.date_end}"`;
      }
      if (final_values.exam) {
        query +=
          final_values.date_start != undefined ||
            final_values.date_end != undefined
            ? ` AND idExam = ${final_values.exam}`
            : ` idExam = ${final_values.exam}`;
      }
      if (final_values.programa) {
        query +=
          final_values.date_start != undefined ||
            final_values.date_end != undefined ||
            final_values.exam != undefined
            ? ` AND R20060918 = ${final_values.programa}`
            : ` R20060918 = ${final_values.programa}`;
      }
    }
  }
  query += ` GROUP BY Duracion, Fecha_Hora, R16325243, Ciudad_txt, Hora, Disponible, Color HAVING R16325243 = ${id}`;
  if (final_values) {
    if (final_values.city !== undefined || final_values.status !== undefined) {
      if (final_values.city) {
        query += ` AND Ciudad_txt LIKE ("%${final_values.city}%")`;
      }
      if (final_values.status) {
        query += ` AND Color = ${final_values.status}`;
      }
    }
  }

  try {
    //let query = encodeURI(filtros[type]);
    const encodedQuery = encodeURI(query);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${encodedQuery}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => ({
        fecha_hora: value[0],
        hora: value[0],
        idExam: value[2],
        idSlot: value[6],
        canal_atencion: value[3],
        duracion: value[4],
        programa: value[9],
        ciudad: value[5],
        id: value[8],
        disponibilidad: value[8],
        separator: value[10],
        color: value[11],
      }));
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const triggerProgram = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Plan&id=${id}&actionId=G5fNwcJ2RmOTU05wXZmnkw&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const triggerUpdateDates = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Parametro&id=21685719&actionId=lQgtxcEFRBmqXSkdWJObCg&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const actFechaActivacion = async (id, fecha) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Plan&id=${id}&Fecha_Activacion=${fecha}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const actFranja = async (id, HoraAgendamiento) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Candidato&id=${id}&R40686379=${HoraAgendamiento}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const actFechaDeseada = async (id, date) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Plan&id=${id}&Fecha_Deseada=${date}&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const actNotificados = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Novedades_Plan_Mens&id=${id}&Informado=1&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const actNotificadosQuotes = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.get(
      `/updateRecord?output=json&objName=Novedades_Plan_Mens&id=${id}&Notificado=1&sessionId=${token}&output=json`
    );
    return data;
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const triggerCancelarCita = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Consulta&id=${id}&actionId=F9Of1UhcTiiYwa7p_E3sbg&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const triggerReagendarCita = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Consulta&id=${id}&actionId=VAhcCHo2TpSIySOdO9hN4Q&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const triggerQuotes = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Consulta&id=${id}&actionId=bSLZ8A5fTTS8nmSeex0d7A&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const validateIntegration = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(`SELECT WS_Response FROM Consulta WHERE id = ${id}`);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      return data[0][0];
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const triggerReagendar = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Plan&id=${id}&actionId=G5fNwcJ2RmOTU05wXZmnkw&output=json`
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPercent = async (id, final_values) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  let query = encodeURI(
    `SELECT COUNT(*) FROM Plan_Mensual WHERE R18387241 = ${id}`
  );
  let query2 = encodeURI(
    `SELECT COUNT(*) FROM Plan_Mensual WHERE R18387241 = ${id} AND Cita_Cumplida = 1`
  );
  if (final_values) {
    if (final_values.month) {
      query += ` AND Mes = "${final_values.month}"`;
      query2 += ` AND Mes = "${final_values.month}"`;
    }
    if (final_values.year) {
      query += ` AND Year = ${final_values.year}`;
      query2 += ` AND Year = ${final_values.year}`;
    }
    if (final_values.origin) {
      query += ` AND Origen = "${final_values.origin}"`;
      query2 += ` AND Origen = "${final_values.origin}"`;
    }
    if (final_values.exam) {
      query += ` AND Examen_txt = "${final_values.exam}"`;
      query2 += ` AND Examen_txt = "${final_values.exam}"`;
    }
    if (final_values.dissent != null) {
      query += ` AND Disentido = ${final_values.dissent}`;
      query2 += ` AND Disentido = ${final_values.dissent}`;
    }
    if (final_values.plan != null) {
      query += ` AND R45648199 = ${final_values.plan}`;
      query2 += ` AND R45648199 = ${final_values.plan}`;
    }
    if (final_values.pending != null) {
      query += ` AND Pendiente = ${final_values.pending}`;
      query2 += ` AND Pendiente = ${final_values.pending}`;
    }
  }
  try {
    const data = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    const data2 = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query2}&sessionId=${token}&output=json`
    );
    if (data.data && data2.data) {
      const denominador = data.data[0][0];
      const numerador = data2.data[0][0];
      const final_data = (numerador / denominador) * 100;
      return Math.floor(final_data);
    } else {
      return 0;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const countProgram = async (id) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  let query = encodeURI(
    `SELECT COUNT(*) FROM Plan_Mensual WHERE R18387241 = ${id}`
  );
  try {
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data) {
      return data[0][0];
    } else {
      return 0;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const validateQuotes = async (id) => {
  const token = localStorage.getItem("token");
  const idPac = localStorage.getItem("idPaciente");
  console.log("token guardado", token);
  let query = encodeURI(
    `SELECT COUNT(*) FROM Consulta WHERE R15590447=${id == undefined ? idPac : id
    }`
  );
  try {
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data) {
      return data[0][0];
    } else {
      return 0;
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getQuotes = async (id) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT id,name,Fecha_Cita,Fecha_Cita_Fin,Profesional_txt, Estado_Txt,Sedetxt,Ciudad_Txt,Canal_Atencion_txt,Plan_Mensual_txt,Codigo_Tipo,nameExam,Duracion FROM Consulta WHERE R15590447 = ${id} ORDER BY Fecha_Cita DESC`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          id: value[0],
          name: value[1],
          Fecha_Cita: value[2],
          Fecha_Cita_Fin: value[3],
          Profesional_txt: value[4],
          Estado_Txt: value[5],
          Sedetxt: value[6],
          Ciudad_Txt: value[7],
          Canal_Atencion_txt: value[8],
          Plan_Mensual_txt: value[9],
          Codigo_Tipo: value[10],
          nameExam: value[11],
          duracion: value[12],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getQuotesProfessional = async (id) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT id,name,Fecha_Cita,Fecha_Cita_Fin,Profesional_txt, Estado_Txt,Sedetxt,Ciudad_Txt,Canal_Atencion_txt,Plan_Mensual_txt,Codigo_Tipo,nameExam FROM Consulta WHERE R20066472 = ${id} ORDER BY Fecha_Cita DESC`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          id: value[0],
          name: value[1],
          Fecha_Cita: value[2],
          Fecha_Cita_Fin: value[3],
          Profesional_txt: value[4],
          Estado_Txt: value[5],
          Sedetxt: value[6],
          Ciudad_Txt: value[7],
          Canal_Atencion_txt: value[8],
          Plan_Mensual_txt: value[9],
          Codigo_Tipo: value[10],
          nameExam: value[11],
          //duracion: value[12],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const NovedadesPlanMens = async (id, json) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT id,Plan_Mensual_txt,Resultado FROM Novedades_Plan_Mens WHERE Informado = 0 AND R44231222 = ${id} AND Mes = ${json?.mes} AND Year = ${json?.ano}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => {
        return {
          id: value[0],
          Plan_Mensual_txt: value[1],
          Resultado: value[2],
        };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const deleteQuotes = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.delete(
      `rest/api/deleteRecord?&objName=Consulta&id=${id}&sessionId=${token}&output=json `
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const schedule = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Consulta&id=${id}&actionId=bSLZ8A5fTTS8nmSeex0d7A&output=json`
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const reschedule = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Consulta&id=${id}&actionId=VAhcCHo2TpSIySOdO9hN4Q&output=json`
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const triggerRenewPlan = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await httpClient.post(
      `rest/api/runAction?output=json&sessionId=${token}&objName=Plan&id=${id}&actionId=47y2TvmjS4ylgqfE3PRqXg&output=json`
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const generateQuotes = async (id, values) => {
  console.log(values);
  const token = localStorage.getItem("token");
  const { data } = await httpClient
    .get(
      `updateRecord?output=json&objName=Plan&id=${id}&Mes_a_Generar=${values?.mes}&Year_a_Generar=${values?.ano}&Fecha_Deseada=${values?.fecha}&sessionId=${token}&output=json`
    )
    .then(async (response) => {
      RunGenerateQuotes(id);
      return response;
    })
    .catch(async (error) => {
      return error;
    });
  console.log("data ", data);
  return data;
};

export const RunGenerateQuotes = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await httpClient
    .get(
      `/runTrigger?sessionId=${token}&id=${id}&triggerId=NpX4Ke7cSc-BFwzm-89CwQ&output=json`
    )
    .then(async (response) => {
      await httpClient.get(
        `/runTrigger?sessionId=${token}&id=${id}&triggerId=tDMwlRWNRZmmOQ-T1L4JvA&output=json`
      );
      return response;
    })
    .catch(async (error) => {
      return error;
    });
  console.log("data ", data);
  return data;
};

export const updateExam = async (json) => {
  const token = localStorage.getItem("token");
  const { data } = await httpClient
    .get(
      `updateRecord?output=json&objName=Plan_Mensual&id=${json.Ruta}&R20664485=${json.Canal}&sessionId=${token}`
    )
    .then(async (response) => {
      return response;
    })
    .catch(async (error) => {
      return error;
    });
  console.log("data ", data);
  return data;
};

export const getListOrigenPlans = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT DISTINCT Origen FROM Plan_Mensual WHERE R18387241 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListPrograms = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT DISTINCT R18147771,Programa_txt FROM Contrato WHERE R18147760 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[1] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListExamsRoutes = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT DISTINCT Examen_txt FROM Plan_Mensual WHERE R18387241 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((value) => {
        return { value: value[0], label: value[0] };
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListPlanContractIds = async (id) => {
  const token = localStorage.getItem("token");
  try {
    let query = encodeURI(
      `SELECT GROUP_CONCAT(DISTINCT R45648199 SEPARATOR ',') FROM Plan_Mensual WHERE R18387241 = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log('data con los ids', data);
      const idsplan = data[0][0] ?? 0;

      const response = await httpClient.get(
        `/selectQuery?maxRows=1000000&query=SELECT id,name FROM Contrato_Plan WHERE id IN(${idsplan})&sessionId=${token}&output=json`
      );
      if (response.data.length > 0) {
        const final_data = response.data.map((value) => {
          return { value: value[0], label: value[1] };
        });
        return final_data;
      }

    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const getListInfoPlansFilter = async (final_values, id) => {
  const token = localStorage.getItem("token");
  console.log("values: ", final_values);
  let query = `SELECT GROUP_CONCAT(Canal_Atencion_txt SEPARATOR ','),GROUP_CONCAT(Origen SEPARATOR ','),GROUP_CONCAT(Disentido SEPARATOR ','),GROUP_CONCAT(Pendiente SEPARATOR ','),GROUP_CONCAT(Tercerizado SEPARATOR ','),GROUP_CONCAT(Examen_txt SEPARATOR ','),GROUP_CONCAT(Duracion_Min SEPARATOR ','),Year,Mes,GROUP_CONCAT(id SEPARATOR ','),GROUP_CONCAT(Notas_Administrativas_txt SEPARATOR ','),GROUP_CONCAT(name SEPARATOR ',') FROM Plan_Mensual`;
  if (final_values) {
    query += ` WHERE`;
    if (final_values.month) {
      query += ` Mes = "${final_values.month}"`;
    }
    if (final_values.year) {
      query +=
        final_values.month != undefined
          ? ` AND Year = ${final_values.year}`
          : ` Year = ${final_values.year}`;
    }
    if (final_values.origin) {
      query +=
        final_values.year != undefined || final_values.month != undefined
          ? ` AND Origen = "${final_values.origin}"`
          : ` Origen = "${final_values.origin}"`;
    }
    if (final_values.exam) {
      query +=
        final_values.year != undefined ||
          final_values.month != undefined ||
          final_values.origin != undefined
          ? ` AND Examen_txt = "${final_values.exam}"`
          : ` Examen_txt = "${final_values.exam}"`;
    }
    if (final_values.dissent != null) {
      query +=
        final_values.year != undefined ||
          final_values.month != undefined ||
          final_values.origin != undefined ||
          final_values.exam != undefined
          ? ` AND Disentido = ${final_values.dissent}`
          : ` Disentido = ${final_values.dissent}`;
    }
    if (final_values.pending != null) {
      query +=
        final_values.year != undefined ||
          final_values.month != undefined ||
          final_values.origin != undefined ||
          final_values.exam != undefined ||
          final_values.dissent != undefined
          ? ` AND Pendiente = ${final_values.pending}`
          : ` Pendiente = ${final_values.pending}`;
    }
    if (final_values.plan != null) {
      query +=
        final_values?.year != undefined ||
          final_values?.month != undefined ||
          final_values?.origin != undefined ||
          final_values?.exam != undefined ||
          final_values?.dissent != undefined ||
          final_values?.pending != undefined
          ? ` AND R45648199 = ${final_values.plan}`
          : ` R45648199 = ${final_values.plan}`;
    }
  }
  query +=
    final_values?.year != undefined ||
      final_values?.month != undefined ||
      final_values?.origin != undefined ||
      final_values?.exam != undefined ||
      final_values?.dissent != undefined ||
      final_values?.plan != undefined ||
      final_values?.pending != undefined
      ? ` AND R18387241 = ${id} GROUP BY Year,Mes ORDER BY Year,Mes ASC`
      : ` R18387241 = ${id} GROUP BY Year,Mes ORDER BY Year,Mes ASC`;


  try {
    const encodedQuery = encodeURI(query);
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1000000&query=${encodedQuery}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      const final_data = data.map((item) => {
        const valuesLength = item[0].split(",").length;
        const group = [];
        for (let i = 0; i < valuesLength; i++) {
          const obj = {
            Canal_Atencion_txt: item[0].split(",")[i].trim(),
            Origen: item[1].split(",")[i].trim(),
            Disentido: item[2].split(",")[i].trim(),
            Pendiente: item[3].split(",")[i].trim(),
            Tercerizado: item[4].split(",")[i].trim(),
            Examen_txt: item[5].split(",")[i].trim(),
            Duracion_Min: item[6].split(",")[i].trim(),
            Year: item[7],
            Mes: item[8],
            Id: item[9].split(",")[i].trim(),
            Notas_Administrativas_txt: item[10]?.split(",")[i].trim(),
            Name: item[11]?.split(",")[i].trim(),
          };

          group.push(obj);
        }

        return group;
      });
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const listAlertsImportDisp = async (documento, fechaIni, fechaFin) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT WS_Response,NumeroDocumento,dateBegin,dateEnd FROM Integracion_Slot GROUP BY WS_Response,NumeroDocumento,dateBegin,dateEnd HAVING WS_Response LIKE("%ERROR%") AND NumeroDocumento = ${documento} AND dateBegin = "${fechaIni}" AND dateEnd = "${fechaFin}"`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=100&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = data.map((value) => ({
        WS_Response: value[0],
        NumeroDocumento: value[1],
        dateBegin: value[2],
        dateEnd: value[3],
      }));
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};

export const AlertTomoLaboratorios = async (id) => {
  const token = localStorage.getItem("token");
  console.log("token guardado", token);
  try {
    let query = encodeURI(
      `SELECT Tomo_Laboratorios,Resultado_Laboratorio FROM Plan WHERE id = ${id}`
    );
    const { data } = await httpClient.get(
      `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
    );
    if (data.length > 0) {
      console.log("información data", data);
      const final_data = {
        Tomo_Laboratorios: data[0][0],
        Resultado_Laboratorio: data[0][1],
      };
      return final_data;
    } else {
      return [];
    }
  } catch (error) {
    httpClient.defaults.headers.common["Authorization"] = "";
    return Promise.reject(error);
  }
};
