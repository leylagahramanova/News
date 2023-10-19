import React, { useState, useEffect } from 'react';
import "./Footer.css"
import Typography from '@mui/material/Typography';
import { BsNewspaper } from 'react-icons/bs';
import {FaHeart} from 'react-icons/fa'
import { IconButton } from '@mui/material';
const Footer = () => {
  const [sources, setSources] = useState([]); // Define and initialize sources state
  const [images, setImages] = useState([]); // Define and initialize images state
  const categories = ['sports', ''];
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from the first API (news sources)
        const newsResponse = await fetch(
          'https://newsapi.org/v2/top-headlines/sources?apiKey=590f675c55854296aadc31a46177f964'
        );
        const newsResult = await newsResponse.json();

        if (newsResult.sources && Array.isArray(newsResult.sources)) {
          // Populate the 'sources' array with the data
          setSources(newsResult.sources);
        } else {
          console.error('Sources data is not an array:', newsResult.sources);
        }

        // Fetch data from the second API (images)
        const imagesResponse = await fetch(
          'https://pixabay.com/api/?key=39979205-c19c089098028edd8f46904ff&q=yellow+flowers&image_type=photo&pretty=true'
        );
        const imagesResult = await imagesResponse.json();

        if (imagesResult.hits && Array.isArray(imagesResult.hits)) {
          const imageUrls = imagesResult.hits.map((image) => image.webformatURL);

          // Fetch additional images (assuming you want 6 in total)
          const moreImagesResponse = await fetch(
            'https://pixabay.com/api/?key=39979205-c19c089098028edd8f46904ff&q=red+roses&image_type=photo&pretty=true'
          );
          const moreImagesResult = await moreImagesResponse.json();

          if (moreImagesResult.hits && Array.isArray(moreImagesResult.hits)) {
            const moreImageUrls = moreImagesResult.hits.map((image) => image.webformatURL);

            setImages([...imageUrls, ...moreImageUrls].slice(4, 10 * categories.length)); // 6 images per category
          }
        } else {
          console.error('Error fetching image data:', imagesResult);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Remove the dependency array if categories.length is not defined in this component

  return (
    <>
      <footer>
        <div className="container">
          <div className="box logo">
          <Typography variant="h5" noWrap component="div" color="white" style={{ padding: '5px' }}>
              <IconButton style={{ fontSize: '100%', color:"white" }}> <BsNewspaper /></IconButton>
              Leyla's News
            </Typography>
            <p>Busan is an amazing magazine Blogger theme that is easy to customize for your needs</p>
            <i className="fa fa-envelope"></i>
            <span> hello@beautiful.com </span> <br />
            <i className="fa fa-headphones"></i>
            <span> +91 60521488</span>
          </div>
          <div className="box">
            <h3>SPORTS</h3>
            {sources
              .filter((source) => source.category === 'sports') // Replace 'category' with the actual category you want
              .slice(0, 2)
              .map((source, index) => {
                const image = images[index];
                return (
                  <div className="item" key={source.id}>
                    <img src={image} alt={source.name} />
                    <h3 className="title">{source.name}</h3>
                  </div>
                );
              })}
          </div>

          <div className="box">
            <h3>HEALTH</h3>
            {sources
              .filter((source) => source.category === 'health') // Replace 'category' with the actual category you want
              .slice(0, 2)
              .map((source, index) => {
                const image = images[index];
                return (
                  <div className="item" key={source.id}>
                    <img src={image} alt={source.name} />
                    <h3 className="title">{source.name}</h3>
                  </div>
                );
              })}
          </div>
        </div>
      </footer>
      <div className="legal">
        <div className="container flexSB">
          <p>© all rights reserved</p>
          <p>
            made with <IconButton style={{color:'white'}}> <FaHeart/></IconButton> by Leyla
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
