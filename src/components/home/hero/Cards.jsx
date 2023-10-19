import React, { useEffect, useState } from "react";
import "./hero.css";
import Carousel from 'react-material-ui-carousel';
import Typography from '@mui/material/Typography';

const Card = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=590f675c55854296aadc31a46177f964');
        let result = await response.json();
        
        if (result.articles && Array.isArray(result.articles)) {
          setArticles(result.articles.slice(6, 10));
        } else {
          console.error('Articles data is not an array:', result.articles);
          // You can handle this case by setting an empty array or a default value
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='movie-carousel-container'>
      <Carousel>
      {articles.map((article) => {
        return(
          <div key={article.title} className='movie-card-container'>
            <div className="movie-card" style={{ backgroundImage: `url(${article.urlToImage})` }}>
              <div className="movie-detail">
                  <div className="text" >
                    <span className="category" style={{backgroundColor:'#23d96f'}}>New</span>
                    <h1 className='titleBg'>{article.title} </h1>
                    <Typography
                      className="description"
                      variant="body1"
                    >
                      {article.description}
                    </Typography>
                </div>
              </div>
            </div>
          </div>
       );
        })}
      </Carousel>
    </div>
  );
};

export default Card;
