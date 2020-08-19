import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        width: '100%',
        maxWidth: 310,
        backgroundColor: theme.palette.background.paper,
    },
}))

const textAlignCenter = {
    textAlign: 'center'
}

const selectedStyle = {
    backgroundColor: '#ffb74d',
    color: 'white',
    borderRadius: '2px'
}


export default function Answer(props) {
    const [ selected, setSelected ] = useState('')
    const classes = useStyles()

    const handleSubmit = () => {
        if(selected === props.correctAnswer){
            props.nextQuestion(1, "right", props.correctAnswer)
        }
        else{
            props.nextQuestion(0, "wrong", props.correctAnswer)
        }
        setSelected('')
    }

    return(
        <>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                <ListItem button onClick={() => setSelected(props.allAnswers[0]) } style={selected === props.allAnswers[0] ? selectedStyle : {}} >
                    <ListItemText primary={props.allAnswers[0]} style={textAlignCenter} />
                </ListItem>
                <Divider />
                <ListItem button divider onClick={() => setSelected(props.allAnswers[1])} style={selected === props.allAnswers[1] ? selectedStyle : {}} >
                    <ListItemText primary={props.allAnswers[1]} style={textAlignCenter} />
                </ListItem>
                <ListItem button onClick={() => setSelected(props.allAnswers[2])} style={selected === props.allAnswers[2] ? selectedStyle : {}} >
                    <ListItemText primary={props.allAnswers[2]} style={textAlignCenter} />
                </ListItem>
                <Divider light />
                <ListItem button onClick={() => setSelected(props.allAnswers[3])} style={selected === props.allAnswers[3] ? selectedStyle : {}}>
                    <ListItemText primary={props.allAnswers[3]} style={textAlignCenter} />
                </ListItem>
            </List>
            <Button
                color="primary"
                variant='contained'
                onClick={ () => handleSubmit()}
                style={{ width: '310px', height: '45px', marginTop: '20px'}}
            >
            Submit
            </Button>
        </>
    )
    
}

