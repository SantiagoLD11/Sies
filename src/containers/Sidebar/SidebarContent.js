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
            {/* <Menu.Item key="sample">
              <Link to="/sample"><i className="icon icon-widgets"/>
                <span><IntlMessages id="sidebar.samplePage"/></span>
              </Link>
            </Menu.Item> */}
            <Menu.SubMenu title={"Profesionales"}>
              {Administrador_AdminProfesionales && (
                <Menu.Item key="perfil">
                  <Link to="/profile">
                    <i
                      style={{ color: "#FFF" }}
                      className="icon icon-profile2"
                    />
                    <span style={{ color: "#FFF" }}>
                      <IntlMessages id="Consultar profesional" />
                    </span>
                  </Link>
                </Menu.Item>
              )}
              {/* {Administrador_AdminProfesionales && (
              <Menu.Item key="perfil">
                <Link to="/list-profesional">
                  <i style={{ color: "#FFF" }} className="icon icon-profile2" />
                  <span style={{ color: "#FFF" }}>
                    <IntlMessages id="Listado de profesionales" />
                  </span>
                </Link>
              </Menu.Item>
            )} */}
              {Administrador_AdminProfesionales && (
                <Menu.Item key="perfil">
                  <Link to="/historico-bloqueos">
                    <ExclamationCircleOutlined
                      style={{ color: "#FFF" }}
                      className="icon icon-profile2"
                    />
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
                    <i
                      style={{ color: "#FFF" }}
                      className="icon icon-profile2"
                    />
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
                    <i
                      style={{ color: "#FFF" }}
                      className="icon icon-profile2"
                    />
                    <span style={{ color: "#FFF" }}>
                      <IntlMessages id="Administración Rutas de Atención" />
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
