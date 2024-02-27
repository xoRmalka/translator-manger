import React from "react";
import { Layout } from "antd";
import VerticalNavbar from "./Component/VerticalNavbar";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <VerticalNavbar />
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        ></Content>
      </Layout>
    </Layout>
  );
};

export default App;
