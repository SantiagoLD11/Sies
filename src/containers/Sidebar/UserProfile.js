import React, { useEffect, useState } from "react";
import { Avatar, Popover } from "antd";
import { useAuth } from "../../authentication";
import { useHistory } from "react-router-dom";
import { get_client } from "../../appRedux/services";
import IntlMessages from "../../util/IntlMessages";

const UserProfile = ({ sidebarCollapsed }) => {
  const { userSignOut } = useAuth();
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [name] = useState(localStorage.getItem("name"));

  const getUser = async () => {
    const cliente = await get_client();
    setUser(cliente);
  };

  // useEffect(() => {
  //   getUser();
  // }, []);

  const onLogoutClick = () => {
    userSignOut(() => {
      history.push("/sies");
    });
  };

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li onClick={onLogoutClick}>Salir</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        {/* <Avatar src={user?.logo} className="gx-size-40 gx-pointer gx-mr-3" alt=""/> */}
        {!sidebarCollapsed && <span style={{ color: "#FFF" }}>{name}</span>}
        <span style={{ color: "#FFF" }} className="gx-avatar-name">
          {user?.name}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
