import React from 'react'
import styled from 'styled-components';

function Footer() {
  return (
    <FooterStyle>
      <h3>thanks diary</h3>
      <p>copyright</p>
    </FooterStyle>
  )
}

const FooterStyle = styled.footer`
  width: 80%;
  padding: 30px;
  padding-top: 20vh;
  background-color: white;
  margin: 0 auto;
`

export default Footer;
