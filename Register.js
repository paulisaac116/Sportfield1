import "../styles/App.css";
/*import React, { useState } from "react";*/
import { Form, Input, Row, Col, Image } from "antd";
/*import "../moment/localet/es";
/*import locale from "antd/es/date-picker/locale/es_ES";
import { DatePicker } from "antd/es";
/*import { Image } from "antd";*/
import "../styles/register.css";
import logo from "../images/logo.png";
import { GreenButton } from "./GreenButton";
//import { useHistory } from "react-router-dom";
const { Item } = Form;
function Register() {
  // const history = useHistory();
  const formSuccess = (datos) => {
    console.log("Form submitted successfully: ", datos);
  };
  const formFailed = (error) => {
    console.log("Error: ", error);
  };
  /*const HandleReturn = () => {
    history.push("/");
  };
*/
  return (
    <div>
      <Image className="cimg" width={400} src={logo} left={300} />
      <h1 className="heder">Regresar</h1>
      <h2 className="subtitulo">Registro de nuevo usuario</h2>
      <div className="Container1">
        <Row>
          <Col xs={1} sm={2} md={6} lg={7} />
          <Col xs={22} sm={20} md={12} lg={10}>
            <Form
              name={"form"}
              initialValues={{
                remember: true,
              }}
              onFinish={formSuccess}
              onFinishFailed={formFailed}
            >
              <Item
                style={{ color: "white" }}
                label="Usuario"
                name="usuario"
                rules={[
                  { required: true, message: "por favor ingresa tu Usuario" },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Nombre"
                name="nombre"
                rules={[
                  { required: true, message: "por favor ingresa tu Nombre" },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Apellido"
                name="apellido"
                rules={[
                  { required: true, message: "por favor ingresa tu Apellido" },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Correo Electronico"
                name="correoElectronico"
                rules={[
                  {
                    required: true,
                    message: "por favor ingresa tu Correo Electronico",
                  },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Contraseña"
                name="contrasena"
                rules={[
                  {
                    required: true,
                    message: "por favor ingresa tu Correo Contraseña",
                  },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Numero de lote"
                name="numLote"
                rules={[
                  {
                    required: true,
                    message: "por favor ingresa tu Numero de lote",
                  },
                ]}
              >
                <Input />
              </Item>
              <Item>
                <div className="registrar">
                  <GreenButton
                    button_name="Registrar"
                    button_func={GreenButton.css}
                  />
                </div>
              </Item>
            </Form>
          </Col>
          <Col xs={1} sm={2} md={6} lg={7} />
        </Row>
      </div>
    </div>
  );
}
export default Register;
