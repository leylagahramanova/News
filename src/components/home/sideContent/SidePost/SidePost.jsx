import React, { useState, useEffect } from 'react';
import './SidePost.css';
import Heading from '../Heading/Heading';

const SidePost = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=590f675c55854296aadc31a46177f964');
        let result = await response.json();
        
        if (result.articles && Array.isArray(result.articles)) {
          setArticles(result.articles.slice(0, 5));
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
    <>
      <section className='tpost'>
        <Heading title='Tiktok post' />
        {articles.map((article) => {
          return (
            <div className='box flexSB' key={article.title}>
              <div className='img'>
                <img src={article.urlToImage} alt='' />
              </div>
              <div className='text'>
                <h1 className='title'>{article.title.slice(0, 35)}...</h1>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default SidePost;
