import React from "react";
import {Avatar} from "antd";

const ProfileHeader = ({ infoClient }) => {
  return (
    <div className="gx-profile-banner">
      <div className="gx-profile-container">
        <div className="gx-profile-banner-top">
          <div className="gx-profile-banner-top-left">
            <div className="gx-profile-banner-avatar">
              <Avatar className="gx-size-90" alt="..." src={infoClient?.logo}/>
            </div>
            <div className="gx-profile-banner-avatar-info">
              <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">{infoClient?.name}</h2>
              <p className="gx-mb-0 gx-fs-lg">{infoClient?.document}</p>
            </div>
          </div>
          <div className="gx-profile-banner-top-right">
            <ul className="gx-follower-list">
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">2k+</span>
                <span className="gx-fs-sm">Followers</span></li>
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">847</span>
                <span className="gx-fs-sm">Following</span></li>
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">327</span>
                <span className="gx-fs-sm">Friends</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="gx-profile-banner-bottom">
          <div className="gx-tab-list">
            <ul className="gx-navbar-nav">
              <li>
                <span className="gx-link">Información general</span>
              </li>
             
            </ul>
          </div>
          <span className="gx-link gx-profile-setting">
            <i className="icon icon-setting gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle"/>
            <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">Setting</span>
          </span>
        </div>
      </div>
    </div>
  )
};

export default ProfileHeader;
