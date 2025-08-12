
import logo from '../assets/job-seeker_3135721.png'; // update this path to your actual logo location

function Footer() {
  return (
    <footer className='p-4'>
      {/* New 3-column section */}
      <div className="row p-5">
        {/* First column: logo + informations */}
        <div className="col-sm-4 mt-3">
          <span className="d-flex align-items-center mb-3">
            <img 
              src={logo} 
              alt="Logo" 
              width="40" 
              height="40" 
              className="d-inline-block align-text-top me-2"
            />
            <strong>Khademni</strong>
          </span>

          <div id='footer-link'>
            <p className='fw-bold'>Informations</p>
            <ul 
              className='mt-3' 
              id='footer-contact' 
              style={{ listStyleType: 'none', padding: 0 }}
            >
              <li>
                <i 
                  className="fa-solid fa-phone me-2" 
                  style={{color: '#1967d2', fontSize: '10px'}}
                ></i> Phone: 21375123
              </li>
              <li>
                <i 
                  className="fa-solid fa-envelope me-2" 
                  style={{color: '#1967d2', fontSize: '10px'}}
                ></i> Email: sleimiala@gmail.com
              </li>
              <li>
                <i 
                  className="fa-solid fa-location-dot me-2" 
                  style={{color: '#1967d2', fontSize: '10px'}}
                ></i> Address: Rue Ezze eddine hanachi
              </li>
            </ul>
          </div>
        </div>

        {/* Second column: For Candidate */}
        <div className="col-sm-4 mt-4" id='footer-link'>
          <p>For Candidate</p>
          <ul className='mt-3' style={{ listStyleType: 'none', padding: 0 }}>
            <li>Browse Jobs</li>
            <li>Find A Job</li>
            <li>Post A Job</li>
            <li>Account</li>
            <li>Resume</li>
            <li>Sign Up</li>
          </ul>
        </div>

        {/* Third column: Quick Links */}
        <div className="col-sm-4 mt-3" id='footer-link'>
          <p>Quick Links</p>
          <ul className='mt-3' style={{ listStyleType: 'none', padding: 0 }}>
            <li>Home</li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      {/* Existing bottom bar */}
      <div className="d-flex flex-column-reverse flex-sm-row justify-content-between align-items-center p-3 bg-light gap-3">
        <p className="mb-0 text-center text-sm-start">
          © 2025 Khademni by{' '}
          <a href="https://ala-sleimi.netlify.app/">Ala Sleimi</a>. All rights reserved.
        </p>

        <ul className="d-flex list-unstyled mb-0 justify-content-center gap-5">
          <li><i className="fa-brands fa-facebook-f"></i></li>
          <li><i className="fa-brands fa-twitter"></i></li>
          <li><i className="fa-brands fa-linkedin-in"></i></li>
          <li><i className="fa-brands fa-instagram"></i></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;