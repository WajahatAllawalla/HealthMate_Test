import React from "react";
import { Form, message } from "antd";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Reset link sent to:", values.email);
    message.success("Password reset link sent to your email!");
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-2 text-blue-600">
        Forgot Password
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Enter your email address and we’ll send you a link to reset your
        password.
      </p>

      <Form layout="vertical" form={form} onFinish={onFinish}>
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

        <Form.Item>
          <PrimaryButton htmlType="submit">Send Reset Link</PrimaryButton>
        </Form.Item>
      </Form>

      <p className="text-center text-gray-600 mt-4">
        Remember your password?{" "}
        <Link
          to="/signin"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign In
        </Link>
      </p>
    </>
  );
};

export default ForgotPassword;