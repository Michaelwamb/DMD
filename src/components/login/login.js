import React, { useState } from "react";
import "./login.css";
import Image from "../../assets/dmd_massa.png";
import { MdEmail, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const data = JSON.stringify({
      email: user,
      password: password,
    });

    fetch("http://192.168.1.213:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          sessionStorage.setItem("@T_A", response.token);
          history.push("/dash");
        } else return alert("Falha na autenticação");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="login">
      <div className="login-logo">
        <img src={Image} alt="xxx" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-right">
          <div className="title-header">
            <h1>Login</h1>
          </div>
          <div className="body-login">
            <div className="login-loginInputEmail">
              <MdEmail />

              <input
                className="inputLogin"
                type="user"
                placeholder="Digite um email"
                name="user"
                onChange={(value) => setUser(value.target.value)}
              />
            </div>
            <div className="login-loginInputPassword">
              <MdLock />

              <input
                placeholder="Digite sua senha"
                name="password"
                type={show ? "text" : "password"}
                onChange={(value) => setPassword(value.target.value)}
              />
              <div className="login-eye">
                {show ? (
                  <HiEye size={20} onClick={handleClick} />
                ) : (
                  <HiEyeOff size={20} onClick={handleClick} />
                )}
              </div>
            </div>

            <button type="submit" onClick={handleSubmit}>
              Entrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
