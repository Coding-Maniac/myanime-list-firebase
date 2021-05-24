import React, {useState} from 'react';
import {
    Container,
    Dialog,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText, Typography,
    Button
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    listStyle: {
        position: 'absolute',
        background:'white',
        top: '19px',
        marginLeft: '10px',
        width: '96%',
        listStyle:'none',
        paddingLeft: '0',
        borderRadius: '4px',
        boxShadow: "-2px 3px 9px #a19d9d",

    },
    listItems: {
        padding: '1rem',
        color:'black',
        borderBottom: '1px solid black',
        display: 'flex',
        alignItems:'center',
    },
    listItemTitle: {
        fontSize:'16px',
        fontWeight:'bold',
        marginLeft: '1rem',
    },
    listItemsIcon: {
        width: '30px'
    },
    logo:{
        width: 35
    },
    subHeading:{
        fontSize: "0.7rem",
        fontWeight: 400,
        marginBottom: '0.3rem',
        marginTop:'0'
    },
    value: {
        fontSize: "1.1rem",
        fontWeight: "bold",
        marginBottom: '0.3rem',
        marginTop:'0'
    },
    title:{
        margin:'0'
    },
    addBtn:{
        width:'100%',
        margin: '1rem'
    }
}))
const AnimeDialog = (props) => {
    const classes =useStyles()
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('Currently Watching');
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleStatus = (event) => {
        setStatus(event.target.value)
    }

    return(
        <div>
            <li className={classes.listItems} key={props.anime.mal_id} onClick={handleClickOpen}>
                <img className={classes.listItemsIcon} src={props.anime.image_url} />
                <span className={classes.listItemTitle}>{props.anime.title}</span>
            </li>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <Container>
                       <Grid container spacing={2}>
                           <Grid item xs={2}>
                               <img src={props.anime.image_url} className={classes.logo} alt=""/>
                           </Grid>
                           <Grid item xs={9} style={{margin:"auto"}}>
                               <h4 className={classes.title}>{props.anime.title}</h4>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={classes.subHeading}>Episodes</p>
                               <h4 className={classes.value}>{props.anime.episodes}</h4>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={classes.subHeading}>Rating</p>
                               <h4 className={classes.value}>{props.anime.score}</h4>
                           </Grid>
                           <Grid item xs={6}>
                               <FormControl style={{minWidth: '120px'}}>
                                   <InputLabel id="status">Status</InputLabel>
                                   <Select
                                       labelID={"status"}
                                       id={"select-status"}
                                       value={status}
                                       onChange={handleStatus}
                                   >
                                       <MenuItem value={'Currently Watching'} >
                                           Currently Watching
                                       </MenuItem>
                                       <MenuItem value={'Completed'}>
                                           Completed
                                       </MenuItem>
                                       <MenuItem value={'On Hold'}>
                                           On Hold
                                       </MenuItem>
                                       <MenuItem value={"Dropped"}>
                                           Dropped
                                       </MenuItem>
                                   </Select>
                                   <FormHelperText>Required</FormHelperText>
                               </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={classes.subHeading}>Airing</p>
                               <h4 className={classes.value}>{props.anime.airing ? 'True': 'False'}</h4>
                           </Grid>
                           <Button variant="contained" size="small" color="primary" className={classes.addBtn}>
                           <Typography variant="button" >ADD TO {status}</Typography>
                       </Button>
                       </Grid>

                    </Container>

                </DialogTitle>
            </Dialog>
        </div>

    )
}

export default  AnimeDialog