import React from "react"
import { FaFacebook } from 'react-icons/fa'
import { FaPinterest } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton';
import { FaYoutube } from "react-icons/fa";
import './Icon.css';
const Icons = () => {
  return (
    <>
      <section className='social'>
        <IconButton className=' btn socBox' href="https://www.facebook.com">
          <FaFacebook />
        </IconButton>
        <IconButton className='btn socBox' href="https://www.pinterest.com">
          <FaPinterest />
        </IconButton>
        <IconButton className='btn socBox' href="https://www.twitter.com">
          <FaTwitter />
        </IconButton>
        <IconButton  className='btn socBox' href="https://www.instagram.com">
          <FaInstagram />
        </IconButton>
        <IconButton className='btn socBox' href="https://www.youtube.com">
          <FaYoutube />
        </IconButton>
      </section>
    </>
  )
}

export default Icons