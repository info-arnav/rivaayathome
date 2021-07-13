//styles
import "../styles/global.css";
import "../styles/modal.css";
import "../styles/profile.scss";
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
const options = [{ value: "Home", label: "Home" }];
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
  const color = [
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
    "#2dd22d",
    "#ff1a1a",
    "#3939c6",
    "#b85cd6",
  ];
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
    "ZJLJW3F57V",
    "aeadf5a2871e3b10e5fa1b406098ea45"
  );
  const [search, setSearch] = useState();
  const hit = ({ hit }) => {
    return (
      <figure href={`/product/${hit._id}`}>
        <img src={`/api/image/post/${hit._id}`} />
        <figcaption>{hit.title}</figcaption>
        <span class="price">{hit.tags}INR</span>
        <a class="button" href={`/product/${hit._id}`}>
          Buy Now
        </a>
      </figure>
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
      <InstantSearch searchClient={searchClient} indexName="dev_PRODUCTS">
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
            alt="Logo of Rivaayat platform made for people to share things with the world."
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
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`/api/image/user/${username}`}
                  width={50}
                  height={50}
                  style={{
                    ":hover": { borderRadius: "50% !important" },
                    width: 50,
                    height: 50,
                    minWidth: 50,
                    overflow: "hidden",
                  }}
                />
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
                    transform: "translate3d(-40px, 40px, 0px)",
                  }}
                  data-popper-reference-hidden="false"
                  data-popper-escaped="false"
                  data-popper-placement="bottom-end"
                >
                  <a
                    onClick={() => {
                      setShow(false), router.push(`/dashboard/${username}`);
                    }}
                    class="dropdown-item"
                    role="button"
                  >
                    {username != "rivaayat1" ? "Cart" : "New Product"}
                  </a>
                  {username != "rivaayat1" && (
                    <a
                      onClick={() => {
                        setShow(false), router.push(`/orders/${username}`);
                      }}
                      class="dropdown-item"
                      role="button"
                    >
                      Orders
                    </a>
                  )}
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
          <div id="wrap">
            <Hits
              style={{
                display: "flex",
                alignItems: "center !important",
                flexWrap: "wrap !important",
                marginRight: "10px",
                width: "calc(100% - 10px)",
              }}
              className="ashajfbds"
              hitComponent={hit}
              s
            ></Hits>
          </div>
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
