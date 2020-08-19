import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const BASEURL= "http://localhost:3000/"

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
    },
    container: {
        height: "330px",
        overflow: "scroll",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: "20px",
    },
}));


const JoinGame = (props) => {
    const [games, setGames] = useState([])
    const classes = useStyles();


    const joinGame = (name, id) => {
        const userGameObj = {"usergame": {
            "username": localStorage.username,
            "name": name,
        }}
        const userGameConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userGameObj)
        }
        fetch(`${BASEURL}user_games`, userGameConfig)
        .then(resp => resp.json())
        .then(data => {
            localStorage.usergame = data.usergame.id
            props.history.push({
                pathname: '/gamelobby',
                state: { 
                    name: name,
                    gameId: id,
                    
                }
            })
        })
    }

    useEffect(() => {
        fetch(`${BASEURL}/games/`)
        .then(resp => resp.json())
        .then(data => {
            setGames(data.games)
        })
    }, [])

    const renderGames = () => {
        return games.map(game => <Button variant="outlined" color="primary" key={game.id} className={classes.button} onClick={(e) => joinGame(game.name, game.id)}>{game.name}</Button>)
    }
    
    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" className={classes.typography} color="primary">
                    JoinGame
                </Typography>
                <Container className={classes.container}>
                    {renderGames()}
                </Container>
            </Paper>
        </div>
    )
}

export default JoinGame