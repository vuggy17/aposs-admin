import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { axios } from "lib/axios/Interceptor";
import { ENP_LOGIN } from "api/EndPoint";
import { useNavigate } from "react-router";
import LocalStorageService from "services/LocalStorage";
export function Login() {
  const navigation = useNavigate();

  const onFinish = () => {
    axios
      .post(ENP_LOGIN, { email: "admin@gmail.com", password: "123456789" })
      .then(({ data: { accessToken, refreshToken } }) => {
        LocalStorageService.setAuthToken(accessToken);
        LocalStorageService.setRefreshToken(refreshToken);
        navigation("/");
      });
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-96 ">
        <h3>Aposs admin</h3>
        <Form
          name="normal_login"
          style={{ margin: "auto" }}
          initialValues={{
            email: "admin@gmail.com",
            password: "123456789",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
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

export default Login;
