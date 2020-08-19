import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const BASEURL= "http://localhost:3000/games/"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: "350px",
        height: "240px",
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    typography: {
        margin: "20px",
    }
}));


const CreateGame = (props) => {
    const [ name, setName ] = useState('')
    const classes = useStyles();

    const handleChange = (value) => {
        setName(value)
    }

    const handleClick = (e) => {
        const gameObj = {"game": {
            "username": localStorage.username,
            "name": name,
            "active": true
        }}
        const gameConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameObj)
        }
        fetch(BASEURL, gameConfig)
        .then(resp => resp.json())
        .then(data => {
            props.history.push({
                pathname: '/gamelobby',
                state: { 
                    name: name,
                    gameId: data.game.id
                }
            })
        })
        
    }
    
    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" className={classes.typography} color="primary">
                    Create Game
                </Typography>
                <TextField id="name" label="Name" variant="outlined" onChange={(e) => handleChange(e.target.value)}/>
                <Button variant="contained" color="primary" className={classes.typography} onClick={(e) => handleClick(e)}>
                    Create Game
                </Button>
            </Paper>
        </div>
    )
}

export default CreateGame