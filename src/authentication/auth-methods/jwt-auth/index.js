import { useEffect, useState } from "react";
import { httpClient } from "../../../util/Api";

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const fetchStart = () => {
    setLoading(true);
    setError("");
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError("");
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };
  const randomNumberUsers = () => {
    const min = 2;
    const max = 60;
    // Generar un número aleatorio en el rango especificado
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

    return numeroAleatorio;
  };

  const getUrl = () => {
    const altNumber = randomNumberUsers();
    return new Promise((resolve, reject) => {
      fetchStart();
      httpClient
        .get(`login?loginName=sies${altNumber}.portal&password=ImpelTi2023*.&output=json`, { 
          mode: "no-cors",
        })
        .then(async ({ data }) => {
          if (data.status === "ok") {
            fetchSuccess();
            localStorage.setItem("token", data.sessionId);
            const resp = await getUrl2(data.sessionId);
            console.log(resp);
            resolve(resp);
          } else {
            reject(data.error);
          }
        })
        .catch(function (error) {
          fetchError(error.message);
          reject(error.message);
        });
    });
  };

  const getUrl2 = async (token) => {
    try {
      let query = encodeURI(
        `SELECT tenantId,clientId,Client_Secret_Value,redirectUri FROM Parametro`
      );
      const { data } = await httpClient.get(
        `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
      );
      if (data.length > 0) {
        const values = data[0];
        return {
          tenantId: values[0],
          clientId: values[1],
          Client_Secret_Value: values[2],
          redirectUri: values[3],
        };
      } else {
        return {};
      }
    } catch (error) {
      httpClient.defaults.headers.common["Authorization"] = "";
      return Promise.reject(error);
    }
  };

  const userLogin = (user, callbackFun) => {
    const altNumber = randomNumberUsers();
    fetchStart();
    // setAuthUser({});
    httpClient
      .get(`login?loginName=sies${altNumber}.portal&password=ImpelTi2023*.&output=json`, {
        mode: "no-cors",
      })
      .then(({ data }) => {
        if (data.status === "ok") {
          fetchSuccess();
          localStorage.setItem("token", data.sessionId);
          getAuthUser(user);
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/register", user)
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.token.access_token;
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/logout")
      .then(({ data }) => {
        if (data.result) {
          httpClient.defaults.headers.common["Authorization"] = "";
          setAuthUser(false);
          fetchSuccess();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const getAuthUser = (user) => {
    fetchStart();
    const token = localStorage.getItem("token");
    let query = encodeURI(
      `SELECT Cargo,name,id FROM Usuario WHERE Usuario = '${user.email}' AND Clave  = '${user.password}'`
    );
    httpClient
      .get(
        `/selectQuery?maxRows=1&query=${query}&sessionId=${token}&output=json`
      )
      .then(({ data }) => {
        if (data.length > 0) {
          const values = data[0];
          fetchSuccess();
          setAuthUser({ cargo: values[0], name: values[1], id: values[2] });
          localStorage.setItem("name", values[1]);
          return;
        } else {
          fetchError("Usuario no encontrado");
          return;
        }
      })
      .catch(function (error) {
        httpClient.defaults.headers.common["Authorization"] = "";
        fetchError("Usuario no encontrado");
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    httpClient
      .post("auth/me")
      .then(({ data }) => {
        if (data.user) {
          setAuthUser(data.user);
        }
        setLoadingUser(false);
      })
      .catch(function () {
        //localStorage.removeItem("token");
        httpClient.defaults.headers.common["Authorization"] = "";
        setLoadingUser(false);
      });
  }, []);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
    getUrl,
    getUrl2,
  };
};
