import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const baseURL = 'http://localhost:3000/'
const userURL = baseURL + 'users/'
const friendURL = baseURL + 'friendships/'

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
      borderRadius: '20px',
      padding: '80px 0px'
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}))

function generateUsers(userList) {
  const currentUser = JSON.parse(localStorage.userData)
  // console.log(userList)
  // console.log(currentUser.friends)
  userList = userList.filter( user => user.id !== currentUser.id)
  // userList = userList.filter( user => {
  //   // console.log(user)
  //   // console.log(currentUser.friends)
  //   // !currentUser.friends.includes(user)
  //   if ( !currentUser.friends.includes(user) ) {
  //     console.log(user)
  //     console.log(currentUser.friends)
  //     return true
  //   } else {
  //     return false
  //   }
  // } )

  return userList.map( ( user, idx) => 
    <ListItem style={{ textAlign: 'center'}} key={idx}>
      <ListItemAvatar>
        <Avatar src="/broken-image.jpg" style={{marginRight: '0px'}} />
      </ListItemAvatar>
      <ListItemText
        primary= { user.name }
        secondary='Secondary text'
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={ (e) => handleAddFriend( user.id )}>
          <GroupAddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>,
  )
}
function generateFriends() {
  const user = JSON.parse(localStorage.userData)

  return user.friends.map( ( friend, idx ) =>
    <ListItem key={friend.id}>
      <ListItemAvatar>
        <Avatar src="/broken-image.jpg"/>
      </ListItemAvatar>
      <ListItemText
        primary={ friend.name }
        secondary= { friend.username }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>,
  )
}

function handleAddFriend( friendId ) {
  const userId = JSON.parse(localStorage.userData).id
  console.log(userId)
  console.log(friendId)

  const postRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: userId,
      friend_id: friendId
    })
  }

  fetch(friendURL, postRequest)
    .then( resp => resp.json() )
    .then( data => console.log(data))

}

const Friends = () => {
  const classes = useStyles()
  const [ userList, setUserList ] = useState([])

  useEffect( () => {
    console.log('runs useEffect method')

    fetch(userURL)
      .then( resp => resp.json() )
      .then( data => setUserList( data.users ))
  }, [])
  
  return (
    <>
      <Container maxWidth="lg">
        <Grid container justify='space-evenly' alignItems='center' spacing={9} className={classes.gridStyle}>
          <Grid item xs={4} style={{ marginBotton: '300px'}}>
            <Paper elevation={6} style={{ height: '500px', textAlign: 'center', padding: '5px'}}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} style={{ maxWidth: '100%', flexBasis: '100%'}}>
                  <Typography variant="h6" className={classes.title}>
                    Friend List
                  </Typography>
                  <div>
                    <List >
                      { generateFriends() }
                    </List>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4} style={{ marginBotton: '300px'}}>
            <Paper elevation={6} style={{ height: '500px', textAlign: 'center', padding: '5px'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ maxWidth: '100%', flexBasis: '100%'}}>
                <Typography variant="h6" className={classes.title}>
                  All Users
                </Typography>
                <div>
                  <List >
                    {generateUsers(userList)}
                  </List>
                </div>
              </Grid>
            </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Friends
