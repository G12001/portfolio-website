import React, { useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'

import skillChainIcon from './../../assets/images/Screenshot (9).png'
import devPointIcon from './../../assets/images/Screenshot (37).png'

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Projects'.split('')}
            idx={15}
          />
        </h1>
        <div className="card-container">
          <div className="card-div">
            <img
              className="card-img"
              src={skillChainIcon}
              alt="skillchainicon"
            />
            <div className="content">
              <h2 className="title">Skill-Chain</h2>
              <p>
                Developed a cutting-edge application leveraging the MERN
                (MongoDB, Express, React, Node.js) stack and Ethereum blockchain
                technology to enable institutions and organizations to generate
                digital certificates seamlessly. The platform empowers users to
                issue, manage, and authenticate certificates securely using a
                unique certificate ID, ensuring tamper-proof verification by
                anyone. Streamlining the certification process while maintaining
                data integrity and transparency, the project revolutionizes
                credentialing in the digital age.
              </p>
            </div>
            <div className="btns">
              <a className="flat-button" disabled>
                View
              </a>
              <a
                className="flat-button"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/G12001/skillchain"
              >
                Source Code
              </a>
            </div>
          </div>
          <div className="card-div">
            <img className="card-img" src={devPointIcon} alt="devPointIcon" />
            <div className="content">
              <h2 className="title">DevPoint</h2>
              <p>
                Developed social network targeting developers. In devpoint
                developers can create profile and they can posts the queries and
                engange in discussion. Build using ReactJs, NodeJs, ExpressJs,
                MongoDB.
              </p>
            </div>
            <div className="btns">
              <a
                className="flat-button"
                target="_blank"
                rel="noreferrer"
                href="https://devpoint.onrender.com/"
              >
                View
              </a>
              <a
                className="flat-button"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/G12001/skillchain"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Portfolio
