import React from "react";

import BlogHeader from "./BlogHeader";
import BlogBody from "./BlogBody";

function BlogUI(props) {
  return (
    <React.Fragment>
      <BlogHeader config={props.config.header} />
      <BlogBody config={props.config.body} />
    </React.Fragment>
  );
}

export default BlogUI;
