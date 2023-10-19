import React from "react"
import "./Side.css"
import SidePost from "../SidePost/SidePost"
import Icons from "../Icons/Icons"
import Heading from "../Heading/Heading"
import banner from './banner.jpg'
const Side = () => {
      return (
        <div className="onside">
            <div className="mail">
          <Heading title='Stay Connected' />
          <Icons />
          <Heading title='Subscribe' />
          <section className='subscribe'>
            <h1 className='title'>Subscribe to our New Stories</h1>
            <form action='email'>
              <input type='email' placeholder='Email Address...' />
              <button className="btn" >
                <i className='fa fa-paper-plane'></i> SUBMIT
              </button>
            </form>
          </section>
          <section className='banner'>
            <img src={banner} alt='' />
          </section>
          </div>
          <div className="bs">
          <SidePost />
          </div>
          
        </div>
  )
}

export default Side