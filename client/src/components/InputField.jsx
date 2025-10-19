import React from "react";
import { Form, Input } from "antd";

const InputField = ({ label, name, rules, type = "text", placeholder, prefix }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
    >
      <Input
        type={type}
        placeholder={placeholder}
        prefix={prefix}
        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </Form.Item>
  );
};

export default InputField;