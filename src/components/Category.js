import React from 'react';
import Typography from '@material-ui/core/Typography';

export default class Category extends React.Component{


    render(){
        return(
            // <h1 className="category">{this.props.category}</h1>
            <Typography variant="h2" gutterBottom className='category'>
                {this.props.category}
            </Typography>
        )
    }
}