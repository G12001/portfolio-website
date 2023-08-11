import React, { useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import clgIcon from './../../assets/images/download.jpeg'
import schoolIcon from './../../assets/images/Hibbing_High_School_2014.jpg'

const Education = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Education'.split('')}
            idx={15}
          />
        </h1>
        <div className="card-container">
          <div className="card-div">
            <img className="card-img" src={clgIcon} alt="skillchainicon" />
            <div className="content">
              <h2 className="title">Bachelor of Technology</h2>
              <h3>Government College of Engineering, Amravati</h3>
              <h3>2019 - 2023</h3>
              <h3>CGPA - 7.62</h3>
              <p>
                I successfully attained my Bachelor's degree, showcasing
                dedication, critical thinking, and perseverance. This journey
                enriched my knowledge, fostered collaboration, and honed my
                problem-solving skills. Eager to leverage this academic
                achievement as a foundation for my professional growth.
              </p>
            </div>
          </div>
          <div className="card-div">
            <img className="card-img" src={schoolIcon} alt="devPointIcon" />
            <div className="content">
              <h2 className="title">HSC (12th std)</h2>
              <h3>Sarvodaya Junior College of Science, Hingna</h3>
              <h3>2018 - 2019</h3>
              <h3>Percentage - 61.69%</h3>
              <p>
                I've triumphantly completed my 12th standard, signifying a
                significant academic milestone. Through rigorous studies, I've
                gained valuable insights, time management abilities, and a
                strong work ethic. This achievement underscores my commitment to
                learning and sets the stage for my continued educational and
                personal advancement.
              </p>
            </div>
          </div>
          <div className="card-div">
            <img className="card-img" src={schoolIcon} alt="devPointIcon" />
            <div className="content">
              <h2 className="title">SSC (10th std)</h2>
              <h3>Sarvodaya Vidyalay, Hingna</h3>
              <h3>2016 - 2017</h3>
              <h3>Percentage - 74.80%</h3>
              <p>
                I've successfully accomplished my 10th standard education,
                marking a pivotal academic triumph. This achievement reflects my
                dedication to learning, adaptability, and a solid foundation in
                various subjects. It's a testament to my academic journey's
                beginning and my enthusiasm for continual growth and
                achievement.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Education
