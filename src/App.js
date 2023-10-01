import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { RWebShare } from "react-web-share";
import './App.css';
import { AiOutlineArrowUp } from "react-icons/ai";
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { BsNewspaper } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";

const categories = [
  { value: 'business', text: 'Business' },
  { value: 'entertainment', text: 'Entertainment' },
  { value: 'general', text: 'General' },
  { value: 'health', text: 'Tech' },
  { value: 'science', text: 'Science' },
  { value: 'sports', text: 'Sports' },
  { value: 'technology', text: 'Technology' },
];

function App() {
  const [sources, setSources] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(
      "responsive_nav"
    );
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
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible);

  const handleChangeCategory = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch("https://newsapi.org/v2/top-headlines/sources?apiKey=b426343089924517b4a79bd993a0a702");
        let result = await response.json();
        if (result.sources && Array.isArray(result.sources)) {
          setSources(result.sources);
        } else {
          console.error("Sources data is not an array:", result.sources);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <AppBar style={{ height: '60px', background: '#2196F3', position: 'fixed', top: 0, left: 0, right: 0 }}>
        <div className="AppBar" style={{ textAlign: "center", textShadow: '4px 4px #2b2a29' }}>
          <Toolbar>
            <Typography variant="h5" noWrap component="div" color="white" style={{ padding: '5px' }}>
              <IconButton style={{ fontSize: '120%' }}> <BsNewspaper /></IconButton>
              Leyla's News
            </Typography>
          </Toolbar>
        </div>
      </AppBar>
      <div className='header' >
        <AppBar style={{background: '#2b2a29', height:"3.5rem",position: 'fixed', top: '60px', left: 0, right: 0 }}>
        <div id="tsparticles">
          <div className="AppBar" style={{ textShadow: '4px 4px #2b2a29' }}>
            <nav  ref={navRef}>
              <Button className='menu menu-button'
                to=""
                sx={{
                  color: 'white',
                  display: 'block',
                  backgroundColor: selectedCategory === '' ? '#b2c8dc' : 'transparent',
                 
                }}
                onClick={() => setSelectedCategory('')}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button className='menu menu-button'
                  key={category.value}
                  onClick={() => handleChangeCategory(category.value)}
                  sx={{color: 'white', display: 'block', 
                    backgroundColor: selectedCategory === category.value ? '#b2c8dc' : 'transparent'
                  }}
                >
                  {category.text}
                </Button>
              ))}
              <button
                className="nav-btn nav-close-btn"
                onClick={showNavbar}>
                <FaTimes />
              </button>
            </nav>
            <button
              className="nav-btn"
              onClick={showNavbar}>
              <FaBars />
            </button>
          </div>
          </div>
        </AppBar>
      </div>
     <div className="container" style={{ marginTop: '80px', display: 'flex', flexWrap: 'wrap'  }}>
  <div className="cards" >
    {sources.map((source) => {
      if (selectedCategory && source.category !== selectedCategory) {
        return null;
      }
      return (
        <div className="card-wrapper" key={source.id} style={{ display: 'flex', flexDirection: 'column'}}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Card sx={{ width: 400, flex: 1 }}>
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
            {/* Place your "button" component here */}
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
          <div className='ttt' style={{ display: visible ? 'block' : 'none' }}>
            <Button>
              <AiOutlineArrowUp style={{ fontSize: '250%' }} onClick={scrollToTop} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
