import React, { useContext } from "react";

import BlogSignatureHeading from "../../../../components/UIWidgets/Typography/BlogSignatureHeading";
import DotList from "../../../../components/UIWidgets/DotList";

import ThemeContext from "../../../../contexts/ThemeContext";

import "./style.scss";

function BlogHeader(props) {
  const theme = useContext(ThemeContext);
  const currTheme = "blue";

  return (
    <React.Fragment>
      <div
        style={{ backgroundImage: `url(${props.config.imageURL})` }}
        className="blog-header blog-header--pixel"
      >
        <div style={{ color: theme[currTheme].color }} className="blog-title">
          <div className="blog-title--heading">
            <BlogSignatureHeading theme={currTheme}>
              {props.config.title}
            </BlogSignatureHeading>
          </div>
          <div className="blog-authored">
            <DotList items={[props.config.author, props.config.createdOn]} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BlogHeader;
