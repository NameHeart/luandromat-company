import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { LoginStyled } from "./styled";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ตรวจสอบข้อมูลผู้ใช้ และเรียกใช้ onLogin หากถูกต้อง
    if (username === "admin" && password === "123456") {
      onLogin(username);
      toast.success("Login success");
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <LoginStyled>
      <div className="Login-container">
        <div className="form-username">
          <label>Username:</label>
          <Form.Control className="input_text" size="lg" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-password">
          <label>Password:</label>
          <Form.Control className="input_text" size="lg" type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button variant="outline-success" onClick={handleLogin}>
          เข้าสู่ระบบ
        </Button>

        <ToastContainer />
      </div>
    </LoginStyled>
  );
};

export default Login;
