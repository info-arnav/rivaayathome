import axios from "axios";
import { useState } from "react";
import jwt from "njwt";
import ReCAPTCHA from "react-google-recaptcha";
export default function Registeration() {
  // location
  const [buttonLoadingStage1, setButtonLoadingStage1] = useState(false);
  const [buttonLoadingStage2, setButtonLoadingStage2] = useState(false);
  // input
  const inputHandle = (fx, value) => {
    setOTP(false);
    fx(value);
  };
  // Recaptcha
  const [disabled, setDisabled] = useState(true);
  const [verificationError, setVerificationError] = useState(false);
  const onChange = (value) => {
    axios
      .post("/api/verify", {
        secret: "6LcM8JQaAAAAANE5B1sZchi2IrljEHNtQPo8Ioml",
        response: value,
      })
      .then((e) => {
        e.data.value.success == true
          ? setDisabled(false)
          : verificationError(true);
      });
  };
  // OTP
  const [userOtp, setUserOtp] = useState("");
  // Form
  const [name, setName] = useState("");
  const [response, setResponse] = useState({ status: null });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleRegisteration = (e) => {
    e.preventDefault();
    setOTP(false);
    setButtonLoadingStage1(true);
    axios
      .post("/api/registeration-prefetch", {
        email: email,
        username: username,
      })
      .then((e) => {
        const data = e.data;
        if (data.status == "success") {
          jwt.verify(
            data.value,
            "ArnavGod30080422020731017817087571441",
            "HS512",
            function (error, s) {
              if (s) {
                setResponse({ status: "success", value: s.body.code });
                setOTP(s.body.code);
              } else {
                setResponse({
                  status: "error",
                  value: "This may be a glitch.",
                });
              }
            }
          );
        } else {
          setResponse({ status: "error", value: data.value });
        }
        setButtonLoadingStage1(false);
      });
  };
  // OTP
  const [otp, setOTP] = useState(false);
  //Final Registeration
  const finalRegisteration = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", {
        username: username,
        password: password,
        email: email,
        name: name,
      })
      .then((e) =>
        e.data.status == "success"
          ? localStorage.setItem(
              "userData",
              jwt.create(
                e.data.value,
                "ArnavGod30080422020731017817087571441",
                "HS512"
              ),
              (function () {
                location.replace("/dashboard");
              })()
            )
          : setResponse({ status: "error", value: e.data })
      );
  };
  return (
    <div>
      <center>
        <h2>Register</h2>
      </center>
      <br></br>
      <form onSubmit={handleRegisteration}>
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
        <br />
        <input
          placeholder="Name"
          value={name}
          autocomplete="name"
          placeholder="name"
          type="name"
          onChange={(e) => {
            inputHandle(setName, e.target.value);
          }}
          required="true"
        ></input>
        <br></br>
        <input
          placeholder="Email"
          value={email}
          placeholder="email"
          autocomplete="email"
          type="email"
          onChange={(e) => {
            inputHandle(setEmail, e.target.value);
          }}
          required="true"
        ></input>
        <br></br>
        <input
          placeholder="Username"
          value={username}
          placeholder="username"
          autocomplete="username"
          name="username"
          type="username"
          onChange={(e) => {
            e.target.value.indexOf(" ") == -1 &&
              e.target.value.length <= 24 &&
              inputHandle(setUsername, e.target.value.toLocaleLowerCase());
          }}
          required="true"
        ></input>
        <br></br>
        <input
          placeholder="Password"
          value={password}
          autocomplete="password"
          name="password"
          placeholder="password"
          type="password"
          onChange={(e) => {
            e.target.value.indexOf(" ") == -1 &&
              e.target.value.length <= 36 &&
              inputHandle(setPassword, e.target.value);
          }}
          required="true"
        ></input>
        <br></br>
        <ReCAPTCHA
          size="compact"
          sitekey="6LcM8JQaAAAAAJ-uBIX5Oho6BYWrw-pBQn0L4ZCo"
          onChange={onChange}
          onExpired={() => {
            setOTP(false);
            setDisabled(true);
          }}
          onTimeout={() => {
            setOTP(false);
            setDisabled(true);
          }}
        />
        {verificationError && (
          <div>
            <br></br>
            <span
              style={{
                marginTop: "0px",
                fontSize: "14px",
                color: "red",
              }}
            >
              Sorry ! We couldn't verify you are a human
            </span>
          </div>
        )}
        <br></br>
        <button
          style={{ backgroundColor: "black", width: "100%" }}
          className="btn btn-primary"
          disabled={disabled | buttonLoadingStage1}
          type="submit"
        >
          {!buttonLoadingStage1 && (otp ? "Resend OTP" : "Request OTP")}
          {buttonLoadingStage1 && (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </button>
      </form>
      {otp && (
        <form onSubmit={finalRegisteration}>
          <br></br>
          <input
            placeholder="OTP"
            required="true"
            value={userOtp}
            placeholder="User OTP"
            type="userOtp"
            onChange={(e) => setUserOtp(e.target.value)}
          ></input>
          <br></br>
          <button
            style={{ backgroundColor: "black", width: "100%" }}
            className="btn btn-primary"
            disabled={(userOtp != otp) | buttonLoadingStage2}
            type="submit"
          >
            {buttonLoadingStage2 && (
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
            {!buttonLoadingStage2 && "Register"}
          </button>
        </form>
      )}
    </div>
  );
}
