import React from 'react';
import Typography from '@material-ui/core/Typography';

export default class Category extends React.Component{


    render(){
        return(
            <Typography variant="h6" gutterBottom className='category' color="primary">
                {this.props.category}
            </Typography>
        )
    }
}