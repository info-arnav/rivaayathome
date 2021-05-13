import axios from "axios";
import { useState } from "react";
import jwt from "njwt";
export default function Login() {
  const [response, setResponse] = useState({});
  const [username, setUsername] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post("/api/login", { username: username, password: password })
      .then((e) =>
        e.data.status != "success"
          ? (() => {
              setResponse(e.data);
              setDisabled(false);
            })()
          : localStorage.setItem(
              "userData",
              jwt.create(
                e.data.value,
                "ArnavGod30080422020731017817087571441",
                "HS512"
              ),
              (function () {
                setDisabled(false);
                location.reload();
              })()
            )
      );
  };
  return (
    <div>
      <center>
        <h2>Login</h2>
      </center>
      <br></br>
      <form onSubmit={handleSubmit}>
        {response.status == "error" && (
          <span
            style={{
              marginTop: "0px",
              fontSize: "14px",
              color: "red",
            }}
          >
            {response.value}
          </span>
        )}
        <br></br>
        <input
          required
          value={username}
          autocomplete="username"
          placeholder="username or email"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br></br>
        <input
          required
          value={password}
          placeholder="password"
          autocomplete="password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br></br>
        <button
          className="btn btn-primary"
          type="submit"
          style={{ backgroundColor: "black", color: "white", width: "100%" }}
        >
          {!disabled && "Login"}
          {disabled && (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
