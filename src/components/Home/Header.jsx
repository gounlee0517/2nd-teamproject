import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"



function Header() {
  const navigate = useNavigate()

  return (
    <STheader>
      <STh1
        onClick={() => {
          navigate("/");
        }}
      >thanks diary</STh1>
      <STul>
        <STli
          onClick={() => {
            navigate("/Login");
          }}
        >login</STli>
        <STli>my page</STli>
      </STul>
    </STheader>
  )
}

const STheader = styled.div`
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: pink;
`
const STh1 = styled.h1`
  margin-left: 20px;
  cursor: pointer;
`
const STul =styled.ul`
  display: flex;
`
const STli = styled.li`
  margin-right: 20px;
  cursor: pointer;
`

export default Header;
