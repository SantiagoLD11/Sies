import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import "assets/vendors/style";
import "styles/wieldy.less";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore, { history } from "./appRedux/store";
import App from "./containers/App/index";
import { AuthProvider } from "./authentication";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./containers/AzureLogin/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";

const store = configureStore();

const msalInstance = new PublicClientApplication(msalConfig);

const NextApp = () => (
  <Provider store={store}>
    <MsalProvider instance={msalInstance}>
      <ConnectedRouter history={history}>
        <AuthProvider>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </AuthProvider>
      </ConnectedRouter>
    </MsalProvider>
  </Provider>
);

export default NextApp;
