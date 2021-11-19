import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <div className="container my-5 footer-block">
      <footer className="text-center text-white">
        <div className="container">

          {/*end of first line*/}
          <section className="mb-2 mt-3">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p>
                  Light from here shall illuminate the entire universe!
                </p>
                <p>Ton Duc Thang University</p>
              </div>
            </div>
          </section>
          {/*end of second line*/}
          <section className="text-center mb-2 icon">
            <a href="https://www.facebook.com/tonducthanguniversity" className="text-white me-4">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.tdtu.edu.vn/trang-chu" className="text-white me-4">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.instagram.com/tdtu.edu.vn/" className="text-white me-4">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
          </section>
          <div className="text-center p-3 copyright">
            ©{currentYear} Copyright:
            <a className="text-white website" href="https://www.tdtu.edu.vn/trang-chu/">
              www.tdtu.edu.vn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
