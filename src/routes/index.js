import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = () => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`/sample`}
        component={asyncComponent(() => import("./SamplePage"))}
      />
      <Route
        path={`/profile`}
        component={asyncComponent(() => import("../views/UserInformation"))}
      />
      <Route
        path={`/detail-professional/:id`}
        component={asyncComponent(() => import("../views/DetailProfesional"))}
      />
      <Route
        path={`/edit-professional/:id`}
        component={asyncComponent(() => import("../views/EditProfesional"))}
      />
      <Route
        path={`/list-profesional`}
        component={asyncComponent(() => import("../views/ListProfesional"))}
      />
      <Route
        path={`/historico-bloqueos`}
        component={asyncComponent(() => import("../views/HistoricoBloqueos"))}
      />
      <Route
        path={`/consultar-pacientes`}
        component={asyncComponent(() => import("../views/PatientInformation"))}
      />
      <Route
        path={`/detail-patient/:id`}
        component={asyncComponent(() => import("../views/DetailPatient"))}
      />
      <Route
        path={`/admin-routes`}
        component={asyncComponent(() => import("../views/AdminRoutes"))}
      />
      <Route
        path={`/informe-pacientes`}
        component={asyncComponent(() => import("../views/ReportPacientes"))}
      />
      <Route
        path={`/informe-not-admin`}
        component={asyncComponent(() => import("../views/ReportNotasAdmin"))}
      />
      <Route
        path={`/informe-frecuencias`}
        component={asyncComponent(() => import("../views/ReportCumpFrecuencias"))}
      />
      <Route
        path={`/informe-pryec-instal`}
        component={asyncComponent(() => import("../views/ReportProvInstall"))}
      />
      <Route
        path={`/informe-aprob-agenda`}
        component={asyncComponent(() => import("../views/ReportAprovAgenda"))}
      />
      <Route
        path={`/informe-agendamiento`}
        component={asyncComponent(() => import("../views/ReportAgendamiento"))}
      />
    </Switch>
  </div>
);

export default App;
