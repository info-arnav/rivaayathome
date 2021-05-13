import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import validator from "validator";
import axios from "axios";
export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const contactUs = (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      setEmailError(false);
      setDisabled(true);
      axios
        .post("/api/contact", { email: email, message: message })
        .then((e) => {
          window.location.pathname = "";
        });
    } else {
      setEmailError(true);
    }
  };
  return (
    <footer id="footer" className="footer-1">
      <div className="main-footer widgets-dark typo-light">
        <div className="" style={{ marginRight: "20px", marginLeft: "20px" }}>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget subscribe no-box">
                <Link href="/" style={{ cursor: "pointer" }}>
                  <h5 className="widget-title" style={{ cursor: "pointer" }}>
                    DaisForAll
                    <span></span>
                  </h5>
                </Link>
                <p>
                  DaisForAll offers an opportunity to every blogger out there to
                  display their thoughts in front of everyone. ‘Better to write
                  for yourself and have no public, than to write for the public
                  and have no self’. DaisForAll is a website where you can write
                  your thoughts and let people live in a thousand worlds before
                  they die.
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Quick Links<span></span>
                </h5>
                <ul className="thumbnail-widget">
                  <li>
                    <Link href="/">&nbsp;Home</Link>
                  </li>
                  <li>
                    <Link href="/about">&nbsp;About</Link>
                  </li>
                  <li>
                    <Link href="/blogs">&nbsp;Blogs</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">&nbsp;Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/dashboard">&nbsp;Dashboard</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Follow up<span></span>
                </h5>
                {[
                  {
                    url: "https://www.facebook.com/infinity.newTechnology",
                    image: "/facebook.webp",
                    media: "links to facebook social media platform",
                  },
                  {
                    url: "https://www.instagram.com/infinity.newtech/",
                    image: "/instagram.webp",
                    media: "links to instagram social media platform",
                  },
                  {
                    url: "https://twitter.com/infinityNewTech",
                    image: "/twitter.webp",
                    media: "links to twitter social media platform",
                  },
                  {
                    url: "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
                    image: "/linkedin.webp",
                    media: "links to linkedin social media platform",
                  },
                ].map((e) => (
                  <a className="fa" href={e.url} style={{ marginRight: "4px" }}>
                    {" "}
                    <Image
                      src={e.image}
                      alt={e.media}
                      height="11"
                      width="11px"
                    ></Image>
                  </a>
                ))}
              </div>
            </div>
            <br />
            <br />
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Contact Us<span></span>
                </h5>
                <p>Wanna ask something? Send a message here.</p>
                <br></br>
                <form onSubmit={contactUs} className="emailfield">
                  <div md="4" className="form-group">
                    {emailError && (
                      <span
                        style={{
                          marginTop: "0px",
                          fontSize: "14px",
                          color: "red",
                        }}
                      >
                        Please enter a valid E-Mail
                      </span>
                    )}
                    <input
                      type="email"
                      required={true}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email*"
                      id="validationCustom01"
                      className="form-control"
                    />
                  </div>
                  <div md="4" className="form-group">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required={true}
                      placeholder="Message*"
                      id="validationCustom02"
                      className="form-control"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={disabled}
                    className="btn btn-primary"
                  >
                    {disabled ? (
                      <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      "Share Response"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="white">
                Copyright{" "}
                <Link
                  className="white"
                  href="/"
                  style={{ color: "white !important" }}
                >
                  <span className="white" style={{ cursor: "pointer" }}>
                    DaisForAll
                  </span>
                </Link>{" "}
                @ 2021. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
