import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

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
      padding: '0px 0px'
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}))

const Friends = (props) => {
  const classes = useStyles()
  const [ userList, setUserList ] = useState([])
  const [ friendList, setFriendList ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ colorCycle, setColorCycle ] = useState('')
  const currentUser = props.history.location.state.currentUser

  useEffect( () => {

    const interval = setInterval( cyclesColors , 1000)

    setFriendList(props.history.location.state.friendList)

    fetch(userURL)
      .then( resp => resp.json() )
      .then( data => setUserList( data.users ))

    return () => {
      clearInterval(interval)
    }
  }, [])

  const cyclesColors = () => {
    const index = colorsArray[Math.floor(Math.random() * colorsArray.length)]
    setColorCycle( index )
  }

  const colorsArray = [
    '#e33371',
    '#81c784',
    '#e57373',
    '#4791db',
    '#ffb74d',
    '#64b5f6'
  ]

  function handleAddFriend( friendId ) {
    let friendIds = friendList.map( friend => friend.id )
  
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        friend_id: friendId
      })
    }
  
    fetch(friendURL, postRequest)
      .then( resp => resp.json() )
      .then( data => {
        // console.log(data)
        const friendObj = userList.filter( user => user.id === friendId )[0]
        // console.log('frined obj', friendObj)
        setFriendList( [...friendList, friendObj] )


        friendIds = friendList.map( friend => friend.id )
        // console.log(friendIds)
      })
  }

  function generateFriends() {
    // console.log('renders friendlist')
  
    return friendList.map( ( friend, idx ) =>
      <ListItem key={friend.id} style={{ paddingLeft: '100px'}}>
        <ListItemAvatar>
          <Avatar src="/broken-image.jpg"/>
        </ListItemAvatar>
        <ListItemText
          primary={ friend.name }
          secondary= { friend.username }
        />
        {/* <ListItemSecondaryAction style={{ paddingRight: '50px'}}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction> */}
      </ListItem>,
    )
  }

  function generateUsers(userList) {
    const currentUser = props.history.location.state.currentUser
    const friendIds = friendList.map( user => user.id )
    

    userList = userList.filter( user => user.id !== currentUser.id )

    userList = userList.filter( user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) )
  
    return userList.map( ( user, idx) => 
      <ListItem style={{ paddingLeft: '80px'}} key={idx}>
        <ListItemAvatar>
          <Avatar src="/broken-image.jpg" style={{marginRight: '0px'}} />
        </ListItemAvatar>
        <ListItemText
          primary= { user.name }
          secondary= { user.username }
        />
        { !friendIds.includes( user.id ) ?
        <IconButton edge="end" aria-label="delete" onClick={ (e) => handleAddFriend( user.id )} style={{paddingRight: '60px'}}>
          <GroupAddIcon color='primary' />
        </IconButton>
        : <PersonAddDisabledIcon color='disabled' style={{paddingRight: '50px'}}/>
        }
      </ListItem>,
    )
  }
  
  return (
    <>
      <Container maxWidth="lg">
        <Grid container justify='center' alignItems='center' spacing={10} className={classes.gridStyle}>
          <Grid item xs={4} style={{ marginBotton: '300px'}}>
            <Paper elevation={2} >
            </Paper>
            <Paper elevation={6} style={{ height: '650px', textAlign: 'center', padding: '5px'}}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} style={{ maxWidth: '100%', flexBasis: '100%'}}>
                  <Typography variant="h5" className={classes.title} style={{ textAlign: 'center', margin: '12px 0px', color: '#4791db', fontSize: "29px"}}>
                    Friend List
                  </Typography>
                  <Paper>
                    <List style={{ height: '518px', overflow: 'auto'}}>
                      { generateFriends() }
                    </List>
                  </Paper>
                  <Button
                      onClick={ () => props.history.push('/dashboard')}
                      style={{ marginTop: '12px', backgroundColor: '#4791db', color: 'white'}}
                      variant='contained'
                      >Dashboard
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <IconButton style={{backgroundColor: colorCycle, color: 'white' }} onClick={ () => props.history.push('/dashboard')} >
            <SwapHorizIcon fontSize='large' />
          </IconButton>
          <Grid item xs={4} style={{ marginBotton: '100px'}}>
            <Paper elevation={5} style={{ height: '650px', textAlign: 'center', padding: '5px'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ maxWidth: '100%', flexBasis: '100%'}}>
                <Typography variant="h5" style={{ textAlign: 'center', marginTop: '10px', marginBotton: '0px', color: '#4791db', fontSize: "28px"}}>
                  All Users
                </Typography>
                <div style={{ display: 'flex', justify: 'center'}}>
                  <TextField onChange={ e => setSearchTerm(e.target.value) } label="Search Users..." style={{ margin: '0px 20px 10px 40px'}}/>
                </div>  
                <Paper>
                  <List style={{ height: '532px', overflow: 'auto'}} >
                    { generateUsers(userList) }
                  </List>
                </Paper>
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
