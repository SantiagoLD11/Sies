import React, { useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import { Permiso, Roles } from "../../constants/Roles";
import { useAuth } from "../../authentication";

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);
  const { authUser } = useAuth();

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const Administrador_AdminProfesionales =
    authUser?.cargo === Roles[2] || authUser?.cargo === Roles[3];
  const AdminAgenda_Administrador =
    authUser?.cargo === Roles[1] || authUser?.cargo === Roles[3];

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile sidebarCollapsed={sidebarCollapsed} />
          {/* <AppsNavigation/> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            {Administrador_AdminProfesionales && (
              <Menu.Item key="perfil">
                <Link to="/dashboard">
                  <i
                    style={{ color: "#FFF" }}
                    className="icon icon-profile2"
                  />
                  <span style={{ color: "#FFF" }}>
                    <IntlMessages id="Dashboard" />
                  </span>
                </Link>
              </Menu.Item>
            )}
            <Menu.SubMenu title={"Profesionales"}>
              {Administrador_AdminProfesionales && (
                <Menu.Item key="perfil">
                  <Link to="/profile">
                    <span style={{ color: "#FFF" }}>
                      <IntlMessages id="Consultar Profesional" />
                    </span>
                  </Link>
                </Menu.Item>
              )}
              {Administrador_AdminProfesionales && (
                <Menu.Item key="perfil">
                  <Link to="/historico-bloqueos">
                    <span style={{ color: "#FFF", marginLeft: "0px" }}>
                      <IntlMessages id="Histórico Novedades" />
                    </span>
                  </Link>
                </Menu.Item>
              )}
            </Menu.SubMenu>
            <Menu.SubMenu title={"Pacientes"}>
              {AdminAgenda_Administrador && (
                <Menu.Item key="perfil">
                  <Link to="/consultar-pacientes">
                    <span style={{ color: "#FFF" }}>
                      <IntlMessages id="Consultar Pacientes" />
                    </span>
                  </Link>
                </Menu.Item>
              )}
            </Menu.SubMenu>
            <Menu.SubMenu title={"Aseguradores"}>
              {AdminAgenda_Administrador && (
                <Menu.Item key="perfil">
                  <Link to="/admin-routes">
                    <span style={{ color: "#FFF" }}>
                      <IntlMessages id="Administración Rutas" />
                    </span>
                  </Link>
                </Menu.Item>
              )}
            </Menu.SubMenu>

            <Menu.SubMenu title={"Informes"}>
              {Administrador_AdminProfesionales && (
                <Menu.Item key="perfil">
                  <Link to="/notas-admin">
                  <span style={{ color: "#FFF", textAlign: "left" ,width: "80%"}}>
                      <IntlMessages id="Notas Administrativas" />
                    </span>
                  </Link>
                </Menu.Item>
              )}
            </Menu.SubMenu>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

