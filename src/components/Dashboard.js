import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
        justifyContent: 'space-around',
        padding: '30px 0px',
        height: '40px',
        width: '400px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    },
}))

function Dashboard(props) {
    const classes = useStyles()
    const [ currentUser, setCurrentUser ] = useState({})
    const [ friendList, setFriendList ] = useState([])
    const [ newName, setNewName ] = useState(localStorage.name)
    const [ newUserName, setNewUserName ] = useState(localStorage.username)
    const [ open, setOpen ] = React.useState(false)

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
            }
        })
    }

    const handleEditUser = () => {

        const patchRequest = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                username: newUserName
            })
        }

        fetch(userURL + currentUser.id, patchRequest)
            .then( resp => resp.json() )
            .then( data => {
                localStorage.username = data.user.username
                localStorage.name = data.user.name
                localStorage.userData = JSON.stringify( data.user )
                setCurrentUser( data.user )
            })
        
        handleClose()
    }

    const handleCreateGame = () => {
        props.history.push("/creategame")
    }

    const handleJoinGame = () => {
        props.history.push("/joingame")
    }
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    
    return(
        <Container maxWidth="lg">
            <Grid container direction='row' justify='space-evenly' alignItems='center' className={classes.gridStyle} >
                <Grid item xs={6} container direction='column' justify='space-between' alignItems='center' spacing={8}>
                    <Grid item xs={12} >
                        <Paper elevation={6} style={{ textAlign: 'center', padding: '30px', width: '350px'}}>
                            <Avatar src="/broken-image.jpg" style={{margin: 'auto'}} className={classes.large}/>
                            <h3 style={{ fontFamily: 'roboto'}}>Welcome, {user.name}!</h3>
                            <h3>{user.username}</h3>
                            <p>Member since: { createAt }</p>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px'}}>
                                <Button variant='outlined' color='primary' onClick={handleClickOpen} >Edit</Button>
                                <Button onClick={handelLogOut} variant='outlined' color='primary'>Log out</Button>
                            </div>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} >
                        <Paper elevation={4} style={{ height: '90px'}}>
                            <div className={classes.buttonStyle} >
                                <Button onClick={handleCreateGame} variant='contained' style={{ backgroundColor: '#81c784', color: 'white', padding: '20px 20px'}}>Create Game</Button>
                                <Button onClick={handleJoinGame} variant='contained' style={{ backgroundColor: '#4791db', color: 'white', padding: '20px 20px'}}>Join Game</Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={2} style={{ marginBotton: '300px' }}>
                    <Paper elevation={6} style={{ height: '550px', textAlign: 'center', padding: '5px'}}>
                        <h2 style={{ margin: '10px 0px', fontFamily: 'Roboto', color: '#4791db' }}>Friend List</h2>
                        <Paper style={{ height: '450px', overflow: 'auto'}}>
                            {displayFriendList()}
                        </Paper>
                        <Button
                            style={{ margin: '10px 0px'}}
                            onClick={ () => handleFindFriends() }
                            variant='outlined'
                            color='primary'
                            >Find Friends
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <div>
                {/* <Button onClick={handleClickOpen}>Open select dialog</Button> */}
                <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                    <form className={classes.container} style={{ width: '250px'}}> 
                    <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={newName}
                        onChange={ e => setNewName( e.target.value )}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={newUserName}
                        onChange={ e => setNewUserName( e.target.value )}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="img"
                        label="Image Url"
                        name="img"
                        autoComplete="img"
                    />
                    </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditUser} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container>
    )

}

export default Dashboard