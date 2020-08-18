import React from 'react'
import Typography from '@material-ui/core/Typography'

export default class Question extends React.Component{


    render(){
        return(
            // <div className="question">
            //     {this.props.question}
            // </div>
            <Typography variant="h5" gutterBottom className="question">
                {this.props.question}
            </Typography>
        )
    }
}