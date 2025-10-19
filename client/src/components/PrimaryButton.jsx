import React from "react";
import { Button } from "antd";

const PrimaryButton = ({ isLoading, text }) => {
  return (
    <Button
      htmlType="submit"
      block
      loading={isLoading}
      type="default"
      className="relative w-full !h-10 overflow-hidden cursor-pointer text-[17px] hover:!border-2 border-[#0077ff] rounded-md z-10 group !bg-[#0077ff]"
    >
      <span className="relative z-10 !text-white transition-colors duration-300 group-hover:!text-[#0077ff]">
        {text}
      </span>

      <span className="absolute top-full left-full w-[150%] h-[300%] bg-white rounded-full z-0 transition-all duration-300 group-hover:top-[-100%] group-hover:left-[-25%]" />
    </Button>
  );
};

export default PrimaryButton;