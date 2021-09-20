import {useHistory}  from "react-router-dom";
import { Button, Form, Image, Input } from "antd";

import  {auth} from '../firebase/index'

import logo from "../images/sportfield_log.png";

import "../styles/login.css";
import "../styles/App.css";


const LoginPage = () => {

  let history = useHistory()

  const onFinish = async ({email, password}) => {

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      // Signed in
      const user = userCredential.user
      console.log("user: ", user)
      history.push("/profile")

    } catch (error) {
      const errorCode = error.code;
      console.log("errorCode", errorCode);
    }
  }

  return (
    <div>
       <div className="MainContainer">
         <div className="imageContainer">
           {" "}
          <Image width={400} src={logo} left={800} top={300} />
         </div>

         <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
         onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Correo"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su correo electrónico!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <div className={"footer"}>¿No tienes cuenta? Regístrate </div>{" "}
          <div
            style={{ cursor: "pointer" }}
            className={"footer1"}
            //onClick={footer11}
          >
            {" "}
            Aquí
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage;