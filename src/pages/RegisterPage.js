import React from 'react'
import {useHistory}  from "react-router-dom";
import { Form, Input, Row, Col, Image, message} from "antd";
import  {auth, db} from '../firebase/index'

import { GreenButton } from "../components/GreenButton";
import logo from "../images/sportfield_log.png";

import "../styles/App.css";
import "../styles/register.css";

const { Item } = Form;

function RegisterPage() {
 
  let history = useHistory()
  const onFinish = async ({email, password, name, userName, land}) => {

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      
      // Signed in
      const user = userCredential.user
      const userId = user.uid

      await db.collection("Users").doc(userId).set(
        {
          name,
          email,
          userName,
          land
        }
      )
      history.push("/profile")
      message.success("Usuario registrado correctamente");

    }catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
    }
  }

  return (
    <div>
      <Image className="cimg" width={400} src={logo} left={300} />
      <div className="Container1">
        <Row>
          <Col xs={1} sm={2} md={6} lg={7} />
          <Col xs={22} sm={20} md={12} lg={10}>
            {/* <h1>Registro de nuevo usuario</h1> */}
            <Form
              name={"form"}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              //onFinishFailed={on}
            >
              <Item
                label="Usuario"
                name="userName"
                rules={[
                  { required: true, message: "Ingresa un nombre de usuario válido (Ej. donnaza)" },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Nombre"
                name="name"
                rules={[
                  { required: true, message: "por favor ingresa tu Nombre" },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Apellido"
                name="lastname"
                rules={[
                  { required: true, message: "por favor ingresa tu Apellido" },
                ]}
              >
                <Input />
              </Item>

              <Item
                label="Correo Electronico"
                name="email"
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
                name="password"
                rules={[
                  {
                    required: true,
                    message: "por favor ingresa tu Correo Contraseña",
                  },
                ]}
              >
                <Input.Password />
              </Item>

              <Item
                label="Numero de lote"
                name="land"
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
                <GreenButton
                  button_name="Registrar"
                  // button_func={}
                />
              </Item>
            </Form>
          </Col>

          <Col xs={1} sm={2} md={6} lg={7} />
        </Row>
      </div>
    </div>
  );
}
export default RegisterPage;
