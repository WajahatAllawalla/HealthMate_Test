import React from "react";
import { Form, message } from "antd";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { LockOutlined } from "@ant-design/icons";
import { Link } from "react-router";

const ResetPassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Password Reset Data:", values);
    message.success("Your password has been successfully reset!");
    form.resetFields();
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-2 text-blue-600">
        Reset Password
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Enter your new password below to reset your account access.
      </p>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <InputField
          label="New Password"
          name="newPassword"
          type="password"
          prefix={<LockOutlined />}
          placeholder="Enter new password"
          rules={[
            { required: true, message: "Please enter your new password!" },
          ]}
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          prefix={<LockOutlined />}
          placeholder="Confirm new password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        />

        <Form.Item>
          <PrimaryButton htmlType="submit">Reset Password</PrimaryButton>
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

export default ResetPassword;