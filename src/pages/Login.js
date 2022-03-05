import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "lib/axios/Interceptor";
export class Login extends Component {
  state = {
    cc: null,
  };
  getCategory() {}
  onFinish = () => {
    axios.get("/api/v1/products").then((res) => {
      this.setState({ cc: "dsa" }, () => {
        console.log(this.state.cc);
      });
    });
  };

  render() {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <div className="w-96 ">
          <h3>Aposs admin</h3>
          <Form
            name="normal_login"
            style={{ margin: "auto" }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="#">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="#">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
