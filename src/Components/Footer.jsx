import React from 'react'
import "../Styles/Footer.css"
import { useScroll } from './Scroller'

function Footer() {

    const scrollToElement = useScroll();

  return (
    <div className="MainFooter" id="FooterScrollRef" onClick={() => {scrollToElement("FooterScrollRef")}}>Footer</div>
  )
}

export default Footer