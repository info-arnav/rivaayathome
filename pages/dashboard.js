import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import FileResizer from "react-image-file-resizer";
import axios from "axios";
import Head from "../components/head";

export default function dashboard({ status, username }) {
  let router = useRouter();
  const [showOverAll, setShowOverAll] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => status == "loggedOut" && router.push("/"));
  const [image, setImage] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const editorRef = useRef(null);
  const [content, setContent] = useState(
    <p>This is the initial content of the editor.</p>
  );
  const [loading, setLoading] = useState(false);
  const post = () => {
    !title | !description | !image | !post | !tag
      ? setError(true)
      : (() => {
          setLoading(true);
          setError(false);
          axios
            .post("/api/post", {
              username: username,
              title: title,
              tag: tag,
              blog: content,
              description: description,
              image: image,
              compressed: compressedImage,
            })
            .then((e) => console.log(e.data));
        })();
  };
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };
  const imageChange = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        FileResizer.imageFileResizer(
          event.target.files[0],
          100,
          100,
          "webp",
          100,
          0,
          (uri) => {
            setCompressedImage(uri);
            try {
              FileResizer.imageFileResizer(
                event.target.files[0],
                500,
                500,
                "webp",
                100,
                0,
                (uri) => {
                  setImage(uri);
                  setShow(true);
                },
                "base64"
              );
            } catch (err) {
              console.log(err);
            }
          },
          "base64"
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  var useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <div>
      <Head
        url="https://www.daisforall.com/dashboard"
        title="DaisForAll | Dashboard"
        description="You can post your fantastic thoghts here for others to see."
      ></Head>
      <div
        hidden={showOverAll}
        style={{
          height: "600px",
          width: "100%",
          alignItems: "center",
          display: "flex",
        }}
      >
        <svg
          style={{
            marginLeft: "45%",
          }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="100%"
          style={{ maxWidth: "200px", marginLeft: "auto", marginRight: "auto" }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <path
            fill="none"
            stroke="#e90c59"
            stroke-width="8"
            stroke-dasharray="42.76482137044271 42.76482137044271"
            d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
            stroke-linecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;1"
              values="0;256.58892822265625"
            ></animate>
          </path>
        </svg>
      </div>
      {status == "loggedIn" && (
        <div style={{ width: "98%", marginLeft: "1%" }} hidden={!showOverAll}>
          <div
            style={{
              border: "1px solid #c0c0af",
              borderRadius: "5px",
              display: "inline-flex",
              fontSize: "16px",
              alignItems: "center",
              height: "38px",
              width: "100%",
              marginBottom: "21.6px",
            }}
          >
            <div
              style={{
                width: "80px",
                border: "1px solid #c0c0af",
                textAlign: "center",
                backgroundColor: "#edede8",
                height: "38px",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              Title
            </div>
            <input
              required
              style={{ marginLeft: "10px", height: "100%", width: "100%" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <Editor
            value={content}
            apiKey="pj9jgbi5jyqo7yzpy2wllqiw91bjvhm43wc8ug5ttzxg6wug"
            onInit={(evt, editor) => {
              editorRef.current = editor;
              setShowOverAll(true);
            }}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              selector: "textarea#full-featured-non-premium",
              plugins:
                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              link_list: [
                { title: "My page 1", value: "https://www.tiny.cloud" },
                { title: "My page 2", value: "http://www.moxiecode.com" },
              ],
              image_list: [
                { title: "My page 1", value: "https://www.tiny.cloud" },
                { title: "My page 2", value: "http://www.moxiecode.com" },
              ],
              image_class_list: [
                { title: "None", value: "" },
                { title: "Some class", value: "class-name" },
              ],
              importcss_append: true,
              file_picker_callback: function (callback, value, meta) {
                /* Provide file and text for the link dialog */
                if (meta.filetype === "file") {
                  callback("https://www.google.com/logos/google.jpg", {
                    text: "My text",
                  });
                }

                /* Provide image and alt text for the image dialog */
                if (meta.filetype === "image") {
                  callback("https://www.google.com/logos/google.jpg", {
                    alt: "My alt text",
                  });
                }

                /* Provide alternative source and posted for the media dialog */
                if (meta.filetype === "media") {
                  callback("movie.mp4", {
                    source2: "alt.ogg",
                    poster: "https://www.google.com/logos/google.jpg",
                  });
                }
              },
              templates: [
                {
                  title: "New Table",
                  description: "creates a new table",
                  content:
                    '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                },
                {
                  title: "Starting my story",
                  description: "A cure for writers block",
                  content: "Once upon a time...",
                },
                {
                  title: "New list with dates",
                  description: "New List with dates",
                  content:
                    '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                },
              ],
              template_cdate_format:
                "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
              template_mdate_format:
                "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
              height: 600,
              image_caption: true,
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              noneditable_noneditable_class: "mceNonEditable",
              toolbar_mode: "sliding",
              contextmenu: "link image imagetools table",
              skin: useDarkMode ? "oxide-dark" : "oxide",
              content_css: useDarkMode ? "dark" : "default",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              branding: false,
            }}
          />
          <br></br>
          <div>
            <div
              style={{
                border: "1px solid #c0c0af",
                borderRadius: "5px",
                marginBottom: 21.6,
                display: "inline-flex",
                fontSize: "16px",
                alignItems: "center",
                height: "38px",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "80px",
                  border: "1px solid #c0c0af",
                  textAlign: "center",
                  backgroundColor: "#edede8",
                  height: "38px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                Tags
              </div>
              <input
                required
                style={{ marginLeft: "10px", height: "100%", width: "100%" }}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              ></input>
            </div>
            <div
              style={{ position: "relative" }}
              onClick={() => {
                let a = document.querySelector(
                  ".custom-file-container__custom-file__custom-file-input"
                );
                a.click();
              }}
            >
              <span class="custom-file-container__custom-file__custom-file-control"></span>
              <input
                required
                type="file"
                style={{ width: "!00%" }}
                onChange={imageChange}
                className="custom-file-container__custom-file__custom-file-input "
              ></input>
            </div>
            {show && (
              <modal onClick={() => setShow(false)}>
                <modal-content onClick={(e) => e.stopPropagation()}>
                  <a
                    style={{ fontSize: "18px" }}
                    onClick={() => setShow(false)}
                  >
                    &times;
                  </a>
                  <img src={image} style={{ width: "100%" }}></img>
                </modal-content>
              </modal>
            )}
            {image ? (
              <div>
                <strong>✔ uploaded</strong>{" "}
                <a
                  style={{ border: "0.2px solid black", padding: "2px" }}
                  onClick={() => setShow(true)}
                >
                  Show
                </a>{" "}
                <a
                  style={{ border: "0.2px solid black", padding: "2px" }}
                  onClick={() => setImage(``)}
                >
                  Delete
                </a>
              </div>
            ) : (
              ""
            )}
            <br></br>
            <div
              style={{
                border: "1px solid #c0c0af",
                borderRadius: "5px",
                display: "inline-flex",
                fontSize: "16px",
                alignItems: "center",
                marginBottom: "21.6px",
                height: "38px",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "160px",
                  border: "1px solid #c0c0af",
                  textAlign: "center",
                  backgroundColor: "#edede8",
                  height: "38px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                Description
              </div>
              <input
                required
                style={{ marginLeft: "10px", height: "100%", width: "100%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            {error == true && (
              <div style={{ color: "red" }}>All fields are required</div>
            )}
            <button
              onClick={post}
              style={{
                marginBottom: 21.6,
                color: "white",
                borderRadius: 5,
                width: "100%",
                padding: 10,
                fontWeight: "bold",
                backgroundColor: "black",
              }}
              disabled={loading}
            >
              {loading ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
