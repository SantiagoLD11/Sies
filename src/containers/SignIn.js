import { React, useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { WindowsOutlined } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { useAuth } from "../authentication";
import AppNotificationContainer from "../components/AppNotificationContainer";
import logosies from "../assets/images/logosies.png";
import Logo from "../assets/images/LOGO_SIES_170_x_115_px.png";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import {
  loginRequest,
  setClientId,
  setRedirectUri,
  setTenant,
} from "./AzureLogin/authConfig";
import { callMsGraph } from "./AzureLogin/graph";
import AdminRoutes from "../views/AdminRoutes";
import BlockDisposition from "../views/blockDisposition";
import { GeneratingChanges } from "../components/Underwriters/GeneratingChanges";

const SignIn = () => {
  const { isLoading, error, userLogin, getUrl, setAuthUser } = useAuth();
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      // Obtener la cuenta actualmente autenticada (en este ejemplo, asumimos que solo hay una cuenta)
      const cuentaActual = accounts[0];
      // Obtener el oid (Object ID) de la cuenta
      const oid = cuentaActual.idTokenClaims.oid;
      // Obtener el nombre de la cuenta
      const nombre = cuentaActual.name;
      // Obtener el tid (Tenant ID) de la cuenta
      const tid = cuentaActual.tenantId;
      // Luego, puedes utilizar estos valores según tus necesidades
      console.log("OID:", oid);
      console.log("Nombre:", nombre);
      console.log("TID:", tid);
      setAuthUser({ cargo: 39842526, name: nombre, id: oid });
      localStorage.setItem("name", nombre);
      getUrl();
    } else {
      console.log("No hay cuentas autenticadas.");
    }
  }, [accounts]);

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    userLogin(values);
  };

  const loginAzure = async () => {
    await settersConf();
    await Azure();
  };

  const settersConf = async () => {
    const resp = await getUrl();
    setClientId(resp.clientId);
    setRedirectUri(resp.redirectUri);
    setTenant(resp.tenantId);
    console.log(resp);
  };

  const Azure = async () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div
              // className="gx-app-logo-content-bg"
              style={{
                content: "",
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 1,
                right: 0,
                bottom: 0,
                backgroundColor: "#00ABC8",
              }}
            >
              {/* <img src={IconSignIn} alt='Neature'/> */}
            </div>
            <div className="gx-app-logo-wid">
              <h1>
                <IntlMessages id="app.userAuth.signIn" />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.getAccount" />
              </p>
              {/* <p><IntlMessages id="app.userAuth.bySigning"/></p> */}
            </div>
            <div className="gx-app-logo">
              <img src={logosies} alt="example" style={{ height: "70px" }} />
            </div>
          </div>
          <div className="gx-app-login-content">
          {/* <AdminRoutes /> */}
          {/* <BlockDisposition id={1} setDataImported={false} /> */}
          <GeneratingChanges modalVisible={false}  />
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0"
            >
              <Form.Item
                initialValue="Prueba 1"
                rules={[
                  { required: true, message: "The input is not valid E-mail!" },
                ]}
                name="email"
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                initialValue="prueba1"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                name="password"
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              {/* <Form.Item>
                <Checkbox>
                  <IntlMessages id="appModule.iAccept" />
                </Checkbox>
                <span className="gx-signup-form-forgot gx-link">
                  <IntlMessages id="recupera aquí" />
                </span>
              </Form.Item> */}
              <Form.Item>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>
                <Button className="gx-mb-0" onClick={() => loginAzure()}>
                  <WindowsOutlined />
                  Ingresa con Microsoft
                </Button>
                {/* <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
                id="app.userAuth.signUp"/></Link> */}
              </Form.Item>
            </Form>
            <img style={{ width: "35%", float: "right" }} src={Logo}></img>
          </div>
          <AppNotificationContainer loading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
