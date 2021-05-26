import React, {useState} from 'react';
import {
    Container,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText, Typography,
    Button, DialogContent
} from "@material-ui/core";
import {  makeStyles } from "@material-ui/core/styles";
import { db } from '../Firebase/Firebase';
import firebase from 'firebase/app';
import SnackBar from './SnackBar'
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
        zIndex:'100'
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

const AnimeDialog = ({anime, setAnimeList}) => {

    const classes =useStyles()
    const [snackState, setSnackState] = useState();
    const [snackType, setSnackType ] = useState();
    const [snackMessage, setSnackMessage] = useState();
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

    const handleClick = (id) => {
        fetch(`https://api.jikan.moe/v3/anime/${id}`).then(
            res => res.json()
        ).then(
            res=>{
                db.collection('anime').doc(`${res.title}`).set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    logo: res.image_url,
                    name: res.title,
                    episodes: res.episodes,
                    rating: res.score,
                    status: status,
                    airing: res.airing,
                    prequel: res.related.Prequel || '' ,
                    sequel: res.related.Sequel || ''
                })
                setSnackState(true)
                setSnackType('success')
                setSnackMessage('Successfully added Anime to list')

            }
        ).catch(err => {
                console.log(err)
                setSnackState(false)
                setSnackType('warning')
                setSnackMessage('Error occured in adding anime to the list')
            }
        )
    }

    return(
        <>
            <div>

                <li className={classes.listItems} key={anime.mal_id} onClick={handleClickOpen}>
                    <img className={classes.listItemsIcon} src={anime.image_url} alt={`${anime.name} logo`} />
                    <span className={classes.listItemTitle}>{anime.title}</span>
                </li>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogContent>

                        <Container>

                            <Grid container spacing={2}>

                                <Grid item xs={2}>

                                    <img src={anime.image_url} className={classes.logo} alt=""/>

                                </Grid>

                                <Grid item xs={9} style={{margin:"auto"}}>

                                    <h4 className={classes.title}>{anime.title}</h4>

                                </Grid>

                                <Grid item xs={6}>

                                    <p className={classes.subHeading}>Episodes</p>
                                    <h4 className={classes.value}>{anime.episodes}</h4>

                                </Grid>

                                <Grid item xs={6}>

                                    <p className={classes.subHeading}>Rating</p>
                                    <h4 className={classes.value}>{anime.score}</h4>

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

                                    <h4 className={classes.value}>{anime.airing ? 'True': 'False'}</h4>

                                </Grid>

                                <p>{anime.id}</p>

                                <Button variant="contained" size="small" color="primary" onClick={() => handleClick(anime.mal_id)} className={classes.addBtn}>

                                    <Typography variant="button" >ADD TO {status}</Typography>

                                </Button>

                            </Grid>

                        </Container>

                    </DialogContent>

                </Dialog>

            </div>
            <SnackBar snackState={snackState}  type={snackType} message={snackMessage} />
        </>


    )
}

export default  AnimeDialog