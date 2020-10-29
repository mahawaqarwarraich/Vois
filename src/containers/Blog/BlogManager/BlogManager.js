import React, {useEffect, useState} from "react";

import BlogUI from "../../../components/Blog/BlogUI";
import axios from 'axios';

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

    useEffect(() => {
        const id = props.match.params.id;
        axios.get('http://localhost:8000/get-article/' + id)
            .then(res => {
                console.log(res);
                let article = res.data.article;
                let config = {
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
                setBlogConfig(config);
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
            {blogConfig ? <BlogUI config={{...blogConfig}} {...props}/> : 'Loading...'}

        </React.Fragment>
    );
}

export default BlogManager;
