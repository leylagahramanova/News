import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { RWebShare } from 'react-web-share';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import '../../../App.css';

const Popular = () => {
  const [sources, setSources] = useState([]);
  const [images, setImages] = useState([]);
  const categories = ['business', 'entertainment', 'general', 'technology', 'science', 'sports'];

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

            setImages([...imageUrls, ...moreImageUrls].slice(0, 6 * categories.length)); // 6 images per category
          }
        } else {
          console.error('Error fetching image data:', imagesResult);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [categories.length]);

  return (
    <div className='App'>
        {categories.map((category) => (
          <div key={category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            {sources
              .filter((source) => source.category === category)
              .slice(0, 2)
              .map((source, index) => {
                const image = images[index + categories.indexOf(category) * 6];
                return (
                  <div className="card-wrapper" key={source.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="card" style={{ display:'inline', height: '100%' }}>
                      <Card sx={{ width: 300  }}>
                        <CardMedia sx={{ height: 200 }} image={image} alt={`Image ${index}`} />
                        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '150px' }}>
                          <div>
                            <Typography gutterBottom variant="h5" component="div">
                              {source.name}
                            </Typography>
                            <Typography className="description" variant="body4" color="GrayText" sx={{ maxHeight: '5rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', lineHeight: '1.5rem', flex: 1 }}>
                              {source.description}
                            </Typography>
                          </div>
                          <div>
                            <RWebShare
                              data={{
                                url: source.url,
                                title: source.name,
                              }}
                              onClick={() => console.log('shared successfully!')}
                            >
                              <Button style={{ marginLeft: '40px', marginRight: '10px' }} size="small">
                                Share
                              </Button>
                            </RWebShare>
                            <Button size="small" href={source.url}>
                              More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
};

export default Popular;
