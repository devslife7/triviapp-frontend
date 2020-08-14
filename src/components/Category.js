import React from 'react';

export default class Category extends React.Component{


    render(){
        return(
        <h1 className="category">{this.props.category}</h1>
        )
    }
}