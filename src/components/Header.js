import React from 'react'

const colorsArray = [
  '#4C88FA',
  '#FA9F57',
  '#AD9E23',
  '#AD7345',
  '#FAE53E'
]

const styleObj = {
  fontFamily: 'Monofett',
  fontWeight: 100,
  fontSize: 85,
  textAlign: 'center'
}

export default class Header extends React.Component {

  state = {
    tcolor: 0,
    rcolor: 1,
    icolor: 2,
    vcolor: 3,
    i2color: 4,
  }


  randomColor = () => {
    const index = colorsArray[Math.floor(Math.random() * colorsArray.length)]
    // const color = colorsArray.sample(
    return { color: index }
  }

  cycleColors = () => {

    this.setState({
      tcolor: this.state.tcolor > 0 ? this.state.tcolor - 1 : 4,
      rcolor: this.state.rcolor > 0 ? this.state.rcolor - 1 : 4,
      icolor: this.state.icolor > 0 ? this.state.icolor - 1 : 4,
      vcolor: this.state.vcolor > 0 ? this.state.vcolor - 1 : 4,
      i2color: this.state.i2color > 0 ? this.state.i2color - 1 : 4,
    })
  }

  componentDidMount(){
    setInterval(this.cycleColors, 1200)
  }

 
  render()
  {return (
    <>
      <h1 style={styleObj}>
        <span style={{ color: colorsArray[this.state.tcolor] }}>T</span>
        <span style={{ color: colorsArray[this.state.rcolor] }}>R</span>
        <span style={{ color: colorsArray[this.state.icolor] }}>I</span>
        <span style={{ color: colorsArray[this.state.vcolor] }}>V</span>
        <span style={{ color: colorsArray[this.state.i2color] }}>I</span>
        <span style={{ color: colorsArray[this.state.tcolor] }}>A</span>
        <span style={{ color: colorsArray[this.state.rcolor] }}>P</span>
        <span style={{ color: colorsArray[this.state.icolor] }}>P</span>
        
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
  )}
}

