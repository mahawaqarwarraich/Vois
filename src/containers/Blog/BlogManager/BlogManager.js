import React, {useEffect, useState} from "react";
import {convertFromRaw, EditorState} from 'draft-js';

import BlogUI from "../../../components/Blog/BlogUI";
import axios from 'axios';
import AddComment from "../AddComment";
import {useSpeechRecognition} from "react-speech-recognition";
import authHeader from "../../../services/auth-header";
import authService from "../../../services/auth-service";
import LinearProgress from "@material-ui/core/LinearProgress";

import {useSnackbar} from 'notistack';


function BlogManager(props) {
    const [blogId, setBlogId] = useState(props.match.params.id);
    const [blogLiked, setBlogLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userPic, setUserPic] = useState("");
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [owner, setOwner] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [numOfLikes, setNumOfLikes] = useState(0);
    const [numOfComments, setNumOfComments] = useState(0);
    const {enqueueSnackbar} = useSnackbar();

    const handleBlogLikeToggled = () => {
        alert("Blog Liked");
    };

    const [counter, setCounter] = useState(0);

    const handleCommentBoxOpened = () => {
        setCounter((prevState) => prevState + 1);
    };

    const handleCommentBoxOpenedStatusChange = (status) => {
        alert("comment manager responded with status: " + status);
    };

    const [blogConfig, setBlogConfig] = useState({});
    const [viewBlog, setViewBlog] = useState(false);

    // useEffect(() => {
    //     const id = props.match.params.id;
    //
    //     axios.get('http://localhost:8000/get-article/' + id)
    //         .then(res => {
    //             console.log(res);
    //             let article = res.data.article;
    //             let config;
    //
    //             console.log(article.Body);
    //             if (props.json) {
    //                 config = {
    //                     header: {
    //                         imageURL: article.PictureSecureId,
    //                         title: article.Title,
    //                         author: "Haysam Tahir",
    //                         createdOn: article.PostedOn,
    //                     },
    //                     body: {
    //                         likeToggled: handleBlogLikeToggled,
    //                         content: EditorState.createWithContent(convertFromRaw(JSON.parse(article.Body))),
    //                     },
    //                 }
    //                 console.log(config.body.content);
    //             } else {
    //                 config = {
    //                     header: {
    //                         imageURL: article.PictureSecureId,
    //                         title: article.Title,
    //                         author: "Haysam Tahir",
    //                         createdOn: article.PostedOn,
    //                     },
    //                     body: {
    //                         likeToggled: handleBlogLikeToggled,
    //                         content: article.Body,
    //                     },
    //
    //             }
    //
    //             setBlogConfig(prevconfig => {
    //                 setViewBlog(true);
    //                 return config;
    //             });
    //         })
    //
    // }, [])

    const handleLikeArticle = () => {
        setLoading(true);
        let auth = authHeader();
        if (auth) {
            if (auth.Authorization) {
                axios.post("http://localhost:8000/like-article", {
                    articleId: blogId,
                }, {
                    headers: auth
                }).then(res => {
                    console.log(res);

                    axios
                        .get("http://localhost:8000/get-article/" + blogId)
                        .then(res => {
                            let likes = res.data.article.Likes;
                            let isLiked;
                            likes.forEach(likerId => {
                                if (likerId == userId) {
                                    setIsLiked(true);
                                    isLiked = true;
                                }
                            })
                            setNumOfLikes(likes.length);
                            if (!isLiked) {
                                setIsLiked(false);
                                enqueueSnackbar('You unliked this article');

                            } else {
                                let variant = 'success';
                                enqueueSnackbar('You liked this article', {variant});
                            }
                            setLoading(false);
                        })
                        .catch(err => {
                            console.log(err)
                            let variant = 'error';
                            enqueueSnackbar('Something went wrong. Make sure you are connected to the internet', {variant});
                        })

                }).catch(err => {
                    console.log(err);
                })
            } else {
                props.history.push('/login')
            }
        } else {
            props.history.push('/login')
        }
    }


    const commands = [
        {
            command: 'go back',
            callback: () => props.history.goBack(),
            description: 'Goes back to the previous page',
        },
        {
            command: 'scroll down',
            callback: () => window.scrollTo({top: window.pageYOffset + 500, behavior: "smooth"})
        },
        {
            command: 'scroll up',
            callback: () => window.scrollTo({top: window.pageYOffset - 500, behavior: "smooth"})
        },
        {
            command: 'like article',
            callback: handleLikeArticle,
            description: 'Likes the article',
        },
        {
            command: 'add comment',
            callback: () => setShowAddComment(true),
            description: 'Opens up an input field for adding a comment.'
        },
    ];
    const updateSidebar = () => {
        props.setCommands(commands);
    }
    useEffect(() => {
        updateSidebar();
    }, [])

    const [showAddComment, setShowAddComment] = useState(false);
    const hideAddComment = () => {
        setShowAddComment(false);
        updateSidebar();
    }


    const updateBlogConfig = (userId) => {
        axios
            .get("http://localhost:8000/get-article/" + blogId)
            .then((res) => {
                let owner = false;
                if (userId) {
                    if (userId === res.data.article.Author.id) {
                        owner = true;
                        setOwner(true);
                    }
                }
                let d = new Date(res.data.article.PostedOn);
                const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

                const numOfComments = res.data.article.Comments.length;
                const numOfLikes = res.data.article.Likes.length;
                console.log(res.data.article);
                let isLiked;
                res.data.article.Likes.forEach(likerId => {
                    if (likerId == userId) {
                        setIsLiked(true);
                        isLiked = true;
                    }
                })
                setNumOfLikes(res.data.article.Likes.length);
                setNumOfComments(res.data.article.Comments.length);
                if (!isLiked)
                    setIsLiked(false);
                setBlogConfig({
                    blogStats: {
                        numOfComments: numOfComments,
                    },
                    comments: [res.data.article.comments],
                    // let data = {
                    header: {
                        owner: owner,
                        imageURL: res.data.article.PictureSecureId,
                        title: res.data.article.Title,
                        author: res.data.article.Author.authorName,
                        createdOn: date,
                        // editArticle: () => editArticle(res.data.article._id),
                        // deleteArticle: () => deleteArticle(res.data.article._id),
                    },
                    body: {
                        content: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.article.Body))),
                        likeToggled: handleBlogLikeToggled,
                        commentBoxOpened: handleCommentBoxOpened,
                    },
                    // };
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {
        let _user = authService.getCurrentUser();
        if (_user && _user.userId) {
            setUsername(_user.username);
            setUserId(_user.userId);
            axios
                .get("http://localhost:8000/get-profile", {headers: authHeader()})
                .then((res) => {
                    console.log(res);
                    setUserPic(res.data.userProfile.ProfilePhotoSecureId);
                    updateBlogConfig(_user.userId);
                })
                .catch((err) => {
                    console.log(err);
                    updateBlogConfig(null);
                });
        } else {
            updateBlogConfig(null);
        }

    }, []);


    const {Transcript} = useSpeechRecognition({commands});

    const updateCommentsStats = () => {
        axios.get("http://localhost:8000/get-blog-comments?articleId=" + blogId)
            .then(res => {
                console.log(res, "comments fetched");
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleAddComment = text => {
        setLoading(true);
        axios.post("http://localhost:8000/comment/add-new", {
            text: text,
            articleId: blogId,
        }, {headers: authHeader()}).then(res => {
            console.log(res, "comment");
            setLoading(false);
            updateCommentsStats();
            setShowAddComment(false);
            updateSidebar();
            let variant = "success";
            enqueueSnackbar("Your comment has been added successfully", {variant})

        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <React.Fragment>
                {loading ? <LinearProgress style={{
                    // backgroundColor: '#4285f4'
                    color: '#4285f4',
                }}/> : ''}
                {blogConfig ? <BlogUI showAddComment={showAddComment} viewBlog={viewBlog}
                                      config={{...blogConfig}} {...props} setCommands={props.setCommands}
                                      isLiked={isLiked}
                                      numOfLikes={numOfLikes}
                                      numOfComments={numOfComments}
                                      commentsConfig={{
                                          addComment: handleAddComment,
                                          imageURL: userPic,
                                          username: username,
                                          userId: userId,
                                          articleTitle: blogConfig.header ? blogConfig.header.title : 'Loading article name...',
                                          coverImageURL: blogConfig.header ? blogConfig.header.imageURL : '',
                                          hide: hideAddComment
                                      }}/> : 'Loading...'}
        </React.Fragment>
    );
}

export default BlogManager;
