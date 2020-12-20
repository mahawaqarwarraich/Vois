import React, {useState, useEffect} from 'react';
import "./ProfileUI.css";
import axios from "axios";
import authHeader from "../../../../services/auth-header";
import ArticleCard from "../../../../components/ArticlesDirectory/ArticleCardUI/ArticleCardUI";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Skeleton } from "@material-ui/lab";
import {useSpeechRecognition} from "react-speech-recognition";


const ProfileUI = (props) => {

  let inputElement = null;

  const [myLatestFavArticles, setMyLatestFavArticles] = useState(null);
  const [myLatestArticles, setMyLatestArticles] = useState(null);
  const [profilePicture,setProfilePicture] = useState(null);
  const [username, setUsername] = useState("Loading...");
  const [loading, setLoading] = useState(false);
  const [userId,setUserId] = useState(null);
  const [uploadPictureDialogState, setUploadPictureDialogState] = useState(false);


  const commands = [
    {
      command: 'upload profile picture',
      callback: () => {uploadProfilePicture()},
      description: 'Uploads new profile picture'
    },
    {
      command: 'go back',
      callback: () => props.history.goBack(),
      description: "Goes back to the previous page",
    },
    {
      command: 'scroll down',
      callback: () => window.scrollTo({top: window.pageYOffset+500,behavior:"smooth"})
    },
    {
      command: 'scroll up',
      callback: () => window.scrollTo({top: window.pageYOffset-500,behavior:"smooth"})
    }
  ];


  const {Transcript} = useSpeechRecognition({commands});


  useEffect(() => {
    axios
        .get("http://localhost:8000/get-my-latest-blogs", {
          headers: authHeader(),
        })
        .then((response) => {
          console.log(response.data.articles);
          setMyLatestArticles(response.data.articles);
        })
        .catch((error) => {
          console.log(error);
        });

  }, []);

  useEffect(()=>{
    axios
        .get("http://localhost:8000/get-latest-fav-articles", {
          headers: authHeader(),
        })
        .then((response) => {
          console.log(response.data.favArticles);
          setMyLatestFavArticles(response.data.favArticles);
        })
        .catch((error) => {
          console.log(error);
        });

  },[]);

  useEffect(()=>{
    axios
        .get("http://localhost:8000/get-profile/" + props.match.params.userId, {
          headers: authHeader(),
        })
        .then((response) => {
          console.log(response.data.userProfile);

          setUsername(response.data.username);
          setUserId(response.data.userId);
          setProfilePicture(response.data.userProfile.ProfilePhotoSecureId);

        })
        .catch((error) => {
          console.log(error);
        });

  }, []);

  const viewMyAllBlogs = () => {
    const url = "blogs/my-blogs";
    this.props.history.push(url);
  };

  const viewAllFavBlogs = () => {
    const url = "blogs/my-fav-blogs";
    this.props.history.push(url);
  };

  const uploadProfilePicture = () => {
    setUploadPictureDialogState(true);
  };

  const fileSelectedHandler = (event) => {
    setProfilePicture(event.target.files[0]);

    const fd = new FormData();
    fd.append("picture", event.target.files[0]);
    setLoading(true);
    axios
        .post("http://localhost:8000/upload-profile-picture", fd, {
          headers: authHeader(),
        })
        .then((response) => {
          setLoading(false);
          setProfilePicture(response.data.picture);
        });
  };

    return (
        <React.Fragment>
          {loading ? <LinearProgress /> : ""}
          <div className="profile">
            <div className="profile__details">
              <div className="profile__details--content">
                <div
                    className="profile__details--content-profile-pic"
                    style={{ backgroundImage: `url(${profilePicture})` }}
                >
                  {userId === JSON.parse(localStorage.getItem("user")).userId ? <React.Fragment><label
                          htmlFor="upload-image"
                          className="profile__details--content-profile-pic-change"
                      >
                        <h3>Upload New</h3>
                      </label>
                      <input
                          id="upload-image"
                          type="file"
                          onChange={fileSelectedHandler}
                      />
                  </React.Fragment> : <></>
                  }
                </div>
                <h2 className="profile__details--content-username">
                  {username}
                </h2>
                <div className="profile__details--content-description">
                  <div className="profile__details--content-description-header">
                    <h3 className="profile__details--content-description-header-heading">
                      Description
                    </h3>
                    <a
                        href=""
                        className="profile__details--content-description-header-edit"
                    >
                      Edit Description
                    </a>
                  </div>
                  <p className="profile__details--content-description-content">
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                    used in laying out print, graphic or web designs. The passage is
                    attributed to an unknown typesetter in the 15th century who is
                    thought to have scrambled parts of Cicero's De Finibus Bonorum
                    et Malorum for use in a type specimen book. Lorem ipsum, or
                    lipsum as it is sometimes known, is dummy text used in laying
                    out print, graphic or web designs. The passage is attributed to
                    an unknown typesetter in the 15th century who is thought to have
                    scrambled parts of Cicero's De Finibus Bonorum et Malorum for
                    use in a type specimen book.
                  </p>
                </div>
              </div>
              <div className="profile__details--boundary"></div>
            </div>
            <div className="profile__activity">
              <div className="profile__activity--blogs">
                <h2 className="profile__activity--blogs-heading">My Published Articles</h2>
                <div className="profile__activity--blogs-my-blogs">
                  {myLatestArticles ? (
                      myLatestArticles.map((article) => (
                          <ArticleCard
                              key={article._id}
                              id={article._id}
                              title={article.Title}
                              picture={article.PictureSecureId}
                              body={article.Body}
                              postedOn={article.PostedOn}
                              author = {article.Author.authorName}
                          />
                      ))
                  ) : (
                      <React.Fragment>
                        {[...Array(4)].map((element, index) => (
                            <Skeleton
                                variant="rect"
                                height={280}
                                width={210}
                                key={index}
                            />
                        ))}
                      </React.Fragment>
                  )}
                </div>
                <a
                    className="profile__activity--blogs-view"
                    onClick={viewMyAllBlogs}
                >
                  View All
                </a>
              </div>
              <div className="profile__activity--my-favorites">
                <h2 className="profile__activity--blogs-heading">My Favorites</h2>
                <div className="profile__activity--blogs-my-blogs">
                  {myLatestFavArticles ? (
                      myLatestFavArticles.map((article) => (
                          <ArticleCard
                              key={article._id}
                              id={article._id}
                              title={article.Title}
                              picture={article.PictureSecureId}
                              body={article.Body}
                              postedOn={article.PostedOn}
                              author = {article.Author.authorName}
                          />
                      ))
                  ) : (
                      <React.Fragment>
                        {[...Array(4)].map((element, index) => (
                            <Skeleton
                                variant="rect"
                                height={280}
                                width={210}
                                key={index}
                            />
                        ))}
                      </React.Fragment>
                  )}
                </div>
                <a
                    className="profile__activity--blogs-view"
                    onClick={viewAllFavBlogs}
                >
                  View All
                </a>
              </div>
            </div>
          </div>
        </React.Fragment>
    );
}

export default ProfileUI;
