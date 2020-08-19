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
    const [users, setUsers] = useState([])
    const classes = useStyles();

    useEffect(() => {
        const getUsers = setInterval(()=> {
            fetch(`${BASEURL}${props.location.state.gameId}`)
            .then(resp => resp.json())
            .then(data => {
                let newUsers = data.game.user_games.map(usergame => {
                    return usergame.user.username
                })
                setUsers(newUsers)
            })
            }, 3000)
        return () => clearInterval(getUsers);
    }, []);

    const renderUsers = () => {
        return users.map(user => <Button variant="outlined" color="primary" className={classes.button}>{user}</Button>)
    }

    
    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" className={classes.typography} color="primary">
                    {props.location.state.name}
                </Typography>
                <Container className={classes.container}>
                    {renderUsers()}
                </Container>

                <CircularProgress />
            </Paper>
        </div>
    )
}

export default GameLobby