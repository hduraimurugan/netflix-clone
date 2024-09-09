import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'


const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-icons">
          <img src={facebook_icon} alt="" />
          <img src={instagram_icon} alt="" />
          <img src={twitter_icon} alt="" />
          <img src={youtube_icon} alt="" />
        </div>
        <ul>
          <li>Audio and Subtitles</li>
          <li>Help Center</li>
          <li>Gift Cards</li>
          <li>Media Center</li>
          <li>Investor and Relations</li>
          <li>Jobs</li>
          <li>Terms of Use</li>
          <li>Privacy</li>
          <li>Legal Notices</li>
          <li>Cookie Preferances</li>
          <li>Corporate Information</li>
          <li>Contact Us</li>
        </ul>
        <div className="footer-lang">
        <p className='link-text'>Made by <a href="https://durai-portfolio.vercel.app/" target='_blank'>Duraimurugan H</a></p>
        <p className='copyright-text'>&copy; Netflix India Clone, Inc</p>
        </div>
    </div>
  )
}

export default Footer