import axios from "axios";
import { useState } from "react";
import FileResizer from "react-image-file-resizer";

export default function profileSelf({
  username,
  name,
  profile,
  email,
  facebook,
  instagram,
  twitter,
  linkedin,
  website,
  github,
  followers,
  Following,
  images,
  posts,
}) {
  const imageMange = (e) => {
    FileResizer.imageFileResizer(
      e.target.files[0],
      500,
      500,
      "webp",
      100,
      0,
      (uri) => {
        try {
          axios
            .post("/api/profile.image-update", {
              username: username,
              image: uri,
            })
            .then((e) => setImage(uri));
        } catch (err) {
          console.log(err);
        }
      },
      "base64",
      500,
      500
    );
  };
  const [emails, setemail] = useState(email);
  const [usernames, setusername] = useState(username);
  const [facebooks, setfacebook] = useState(facebook);
  const [instagrams, setinstagram] = useState(instagram);
  const [twitters, settwitter] = useState(twitter);
  const [linkedins, setlinkedin] = useState(linkedin);
  const [websites, setwebsite] = useState(website);
  const [githubs, setgithub] = useState(github);
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState(profile);
  const [image, setImage] = useState(images);
  const changes = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/profile-update", {
        facebook: facebooks,
        instagram: instagrams,
        twitter: twitters,
        linkedin: linkedins,
        website: websites,
        github: githubs,
        about: about,
        username: username,
      })
      .then((e) => setLoading(false));
  };
  return (
    <div>
      <div
        class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage: "url(/headrt.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span class="mask bg-gradient-default opacity-8"></span>

        <div class="container-fluid d-flex align-items-center">
          <div class="row">
            <div class="col-lg-7 col-md-10">
              <h1 class="display-2 text-white">{"Hello " + username}</h1>
              <p class="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div class="card card-profile shadow">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image">
                    <input
                      className="input-image"
                      type="file"
                      hidden
                      onChange={imageMange}
                    ></input>
                    <a
                      onClick={() =>
                        document
                          .getElementsByClassName("input-image")[0]
                          .click()
                      }
                    >
                      <img height={180} src={image} class="rounded-circle" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div class="d-flex justify-content-between"></div>
              </div>
              <div class="card-body pt-0 pt-md-4">
                <div class="row">
                  <div class="col">
                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span class="heading">{followers.length}</span>
                        <span class="description">Followes</span>
                      </div>
                      <div>
                        <span class="heading">{posts}</span>
                        <span class="description">Posts</span>
                      </div>
                      <div>
                        <span class="heading">{Following.length}</span>
                        <span class="description">Following</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <h3>{name}</h3>

                  <hr class="my-4" />
                  <p>{profile}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8 order-xl-1">
            <div class="card bg-secondary shadow">
              <div class="card-header bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My account</h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form onSubmit={changes}>
                  <h6 class="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Username
                          </label>
                          <input
                            required
                            type="text"
                            id="input-username"
                            class="form-control form-control-alternative"
                            placeholder="Username"
                            value={usernames}
                            disabled
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label class="form-control-label" for="input-email">
                            Email address
                          </label>
                          <input
                            required
                            type="email"
                            disabled
                            id="input-email"
                            class="form-control form-control-alternative"
                            value={emails}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label
                            class="form-control-label"
                            for="input-first-name"
                          >
                            Name
                          </label>
                          <input
                            required
                            type="text"
                            id="input-first-name"
                            class="form-control form-control-alternative"
                            placeholder="First name"
                            value={name}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <h6 class="heading-small text-muted mb-4">
                    Social Media information
                  </h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-address">
                            Facebook
                          </label>
                          <input
                            id="input-address"
                            class="form-control form-control-alternative"
                            placeholder="Facebook"
                            value={facebooks}
                            onChange={(e) => setfacebook(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-address">
                            Instagram
                          </label>
                          <input
                            id="input-address"
                            class="form-control form-control-alternative"
                            placeholder="Instagram"
                            value={instagrams}
                            onChange={(e) => setinstagram(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-address">
                            Twitter
                          </label>
                          <input
                            id="input-address"
                            class="form-control form-control-alternative"
                            placeholder="Twitter"
                            value={twitters}
                            onChange={(e) => settwitter(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-address">
                            Linkedin
                          </label>
                          <input
                            id="input-address"
                            class="form-control form-control-alternative"
                            placeholder="Linkedin"
                            value={linkedins}
                            onChange={(e) => setlinkedin(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-address">
                            Website
                          </label>
                          <input
                            id="input-address"
                            class="form-control form-control-alternative"
                            placeholder="Website"
                            value={websites}
                            onChange={(e) => setwebsite(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group focused">
                          <label class="form-control-label" for="input-address">
                            Github
                          </label>
                          <input
                            id="input-address"
                            class="form-control form-control-alternative"
                            placeholder="Github"
                            value={githubs}
                            onChange={(e) => setgithub(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <h6 class="heading-small text-muted mb-4">About me</h6>
                  <div class="pl-lg-4">
                    <div class="form-group focused">
                      <label>About Me</label>
                      <textarea
                        required
                        value={about}
                        rows="4"
                        class="form-control form-control-alternative"
                        placeholder="A few words about you ..."
                        onChange={(e) => setAbout(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <hr></hr>
                  <button
                    style={{
                      width: "100%",
                      height: "30px",
                      backgroundColor: "black",
                      color: "White",
                      borderRadius: "5px",
                      disabled: loading,
                    }}
                  >
                    {!loading && "Save Changes"}
                    {loading && (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
