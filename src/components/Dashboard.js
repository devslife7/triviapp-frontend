import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

const baseURL = 'http://localhost:3000/'
const userURL = baseURL + 'users/'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    gridStyle: {
        backgroundColor: '#EAEAEA',
        borderRadius: '10px',
        padding: '80px 0px'
    },
    buttonStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '50px 80px',
        width: '300px'
    }
}))

function Dashboard(props) {
    const classes = useStyles()
    const [ currentUser, setCurrentUser ] = useState({})
    const [ friendList, setFriendList ] = useState([])
    const user = currentUser
    const createAt = new Date( user.created_at ).toString().split(' 2020')[0]
    
    useEffect(() => {
        const user = JSON.parse(localStorage.userData)
        fetch( userURL + user.id )
        .then( resp => resp.json() )
        .then( data => {
            setCurrentUser( data.user )
            setFriendList( data.user.friends )
        })
    }, [])

    const handelLogOut = () => {
        localStorage.clear()
        props.history.push("/login")
    }

    const handleNewGame = () => props.history.push("/game")

    const handleJoinGame = () => props.history.push("/creategame")

    const displayFriendList = () => {
        return friendList.map( ( friend, idx ) =>
            <p key={idx}> {friend.name} </p>
        )
    }

    const handleFindFriends = () => {
        props.history.push({
            pathname: '/friends',
            state: {
                currentUser: currentUser,
                friendList: friendList,
                // setFriendList: setFriendList
            }
        })
    }

    return(
        <Container maxWidth="lg">
            <Grid container direction='row' justify='space-evenly' alignItems='center' className={classes.gridStyle} >
                <Grid item xs={6} container direction='column' justify='space-between' alignItems='center' spacing={10} >
                    <Grid item xs={12}>
                        <Paper elevation={6} style={{ textAlign: 'center', padding: '30px', width: '350px' }}>
                            <Avatar src="/broken-image.jpg" style={{margin: 'auto'}} className={classes.large}/>
                            <h3>Welcome, {user.name}!</h3>
                            <h3>{user.username}</h3>
                            <p>Member since: { createAt }</p>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px'}}>
                                <Button variant='outlined' color='primary'>Edit</Button>
                                <Button onClick={handelLogOut} variant='outlined' color='primary'>Log out</Button>
                            </div>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={4} >
                        <Paper elevation={4} className={classes.buttonStyle}>
                            <Button
                                onClick={handleNewGame}
                                variant='contained' color='primary'
                                >Solo Game
                            </Button>
                            <Button
                                onClick={handleJoinGame}
                                variant='contained' color='primary'
                                >Multi-Player Game
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={2} style={{ marginBotton: '300px' }}>
                    <Paper elevation={6} style={{ height: '500px', textAlign: 'center', padding: '5px'}}>
                        <h2>Friend List</h2>
                        {displayFriendList()}
                        <Button
                            onClick={ () => handleFindFriends() }
                            variant='outlined' color='primary'
                            >Find Friends
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )

}

export default Dashboard