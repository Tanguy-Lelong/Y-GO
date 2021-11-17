import react from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Switch,
  Card,
  TimePicker,
  Rate,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

import "./AddTrip.scss";

export default function AddTrip() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="wrapper">
      <Card id="card" title="Ajouter un trajet">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Ville de départ"
            name="departure_localisation"
            rules={[{ required: true, message: "Entrer une ville de départ" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ville de retour"
            name="arriving_localisation"
            rules={[{ required: true, message: "Entrer une ville d'arrivé" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date de départ"
            name="departure_time"
            rules={[{ required: true, message: "Choisisser une date" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="departure"
            label="Heure de départ"
            rules={[
              {
                type: "DateTime",
              },
              {
                required: true,
                message: "Entrer une heure de départ",
              },
            ]}
          >
            <TimePicker />
          </Form.Item>

          <Form.Item name="passengers" label="Nombre de passager">
            <Rate character={<UserOutlined />} style={{ color: "green" }} />
          </Form.Item>

          <Form.Item label="Voiture fumeur" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Ajouter une description">
            <Input placeholder="Description" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Ajouter un trajet
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
