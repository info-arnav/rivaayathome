//styles
import "../styles/global.css";
import "../styles/modal.css";
import "../styles/profile.css";
import "../styles/error404.scss";
import "../styles/search-box.css";
import "../styles/footer.css";
import "../styles/posts.scss";
//header
import Head from "../components/head";
//components
import Footer from "../components/footer";
//algolia
import algoliasearch from "algoliasearch/lite";
import {
  connectHitsPerPage,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch-dom";
//next
import Link from "next/link";
// JWT
import jwt from "njwt";
//loader
import "nprogress/nprogress.css";
//lazy
import "lazysizes";
//drodpown
import Select from "react-select";
//loader
import NProgress from "nprogress";
//automatic
import { useEffect, useState } from "react";
import Registeration from "../components/forNavigation/registeration";
const options = [
  { value: "Home", label: "Home" },
  { value: "About", label: "About" },
];
const options2 = [
  { value: "Logout", label: "Logout" },
  { value: "Dashboard", label: "Dashboard" },
];
import Login from "../components/forNavigation/login";
import { Router, useRouter } from "next/router";
const a = 10;
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);
  const [show, setShow] = useState(false);
  // algolia credentials
  const searchClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
  const [search, setSearch] = useState();
  const hit = ({ hit }) => {
    return (
      <div
        style={{
          width: "100%",
          marginBottom: "5px",
          boxShadow:
            "0 0 1px 0 rgb(8 11 14 / 6%), 0 3px 3px -1px rgb(8 11 14 / 10%)",
          border: "solid",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            borderRadius: "20px 20px 0 0px",
          }}
        >
          <img
            src={hit.image}
            style={{
              width: "100%",
              borderRadius: "20px 20px 0 0px",
              width: "100%",
            }}
          ></img>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          wewe
        </div>
      </div>
    );
  };
  // registeration and login
  const [modalForm, setModalForm] = useState(false);
  // loggedIn
  const router = useRouter();
  const [status, setStatus] = useState(false);
  const [username, setUsername] = useState(null);
  const [selectedOption, setSelectedOption] = useState({ label: "Home" });
  const route = (e) => {
    setSelectedOption(e);
    e.value == "Home" ? router.push("/") : router.push("/about");
  };
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      jwt.verify(
        localStorage.getItem("userData"),
        "ArnavGod30080422020731017817087571441",
        "HS512",
        function (err, verifiedJwt) {
          if (err) {
            localStorage.removeItem("userData");
            setStatus("loggedOut");
          } else {
            setUsername(verifiedJwt.body.username);
            setStatus("loggedIn");
          }
        }
      );
    } else {
      setStatus("loggedOut");
    }
  }, []);
  return (
    <div
      onClick={() => {
        setShow(false);
      }}
    >
      <Head></Head>
      <InstantSearch searchClient={searchClient} indexName="dev_BLOGS">
        <nav
          style={{
            paddingTop: "10px",
            backgroundColor: "white",
            top: 0,
            display: "inline-flex",
            alignItems: "center",
            position: "sticky",
            paddingBottom: "10px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            height="60"
            alt="Logo of DaisForALl platform made for people to share things with the world."
            src="/logo.webp"
            style={{
              marginLeft: "5px",
              borderRadius: "50%",
            }}
          ></img>
          <div className="toDrodown" style={{ display: "inherit" }}>
            <Link href="/" style={{}}>
              Home
            </Link>
            <Link href="/about" style={{}}>
              About
            </Link>
          </div>
          <Select
            isSearchable={false}
            onChange={route}
            options={options}
            value={selectedOption}
            className="aa"
          />
          <SearchBox
            style={{ margin: "5px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></SearchBox>
          {status && status == "loggedOut" ? (
            <div style={{ display: "flex" }} className="authentication">
              <button
                onClick={() => {
                  setModalForm("register");
                }}
                style={{
                  height: "50px",
                  padding: "20px",
                  borderRadius: "20px",
                  alignItems: "center",
                  display: "flex",
                  marginRight: "5px",
                  justifyContent: "center",
                  border: "none",
                  backgroundColor: "none",
                }}
              >
                <svg
                  style={{ borderRadius: "50%", width: "40px" }}
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="233.000000pt"
                  height="235.000000pt"
                  viewBox="0 0 233.000000 235.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,235.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M905 2333 c-335 -71 -656 -326 -805 -638 -94 -197 -95 -202 -95 -515
l0 -275 28 -82 c36 -104 103 -236 164 -322 69 -96 206 -235 284 -287 77 -51
246 -133 335 -163 166 -55 522 -55 688 0 93 31 281 124 350 173 188 135 352
366 437 617 30 88 33 105 37 265 7 283 -14 397 -116 599 -63 126 -113 197
-206 293 -105 109 -187 169 -322 236 -133 66 -213 92 -324 106 -123 15 -371
11 -455 -7z m528 -122 c354 -94 660 -398 755 -749 23 -87 26 -115 26 -277 1
-220 -17 -303 -98 -470 -110 -222 -284 -394 -510 -501 -150 -71 -239 -88 -451
-89 -146 0 -193 4 -250 19 -387 105 -677 395 -781 781 -15 57 -19 106 -19 255
0 163 3 195 23 270 94 345 363 630 704 744 115 39 168 45 353 42 133 -3 187
-8 248 -25z"
                    />
                    <path
                      d="M1560 1650 l0 -89 -92 -3 -93 -3 -3 -42 -3 -43 95 0 96 0 0 -100 0
-100 45 0 45 0 0 100 0 100 96 0 95 0 -3 43 -3 42 -92 3 -93 3 0 89 0 90 -45
0 -45 0 0 -90z"
                    />
                    <path
                      d="M966 1656 c-98 -36 -131 -91 -131 -216 0 -77 3 -90 31 -140 56 -100
148 -140 239 -106 54 21 108 81 129 144 31 89 16 213 -32 265 -48 53 -165 79
-236 53z"
                    />
                    <path
                      d="M930 1074 c-136 -24 -206 -62 -257 -138 -30 -44 -33 -55 -33 -126 l0
-77 91 -42 c117 -53 191 -71 304 -71 119 0 211 21 317 72 l88 41 0 69 c0 135
-65 217 -205 255 -51 14 -259 25 -305 17z"
                    />
                  </g>
                </svg>
              </button>
              <button
                onClick={() => {
                  setModalForm("login");
                }}
                style={{
                  height: "50px",
                  marginRight: "5px",
                  borderRadius: "20px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  border: "none",
                  backgroundColor: "none",
                }}
              >
                <svg
                  style={{ borderRadius: "50%", width: "36px" }}
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="175.000000pt"
                  height="183.000000pt"
                  viewBox="0 0 175.000000 183.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,183.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M720 1821 c-212 -31 -452 -158 -571 -303 -62 -75 -149 -217 -149
-243 0 -3 33 -5 73 -5 l72 1 45 70 c110 174 312 305 520 338 566 92 1034 -448
863 -994 -85 -274 -314 -476 -601 -531 -215 -41 -454 20 -624 161 -72 59 -149
148 -179 207 l-19 38 -75 0 c-41 0 -75 -3 -75 -7 0 -3 16 -36 36 -72 90 -165
218 -290 387 -377 296 -153 668 -125 941 70 69 49 177 159 226 231 180 261
203 630 58 920 -63 125 -185 265 -300 344 -73 49 -205 109 -289 130 -88 22
-258 33 -339 22z"
                    />
                    <path
                      d="M908 1125 l-3 -140 -452 -3 -453 -2 0 -65 0 -65 452 -2 453 -3 3
-138 3 -139 169 170 c94 93 170 173 170 178 0 5 -76 85 -170 179 l-169 169 -3
-139z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          ) : (
            <div class="show-sropdown" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setShow(!show);
                }}
                className="userLoggedin"
                style={{
                  ":hover": { borderRadius: "50% !important" },
                  width: 50,
                  height: 50,
                  minWidth: 50,
                  borderRadius: "50%",
                  marginRight: 5,
                }}
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.000000pt"
                  height="20.000000pt"
                  viewBox="0 0 64.000000 64.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M241 469 c-26 -26 -31 -38 -31 -79 0 -41 5 -53 31 -79 26 -26 38 -31
79 -31 41 0 53 5 79 31 26 26 31 38 31 79 0 41 -5 53 -31 79 -26 26 -38 31
-79 31 -41 0 -53 -5 -79 -31z m136 -21 c51 -48 15 -138 -56 -138 -47 0 -81 32
-81 79 0 72 84 109 137 59z"
                    />
                    <path
                      d="M466 258 c-9 -12 -16 -37 -16 -54 0 -19 -6 -34 -15 -38 -18 -7 -20
-64 -3 -101 13 -29 55 -55 88 -55 33 0 75 26 88 55 17 37 15 94 -3 101 -9 4
-15 19 -15 38 0 50 -24 76 -70 76 -29 0 -43 -6 -54 -22z m88 -24 c3 -9 6 -27
6 -40 0 -21 -4 -24 -40 -24 -36 0 -40 3 -40 24 0 41 11 56 40 56 16 0 30 -7
34 -16z m-24 -139 c0 -14 -4 -25 -10 -25 -5 0 -10 11 -10 25 0 14 5 25 10 25
6 0 10 -11 10 -25z"
                    />
                    <path
                      d="M219 210 c-36 -19 -99 -83 -99 -100 0 -20 21 -9 50 24 45 51 90 68
165 64 35 -1 67 1 71 5 31 31 -131 37 -187 7z"
                    />
                  </g>
                </svg>
              </button>
              {show && (
                <div
                  x-placement="bottom-end"
                  aria-labelledby="dropdown-menu-align-right"
                  class="dropdown-menu show dropdown-menu-right"
                  style={{
                    position: "absolute",
                    inset: "0px auto auto 0px",
                    margin: "0px",
                    transform: "translate3d(-80px, 40px, 0px)",
                  }}
                  data-popper-reference-hidden="false"
                  data-popper-escaped="false"
                  data-popper-placement="bottom-end"
                >
                  <a
                    onClick={() => {
                      setShow(false), router.push("/dashboard");
                    }}
                    class="dropdown-item"
                    role="button"
                  >
                    Dashboard
                  </a>
                  <a
                    onClick={() => {
                      setShow(false), router.push(`/profile/${username}`);
                    }}
                    class="dropdown-item"
                    role="button"
                  >
                    Your Profile
                  </a>
                  <a
                    onClick={() => {
                      setShow(false), router.push(`/bookmarked/${username}`);
                    }}
                    class="dropdown-item"
                    role="button"
                  >
                    Bookmarked
                  </a>
                  <a
                    onClick={() => {
                      setShow(false), router.push(`/feed/${username}`);
                    }}
                    class="dropdown-item"
                    role="button"
                  >
                    Feed
                  </a>

                  <a
                    class="dropdown-item"
                    role="button"
                    onClick={() => {
                      localStorage.removeItem("userData");
                      location.reload();
                    }}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          )}
        </nav>

        {modalForm && (
          <modal onClick={() => setModalForm(false)}>
            <modal-content onClick={(e) => e.stopPropagation()}>
              <a
                style={{ fontSize: "25px" }}
                className="open"
                onClick={() => setModalForm(false)}
              >
                &times;
              </a>
              <br></br>
              {modalForm == "register" && (
                <div>
                  <Registeration></Registeration>
                  <br></br>
                  <center>
                    already registered ?{" "}
                    <a
                      onClick={() => {
                        setModalForm("login");
                      }}
                    >
                      Login Here
                    </a>
                  </center>
                </div>
              )}
              {modalForm == "login" && (
                <div>
                  <Login></Login>
                  <br></br>
                  <center>
                    not yet registered ?{" "}
                    <a
                      onClick={() => {
                        setModalForm("register");
                      }}
                    >
                      Register Here
                    </a>
                  </center>
                </div>
              )}
            </modal-content>
          </modal>
        )}
        {search ? (
          <Hits hitComponent={hit} s></Hits>
        ) : (
          status && (
            <Component {...pageProps} status={status} username={username} />
          )
        )}
        {status && <Footer></Footer>}
      </InstantSearch>
    </div>
  );
}

export default MyApp;
