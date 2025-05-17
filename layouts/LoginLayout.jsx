import Background from "@/components/Background";
import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Background />
      {children}
    </div>
  );
};

export default LoginLayout;
