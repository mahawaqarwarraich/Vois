import React from "react";

import "./style.scss";
//
// import fb from "../../../../Images/social/facebook.png";
// import wa from "../../../../Images/social/whatsapp.png";
// import li from "../../../../Images/social/linkedin.png";
// import tw from "../../../../Images/social/twitter.png";

function BlogBody(props) {
  return (
    <React.Fragment>
      <div className="blog-body">
        <div className="role-play"></div>
        <div className="blog-content">
          <div className="blog-content--print py-fnt-s--1p6 py-ink--dark">
            {props.config.body.content ? props.config.body.content : 'Loading...'}
          </div>
          <div
            className="blog-actions py-fnt-s--1p4 py-fnt-w--bold"
          >
            <div className="blog-actions--act blog-actions--act__inactive blog-actions--act-comment">
              <div className="blog-actions--act-stage blog-actions--act-stage__inactive">
                <div className="blog-actions--act-stage--curtain">
                  <i className="far fa-comments"></i>
                  <span>ADD A COMMENT</span>
                </div>
                <div className="blog-actions--act-stage--show__inactive"></div>
              </div>
            </div>
            <div
              className="blog-actions--act blog-actions--act__inactive blog-actions--act-like"
              onClick={props.config.likeToggled}
            >
              <div className="blog-actions--act-stage blog-actions--act-stage__inactive">
                <div className="blog-actions--act-stage--curtain">
                  <i className="far fa-heart"></i>
                  <span>LIKE</span>
                </div>
                <div className="blog-actions--act-stage--show__inactive"></div>
              </div>
            </div>
            {/*<div className="blog-actions--act blog-actions--act-share">*/}
            {/*  <div className="blog-actions--act-stage">*/}
            {/*    <div className="blog-actions--act-stage--curtain">*/}
            {/*      <i className="fas fa-share"></i>*/}
            {/*      <span>SHARE THIS BLOG</span>*/}
            {/*    </div>*/}
            {/*    <div className="blog-actions--act-stage--show">*/}
            {/*      <div className="py-social-actor">*/}
            {/*        <img*/}
            {/*          className="py-social-actor--pixel"*/}
            {/*          src={fb}*/}
            {/*          title="Facebook"*/}
            {/*          alt="fb"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      <div className="py-social-actor">*/}
            {/*        <img*/}
            {/*          className="py-social-actor--pixel"*/}
            {/*          src={tw}*/}
            {/*          title="Twitter"*/}
            {/*          alt="tr"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      <div className="py-social-actor">*/}
            {/*        <img*/}
            {/*          className="py-social-actor--pixel"*/}
            {/*          src={li}*/}
            {/*          title="Linkedin"*/}
            {/*          alt="ig"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      <div className="py-social-actor">*/}
            {/*        <img*/}
            {/*          className="py-social-actor--pixel"*/}
            {/*          src={wa}*/}
            {/*          title="WhatsApp"*/}
            {/*          alt="wa"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className="blog-related"></div>
      </div>
    </React.Fragment>
  );
}

export default BlogBody;
