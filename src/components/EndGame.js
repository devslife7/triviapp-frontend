import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
    },
    table: {
        Width: "330px",
    },

}));

const BASEURL= "https://protected-caverns-01934.herokuapp.com/games/"


const EndGame = (props) => {
    const [users, setUsers] = useState([])
    const [active, setActive] = useState(true)
    const classes = useStyles();

    const endWait = () => {
        const gameObj = {"game": {
            "active": false,
        }}
        const gameConfig = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameObj)
        }
        fetch(`${BASEURL}${props.location.state.gameId}`, gameConfig)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }

    useEffect(() => {
        setTimeout(endWait, 120000)
        const getUsers = setInterval(()=> {
            fetch(`${BASEURL}${props.location.state.gameId}`)
            .then(resp => resp.json())
            .then(data => {
                if (data.game.active === false){
                    setActive(false)
                    clearInterval(getUsers)
                    return
                }
                let newUsers = data.game.user_games.filter(usergame => !!usergame.score).map(usergame => {
                        return { username: usergame.user.username, score: usergame.score }
                })
                setUsers(newUsers)
                if (newUsers.length === data.game.user_games.length){
                    setTimeout(endWait, 1000)
                }
            })
            }, 1000)
        return () => clearInterval(getUsers);
    }, []);

    const handleClick = () => {
        localStorage.usergame = ""
        props.history.push("/dashboard")
    }
    
    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                { active ? <Typography variant="h6" className={classes.typography} color="primary">...waiting for other players</Typography>
                : <Typography variant="h4" className={classes.typography} color="primary">Game Over</Typography>}
                <TableContainer className={classes.container}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.sort((a, b) => b.score - a.score).map((user) => (
                            <TableRow key={user.username}>
                                <TableCell component="th" scope="row">
                                    {user.username}
                                </TableCell>
                                <TableCell align="right">{user.score}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                { active ? <CircularProgress /> : <Button variant="outlined" color="secondary" onClick={handleClick}>Dashboard</Button>}
            </Paper>
        </div>
    )
}

export default EndGame