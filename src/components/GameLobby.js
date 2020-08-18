import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


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
    },
    container: {
        height: "330px",
        overflow: "scroll",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: "20px",
    },
    button: {
        width: "100px",
        margin: "10px",
    }
}));

const BASEURL= "http://localhost:3000/games/"


const GameLobby = (props) => {
    const classes = useStyles();
    const [ progress, setProgress ] = useState(0)

    const gameObj = {"game": {
        "username": localStorage.username,
        "name": props.location.state.name,
        "active": true
    }}

    const gameConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameObj)
    }

    useEffect(() => {
        setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 500);
        fetch(BASEURL, gameConfig)
        .then(resp => resp.json())
        .then(data => {
            localStorage.gameId = data.id
        })
    }, []);
    
    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" className={classes.typography} color="primary">
                    {props.location.state.name}
                </Typography>
                <Container className={classes.container}>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        {localStorage.username}
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        Marcos
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        Princeton
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        Dave
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        David
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        Michael
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        Mike
                    </Button>

                    
                </Container>

                <CircularProgress variant="static" value={progress} />
            </Paper>
        </div>
    )
}

export default GameLobby