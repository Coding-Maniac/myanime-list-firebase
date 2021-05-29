import React from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import {CardContent} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import './css/ListingCard.css'

const useStyles = makeStyles({
    root:{
        flexGrow: 1,
        minWidth: 250
    },
    title:{
        fontSize: 14,
    },
    pos:{
        marginBottom: 12,
    },
    subHeading:{
        fontSize: "0.7rem",
        fontWeight: 400,
    },
    value: {
        fontSize: "0.9rem",
        fontWeight: "bold",
        maxHeight: '50px'
    },
    mAuto:{
        margin: "auto"
    },
    status:{
        fontSize: "0.8rem",
        fontWeight:"bold"
    },
    logo:{
        width: 35
    },
    w100:{
        width:"100%"
    },
    mt5:{
        marginTop: "1rem"
    },
    select: {
        width: '6rem',
        fontSize: '0.8rem'
    }
});

function ListingCard(props){
    const classes = useStyles()


    return(

        <Card className={classes.root}>

            <CardContent>

                {/* Grid */}
                <Grid container spacing={1}>

                    <Grid item xs={3}>

                        {/* Anime Logo */}
                        <img src={props.api.logo} className={classes.logo} alt={`${props.api.name} logo`} />

                    </Grid>

                    {/* Anime Name */}
                    <Grid item xs={9} className={classes.mAuto}>

                        <Typography variant="h6"  className={classes.value} >{(props.api.name.length) > 40 ? `${props.api.name.substr(0,40)} ...` : props.api.name }</Typography>

                    </Grid>

                    <Grid item xs={6} >
                        {/* Number of Episodes */}

                        <Typography variant="caption" className={classes.subHeading}>Episodes</Typography>
                        <Typography  variant="h6" className={classes.value}> {props.api.episodes}</Typography>

                    </Grid>

                    <Grid item xs={6}>

                        {/* Rating of Anime */}

                        <Typography variant="caption" className={classes.subHeading}>Rating</Typography>
                        <Typography variant="h6" className={classes.value} >{props.api.rating}</Typography>

                    </Grid>

                    <Grid item xs={6}>

                        {/* Status of Anime */}

                        <FormControl style={{minWidth: '120px'}}>

                            <InputLabel id="status">Status</InputLabel>

                            <Select
                                labelID={"status"}
                                id={"select-status"}
                                value={props.status}
                                onChange={props.handleStatus}
                                className={classes.select}
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

                        {/* Status of Anime */}

                        <Typography variant="caption" className={classes.subHeading}>Airing</Typography>
                        <Typography  variant="h6" className={classes.status} style={{textTransform:'capitalize'}} >{props.api.airing? 'True': 'False'}</Typography>
                    </Grid>

                </Grid>

                <Button variant="contained" size="small" color="primary" className={[classes.w100,classes.mt5]} onClick={props.handleClickOpen}>

                    <Typography variant="button" >More Details</Typography>

                </Button>

            </CardContent>

        </Card>
    )
}

export default  ListingCard