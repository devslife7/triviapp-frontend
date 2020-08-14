import React from 'react'

const Header = () => {
  const colorsArray = [
    '#4C88FA',
    '#FA9F57',
    '#AD9E23',
    '#AD7345',
    '#FAE53E'
  ]

  const randomColor = () => {
    const index = colorsArray[Math.floor(Math.random() * colorsArray.length)]
    // const color = colorsArray.sample(
    return { color: index }
  }

  const styleObj = {
    fontFamily: 'Monofett',
    fontWeight: 100,
    fontSize: 85,
  }

  return (
    <>
      <h1 style={styleObj}>
        <span style={ randomColor() }>T</span>
        <span style={ randomColor() }>R</span>
        <span style={ randomColor() }>I</span>
        <span style={ randomColor() }>V</span>
        <span style={ randomColor() }>I</span>
        <span style={ randomColor() }>A</span>
        <span style={ randomColor() }>P</span>
        <span style={ randomColor() }>P</span>
        
        {/* <span style={{ color: '#4C88FA' }}>T</span>
        <span style={{ color: '#FA9F57' }}>R</span>
        <span style={{ color: '#AD9E23' }}>I</span>
        <span style={{ color: '#AD7345' }}>V</span>
        <span style={{ color: '#FAE53E' }}>I</span>
        <span style={{ color: '#4C88FA' }}>A</span>
        <span style={{ color: '#FA9F57' }}>P</span>
        <span style={{ color: '#AD9E23' }}>P</span> */}
      </h1>
    </>
  )
}

export default Header
