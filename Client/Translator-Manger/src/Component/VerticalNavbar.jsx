import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import axios from "axios";
import MyAppsPage from "../Pages/MyAppsPage/MyAppsPage";
import AppPage from "../Pages/AppPage/AppPage";

const { Sider, Content } = Layout;

const VerticalNavbar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("my-apps");
  const [appsData, setAppsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5066/api/Translation"
        );
        setAppsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem.key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "my-apps":
        return <MyAppsPage appsData={appsData} setAppsData={setAppsData} />;
      default:
        const selectedApp = appsData.find((app) => app.id === selectedMenuItem);
        return <AppPage app={selectedApp} setAppsData={setAppsData} />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="my-apps">My Apps</Menu.Item>
          {appsData.map((app) => (
            <Menu.Item key={app.id}>{app.appName}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default VerticalNavbar;
