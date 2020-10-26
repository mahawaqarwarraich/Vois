import React, {useEffect, useState} from "react";

import BlogUI from "../../../components/Blog/BlogUI";

function BlogManager() {
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

    useEffect(() => {
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

    const [blogConfig, setBlogConfig] = useState(undefined);

    return (
        <React.Fragment>
            {blogConfig ? <BlogUI config={blogConfig}/> : 'Loading...'}

        </React.Fragment>
    );
}

export default BlogManager;
