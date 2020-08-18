import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: "350px",
        height: "500px",
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    typography: {
        margin: "20px"
    }
}));


const GameLobby = (props) => {
    const classes = useStyles();
    
    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" className={classes.typography} color="primary">
                    {props.location.state.name}
                </Typography>
            </Paper>
        </div>
    )
}

export default GameLobby