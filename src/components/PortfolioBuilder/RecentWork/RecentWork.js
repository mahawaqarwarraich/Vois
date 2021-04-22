import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './RecentWork.scss';
import { Skeleton } from "@material-ui/lab";
import ArticleCard from '../../ArticlesDirectory/ArticleCardUI/ArticleCardUI';
import authHeader from '../../../services/auth-header';

const RecentWork = () => {
    const [myLatestArticles, setMyLatestArticles] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8000/get-user-latest-articles/" + JSON.parse(localStorage.getItem("user")).userId, {
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

    return (
        <div className="recentwork">
            <h2 className="recentwork__heading">MY LATEST ARTICLES</h2>
            <div className="recentwork__blogs">
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
            {/* <a
                className="profile__activity--blogs-view"
                onClick={viewAllFavBlogs}
            >
            View All
            </a> */}
        </div>
    )
}

export default RecentWork
