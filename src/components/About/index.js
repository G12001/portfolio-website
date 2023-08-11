import { useEffect, useState } from 'react'
import {
  faGitAlt,
  faJsSquare,
  faReact,
  faNode,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
import mongoIcon from '../../assets/images/mongodbi.ico'
import tailwingIcon from '../../assets/images/pngwing.com.png'
import { Link } from 'react-router-dom'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            Greetings! I'm Shubham Pimple, and I'm delighted to have you explore
            my digital space. As a passionate Full Stack Developer specializing
            in the MERN stack, I'm dedicated to crafting immersive digital
            experiences that leave a mark.
          </p>
          <p>
            My journey into the world of web development was sparked by a
            profound interest in translating concepts into interactive
            realities. My expertise spans both front-end and back-end
            technologies, offering me a comprehensive perspective on the entire
            development process.
          </p>
          <p>
            Although my professional playground is in the world of code, I have
            passions that extend beyond the digital realm. I'm an avid Badminton
            Player & Book Lover, finding inspiration and relaxation through
            these pursuits.
          </p>
          <p>
            I'm genuinely thrilled to be part of the dynamic tech landscape and
            to connect with kindred spirits, collaborators, and potential
            partners. Whether you'd like to discuss a project or simply chat
            about the latest tech trends, I'm all ears.
          </p>
          <Link to="/contact" className="flat-button">
            Let's Connect
          </Link>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faNode} color="#215732" />
            </div>
            <div className="face2">
              <img src={mongoIcon} height={'125px'} width={'125px'} />
            </div>
            <div className="face3">
              <img src={tailwingIcon} alt="tailwindcss" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
