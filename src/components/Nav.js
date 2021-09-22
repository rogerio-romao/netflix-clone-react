import React, { useEffect, useState } from 'react'

import './Nav.css'

const Nav = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
    return () => window.removeEventListener('scroll')
  }, [])

  return (
    <div className={`nav ${show && 'nav--black'}`}>
      <img className="nav__logo" src="/Netflix_logo.png" alt="Netflix logo" />
      <img className="nav__avatar" src="/user.png" alt="avatar" />
    </div>
  )
}

export default Nav
