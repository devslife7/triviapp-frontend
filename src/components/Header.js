import React from 'react'

const colorsArray = [
  '#e33371',
  '#81c784',
  '#e57373',
  '#4791db',
  '#ffb74d',
  '#64b5f6'
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
    acolor: 5
  }


  randomColor = () => {
    const index = colorsArray[Math.floor(Math.random() * colorsArray.length)]
    // const color = colorsArray.sample(
    return { color: index }
  }

  cycleColors = () => {

    this.setState({
      tcolor: this.state.tcolor > 0 ? this.state.tcolor - 1 : 5,
      rcolor: this.state.rcolor > 0 ? this.state.rcolor - 1 : 5,
      icolor: this.state.icolor > 0 ? this.state.icolor - 1 : 5,
      vcolor: this.state.vcolor > 0 ? this.state.vcolor - 1 : 5,
      i2color: this.state.i2color > 0 ? this.state.i2color - 1 : 5,
      acolor: this.state.acolor > 0 ? this.state.acolor - 1 : 5,
    })
  }

  componentDidMount(){
    setInterval(this.cycleColors, 1000)
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
        <span style={{ color: colorsArray[this.state.acolor] }}>A</span>
        <span style={{ color: colorsArray[this.state.tcolor] }}>P</span>
        <span style={{ color: colorsArray[this.state.rcolor] }}>P</span>
      </h1>
    </>
  )}
}

