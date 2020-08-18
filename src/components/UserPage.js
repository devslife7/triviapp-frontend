import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
    },
    },
}));

const styleObj = {
    display: 'flex',
    fontWeight: 100,
    fontSize: 85,
    textAlign: 'center'
}


const UserPage = (props) => {
    const classes = useStyles();
    
    
    return(
        <div className={classes.root}>
            <Button variant="outlined" color="#4C88FA">
                New Game
            </Button>
            <Button variant="outlined" color="primary">
                Friends
            </Button>
            <Button variant="outlined" color="primary">
                Logout
            </Button>
        </div>
    )

}


export default UserPage