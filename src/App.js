import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { RWebShare } from 'react-web-share';
import './App.css';
import { AiOutlineArrowUp } from 'react-icons/ai';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { BsNewspaper } from 'react-icons/bs';
import { FaBars, FaTimes } from 'react-icons/fa';
import Cards from './components/home/hero/Cards';
import Popular from './components/home/popular/Popular';
import Side from './components/home/sideContent/side/Side';
import Footer from './components/home/footer/Footer';
const categories = {
  Trend: 'your-trend-category-image-url',
  business: 'your-business-category-image-url',
  entertainment: 'your-entertainment-category-image-url',
  general: 'your-general-category-image-url',
  health: 'your-health-category-image-url',
  science: 'your-science-category-image-url',
  sports: 'your-sports-category-image-url',
  technology: 'your-technology-category-image-url',
};

function App() {
  const [sources, setSources] = useState([]);
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Trend');
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  const handleChangeCategory = (category) => {
    setSelectedCategory(category === selectedCategory ? 'Trend' : category);
  };

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

        const fetchImagePromises = Object.keys(categories).map(async (category) => {
          // Fetch data from the second API (images)
          const imagesResponse = await fetch(
            `https://pixabay.com/api/?key=39979205-c19c089098028edd8f46904ff&q=${category}&image_type=photo&pretty=true`
          );
          const imagesResult = await imagesResponse.json();

          if (imagesResult.hits && Array.isArray(imagesResult.hits)) {
            const imageUrls = imagesResult.hits.map((image) => image.webformatURL);

            // Return the image URLs for this category
            return {
              category,
              imageUrls: imageUrls,
            };
          } else {
            console.error(`Error fetching image data for category: ${category}`, imagesResult);
            return null;
          }
        });

        // Wait for all image fetching to complete
        const imageResults = await Promise.all(fetchImagePromises);

        // Combine the image URLs from all categories
        const allImageUrls = imageResults
          .filter((result) => result !== null)
          .map((result) => result.imageUrls)
          .flat();

        setImages(allImageUrls.slice(0, newsResult.sources.length)); // Set images count to match news count
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <AppBar style={{ height: '60px', background: '#2196F3', position: 'fixed', top: 0, left: 0, right: 0 }}>
        <div className="AppBar" style={{ textAlign: 'center', textShadow: '4px 4px #2b2a29' }}>
          <Toolbar>
            <Typography variant="h5" noWrap component="div" color="white" style={{ padding: '5px' }}>
              <IconButton style={{ fontSize: '120%' }}> <BsNewspaper /></IconButton>
              Leyla's News
            </Typography>
          </Toolbar>
        </div>
      </AppBar>
      <div className="header">
        <AppBar style={{ background: '#2b2a29', height: '3.5rem', position: 'fixed', top: '60px', left: 0, right: 0 }}>
          <div id="tsparticles">
            <div className="AppBar" style={{ textShadow: '4px 4px #2b2a29' }}>
              <nav ref={navRef}>
                {Object.keys(categories).map((category) => (
                  <Button
                    className="menu menu-button"
                    key={category}
                    onClick={() => handleChangeCategory(category)}
                    sx={{
                      color: 'white',
                      display: 'block',
                      backgroundColor: selectedCategory === category ? '#b2c8dc' : 'transparent',
                    }}
                  >
                    {category}
                  </Button>
                ))}
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                  <FaTimes />
                </button>
              </nav>
              <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
              </button>
            </div>
          </div>
        </AppBar>
      </div>
      <div className="main">
        <div className="container" style={{ marginTop: '80px', display: 'flex', flexWrap: 'wrap' }}>
          <Cards />
          {selectedCategory === 'Trend' && <Popular />}
          {selectedCategory !== 'Trend' && (
            sources
              .filter((source) => source.category === selectedCategory)

              .map((source, index) => {
                const image = images[index];
                return (
                  <div className="card-wrapper" key={source.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Card sx={{ width: 300, flex: 1 }}>
                        <CardMedia
                          component="img"
                          sx={{ height: 200 }}
                          image={image} // Use the image URL from the categories object
                          alt={`Image ${index}`}
                        />
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
              })
          )}
          <div className="ttt" style={{ display: visible ? 'block' : 'none' }}>
            <Button>
              <AiOutlineArrowUp style={{ fontSize: '250%' }} onClick={scrollToTop} />
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="side">
          <Side />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
