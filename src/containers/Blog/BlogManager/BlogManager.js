import React, {useEffect, useState} from "react";
import {convertFromRaw, EditorState} from 'draft-js';

import BlogUI from "../../../components/Blog/BlogUI";
import axios from 'axios';
import AddComment from "../AddComment";

function BlogManager(props) {
    const [blogLiked, setBlogLiked] = useState(false);

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

    useEffect(() => {
        const id = props.match.params.id;

        axios.get('http://localhost:8000/get-article/' + id)
            .then(res => {
                console.log(res);
                let article = res.data.article;
                let config;

                console.log(article.Body);
                if (props.json) {
                    config = {
                        header: {
                            imageURL: article.PictureSecureId,
                            title: article.Title,
                            author: "Haysam Tahir",
                            createdOn: article.PostedOn,
                        },
                        body: {
                            likeToggled: handleBlogLikeToggled,
                            content: EditorState.createWithContent(convertFromRaw(JSON.parse(article.Body))),
                        },
                    }
                    console.log(config.body.content);
                } else {
                    config = {
                        header: {
                            imageURL: article.PictureSecureId,
                            title: article.Title,
                            author: "Haysam Tahir",
                            createdOn: article.PostedOn,
                        },
                        body: {
                            likeToggled: handleBlogLikeToggled,
                            content: article.Body,
                        },
                    }
                }

                setBlogConfig(prevconfig => {
                    setViewBlog(true);
                    return config;
                });
            })

        //send axios request
        //setBlogConfig
        // config = {
        //     header: {
        //         imageURL:
        //             "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        //         title: "ISSB INITIAL PREPARATION TIPS",
        //         author: "Haysam Tahir",
        //         createdOn: "09/26/2020",
        //     },
        //     body: {
        //         likeToggled: handleBlogLikeToggled,
        //         content: ''
        //     },
        // }
    }, [])



    return (
        <React.Fragment>
            {blogConfig ? <BlogUI viewBlog={viewBlog} json={props.json ? true : false} setCommands={props.setCommands} config={{...blogConfig}} {...props}/> : 'Loading...'}

        </React.Fragment>
    );
}

export default BlogManager;
