import React, { useState } from "react";
import { Form } from "antd";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { showError, showSuccess } from "../../utils/toast";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${apiUrl}/auth/signup`,
        {
          name: value.name,
          email: value.email,
          password: value.password,
        },
        {
          withCredentials: true,
          validateStatus: (status) => status >= 200 && status < 500,
        }
      );

      if (res.data.success === false) {
        return showError(res.data.message);
      }

      form.resetFields();
      showSuccess(res.data.message);
    } catch (error) {
      showError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Register
      </h1>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <InputField
          label="Name"
          name="name"
          prefix={<UserOutlined />}
          placeholder="Enter your name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          prefix={<MailOutlined />}
          placeholder="Enter your email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Enter a valid email!" },
          ]}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        />

        <Form.Item>
          <PrimaryButton isLoading={isLoading} htmlType="submit" text="Sign Up"/>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;