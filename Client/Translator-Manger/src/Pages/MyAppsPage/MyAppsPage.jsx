import React, { useState } from "react";
import { Card, Row, Col, Button, Modal, Input } from "antd";
import axios from "axios";
import * as XLSX from "xlsx";

const MyAppsPage = ({ appsData, setAppsData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAppName, setNewAppName] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const addApp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5066/api/Translation`,
        {
          appName: newAppName,
          lastDeploymentDate: new Date().toISOString(),
          translations: [],
        }
      );

      // Retrieve the updated list of applications from the server
      const updatedAppsData = response.data;

      setAppsData(updatedAppsData);
      setNewAppName("");

      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creating new application:", error);
      alert("Failed to create new application. Please try again later.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDownloadXLSX = (app) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(app.translations);
    XLSX.utils.book_append_sheet(wb, ws, "Translations");
    XLSX.writeFile(wb, `${app.appName}_translations.xlsx`);
  };

  const handleDeploy = async (app) => {
    try {
      const updatedApp = {
        ...app,
        lastDeploymentDate: new Date().toISOString(),
      };

      await axios.put(
        `http://localhost:5066/api/Translation/deploy/${app.id}`,
        updatedApp
      );

      const updatedAppsData = appsData.map((item) => {
        if (item.id === app.id) {
          return { ...item, lastDeploymentDate: updatedApp.lastDeploymentDate };
        }
        return item;
      });
      setAppsData(updatedAppsData);

      alert("Translations deployed successfully!");
    } catch (error) {
      console.error("Error deploying translations:", error);
      alert("Failed to deploy translations. Please try again later.");
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: "20px" }}
      >
        Add App
      </Button>
      <Modal
        title="Add App"
        open={isModalVisible}
        onOk={addApp}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter the name of the application"
          value={newAppName}
          onChange={(e) => setNewAppName(e.target.value)}
        />
      </Modal>
      <Row gutter={[16, 16]}>
        {appsData.map((app) => (
          <Col key={app.id} xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card title={app.appName} style={{ marginBottom: "20px" }}>
              <p>
                Last Deployment Time:{" "}
                {new Date(app.lastDeploymentDate).toLocaleString()}
              </p>
              <Button type="primary" onClick={() => handleDownloadXLSX(app)}>
                Download XLSX
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeploy(app)}
              >
                Deploy
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyAppsPage;
