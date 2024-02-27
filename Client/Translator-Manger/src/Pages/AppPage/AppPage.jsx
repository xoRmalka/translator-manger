import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Form } from "antd";
import axios from "axios";

const AppPage = ({ app, setAppsData }) => {
  const [editedTranslations, setEditedTranslations] = useState([...app.translations]);
  const [newTranslation, setNewTranslation] = useState({ key: "", en: "", fr: "", du: "" });
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setEditedTranslations([...app.translations]);
  }, [app.translations]);


  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "English",
      dataIndex: "en",
      key: "en",
      render: (_, record) => (
        <Input
          value={record.en}
          onChange={(e) => handleTranslationChange(record.key, "en", e.target.value)}
        />
      ),
    },
    {
      title: "French",
      dataIndex: "fr",
      key: "fr",
      render: (_, record) => (
        <Input
          value={record.fr}
          onChange={(e) => handleTranslationChange(record.key, "fr", e.target.value)}
        />
      ),
    },
    {
      title: "Dutch",
      dataIndex: "du",
      key: "du",
      render: (_, record) => (
        <Input
          value={record.du}
          onChange={(e) => handleTranslationChange(record.key, "du", e.target.value)}
        />
      ),
    },
  ];

  const handleTranslationChange = (key, language, value) => {
    const updatedTranslations = editedTranslations.map((translation) => {
      if (translation.key === key) {
        return { ...translation, [language]: value };
      }
      return translation;
    });
    setEditedTranslations(updatedTranslations);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedApp = { ...app, translations: editedTranslations };
      await axios.put(
        `http://localhost:5066/api/Translation/${app.id}`,
        updatedApp
      );
      setAppsData((prevAppsData) =>
        prevAppsData.map((prevApp) =>
          prevApp.id === app.id ? updatedApp : prevApp
        )
      );
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again later.");
    }
  };

  const handleAddTranslation = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    if (newTranslation.key.trim() !== "") {
      if (editedTranslations.some((translation) => translation.key === newTranslation.key)) {
        alert("Key already exists.");
        return;
      }
  
      const updatedTranslations = [...editedTranslations, newTranslation];
      setEditedTranslations(updatedTranslations);
      setModalVisible(false);
    } else {
      alert("Key cannot be empty.");
    }
  };
  

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalInputChange = (e) => {
    setNewTranslation((prevTranslation) => ({
      ...prevTranslation,
      key: e.target.value,
    }));
  };

  return (
    <>
      <Button type="primary" onClick={handleSaveChanges} style={{ marginBottom: "20px" }}>
        Save Changes
      </Button>
      <Button type="primary" onClick={handleAddTranslation} style={{ marginBottom: "20px", marginLeft: "20px" }}>
        Add Translation
      </Button>
      <Modal
        title="Add Translation"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ disabled: !newTranslation.key.trim() }}
      >
        <Form>
          <Form.Item label="Key" required>
            <Input value={newTranslation.key} onChange={handleModalInputChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={editedTranslations}
        pagination={false}
        rowKey={(record) => record.key}
      />
      <Modal
        title="Success"
        open={successModalVisible}
        onOk={() => setSuccessModalVisible(false)}
        onCancel={() => setSuccessModalVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        Changes have been saved successfully!
      </Modal>
    </>
  );
};

export default AppPage;
