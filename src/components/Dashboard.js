import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

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
  }));

const gridStyle = {
    backgroundColor: '#f1f1f1',
    borderRadius: '10px'
}

const buttonStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '400px', padding: '50px'
}

const Dashboard = (props) => {
    const classes = useStyles()

    const handelLogOut = () => {
        // console.log('enters log out')
        localStorage.clear()
        props.history.push("/login")
    }

    const handleNewGame = () => {
        props.history.push("/game")
    }

    
    return(
        <Container maxWidth="lg">
            <Grid container direction='row' justify='space-evenly' alignItems='center' >
                <Grid item xs={6} container direction='column' justify='space-between' spacing={10}>
                    <Grid item xs={8} >
                        <Paper elevation={4} style={{ textAlign: 'center', padding: '10px' }}>
                            <Avatar src="/broken-image.jpg" style={{margin: 'auto'}} className={classes.large}/>
                            <h3>{localStorage.username}</h3>
                            <p>{localStorage.created_at.split(' GMT')[0]}</p>
                            <Button variant='outlined' color='primary'>Edit</Button>
                            <Button onClick={handelLogOut} variant='outlined' color='primary'>Log out</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} >
                        <Paper elevation={4} style={buttonStyle}>
                            <Button onClick={handleNewGame} variant='contained' color='primary'>New Game</Button>
                            <Button variant='contained' color='primary'>More Options</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={2} style={{ marginBotton: '300px' }}>
                    <Paper elevation={4} style={{ height: '500px', textAlign: 'center', padding: '5px'}}>
                        <h2>History</h2>
                        <p>Game 1</p>
                        <p>Game 2</p>
                        <p>Game 3</p>
                        <p>Game 4</p>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )

}

export default Dashboard