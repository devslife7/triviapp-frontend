import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        width: '100%',
        maxWidth: 500,
    },
}))

const Question = (props) => {
    const classes = useStyles()
        return(
            <Typography variant="h5" gutterBottom className={classes.root}>
                {props.question}
            </Typography>
        )
}

export default Question
