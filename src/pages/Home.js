import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Navigation from "components/shared/Navigation";
import React, { Component } from "react";
import { Outlet } from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="h-8 m-4 bg-gray-600">logo</div>
          <Navigation />
        </Sider>
        <Layout className="bg-gray-400" style={{ marginLeft: 200 }}>
          {/* <Header className="bg-red-700" style={{ padding: 0 }} /> */}
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Aposs administator webstie ©2022 Created by APOSS TEAM
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
