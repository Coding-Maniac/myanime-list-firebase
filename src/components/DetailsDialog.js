// This component is used to display details of the particular anime

import React, {useState,useEffect, useRef} from 'react';
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
import ListingCard from "./ListingCard";
import SnackBar from './SnackBar'
import { db } from '../Firebase/Firebase'
const useStyles = makeStyles(() => ({
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
const DetailsDialog = ({api}) => {
    const classes = useStyles()
    const initialRender = useRef(true)
    const [open, setOpen] = React.useState(false);
    const [snackState, setSnackState] = useState();
    const [snackType, setSnackType ] = useState();
    const [snackMessage, setSnackMessage] = useState();
    const [status, setStatus] = useState(api.status);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleStatus = async (event) => {
        await setStatus(event.target.value)
    }
    useEffect(()=>{
        if(initialRender.current){
            initialRender.current = false
        }
        else{
            updateAnime()
        }
    },[status])
    const updateAnime = () => {
        let updateAnime = db.collection('anime').doc(api.name);
        updateAnime.update({
            status: status,
        }).then(() => {
            setSnackState(true)
            setSnackType('success')
            setSnackMessage('Status Updated Successfully');
            setSnackState(false)
        }).catch((error) => {
            setSnackState(true)
            setSnackType('warning')
            setSnackMessage('Failed to update DB')
            console.log('Error',error);
        })
    }
    const updateDoc = () => {
        updateAnime()
        handleClose()
    }


    return(
        <>
            <ListingCard key={api.name} handleStatus={handleStatus} status={status} setStatus={setStatus} api={api} handleClickOpen={handleClickOpen}/>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>

                    <Container>

                        <Grid container spacing={2}>

                            <Grid item xs={2}>

                                <img src={api.logo} className={classes.logo} alt=""/>

                            </Grid>

                            <Grid item xs={9} style={{margin:"auto"}}>

                                <h4 className={classes.title}>{api.name}</h4>

                            </Grid>

                            <Grid item xs={6}>

                                <p className={classes.subHeading}>Episodes</p>
                                <h4 className={classes.value}>{api.episodes}</h4>

                            </Grid>

                            <Grid item xs={6}>

                                <p className={classes.subHeading}>Rating</p>
                                <h4 className={classes.value}>{api.rating}</h4>

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
                                        <MenuItem value={'To Watch'} >
                                            To Watch
                                        </MenuItem>

                                        <MenuItem value={'Watching'} >
                                            Watching
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

                                <h4 className={classes.value}>{api.airing ? 'True': 'False'}</h4>

                            </Grid>

                            <Button variant="contained" size="small" color="primary" onClick={updateDoc} className={classes.addBtn}>

                                <Typography variant="button" >Modify status to {status}  </Typography>

                            </Button>

                        </Grid>

                    </Container>

                </DialogContent>

            </Dialog>
            <SnackBar snackState={snackState}  type={snackType} message={snackMessage} />
        </>

    )

}

export default DetailsDialog