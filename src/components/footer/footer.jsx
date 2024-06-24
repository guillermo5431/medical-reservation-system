import React from 'react';
import './footer.css';
import fb from '../../assets/facebook.png';
import twitter from '../../assets/twitter.png';
import linkedin from '../../assets/linkedin.png';
import insta from '../../assets/instagram.png';


function footer() {
  return (
    <div className="footer">
        <div className='sb__footer section__padding'>
            <div className='sb__footer-links'>
                <div className='sb__footer-links_div'>
                    <h4>About us</h4>
                    <a href='/About'>
                      <p>About Our Organization</p>
                    </a>
                    <a href='/About'>
                      <p>System Leadership</p>
                    </a>
                    <a href='/About'>
                      <p>Contact Us</p>
                    </a>
                </div>
                <div className='sb__footer-links_div'>
                <h4>Health Care Professionals</h4>
                    <a href='/CareProfessions'>
                      <p>For Physicians</p>
                    </a>
                    <a href='/CareProfessions'>
                      <p>For Nurses</p>
                    </a>
                    <a href='/CareProfessions'>
                      <p>For Physical Therapists</p>
                    </a>
                </div>
                <div className='sb__footer-links_div'>
                  <h4>Coming soon on</h4>
                  <div className='socialmedia'>
                    <p><img src={fb} alt=""/></p>
                    <p><img src={twitter} alt=""/></p>
                    <p><img src={linkedin} alt=""/></p>
                    <p><img src={insta} alt=""/></p>
                  </div>
                </div>
            </div>

        <hr></hr>

        <div className='sb__footer-below'>
          <div className='sb__footer-copyright'>
            <p>
              @{new Date().getFullYear()} MedRes. All right reserved.
            </p>
          </div>
          <div className='sb__footer-below-links'>
               <a href='/terms'><div><p>Terms & Conditions</p></div></a>
               <a href='/privacy'><div><p>Privacy</p></div></a>
               <a href='/security'><div><p>Security</p></div></a>
               <a href='/cookie'><div><p>Cookie Declaration</p></div></a>
          </div>
        </div>

        </div>
    </div>
  )
}

export default footer