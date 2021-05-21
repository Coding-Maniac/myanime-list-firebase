import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import {CardActions} from "@material-ui/core";
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
        fontSize: "1.1rem",
        fontWeight: "bold"
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
                        <img src={props.api.image_url} className={classes.logo} />

                    </Grid>

                    {/* Anime Name */}
                    <Grid item xs={9} className={classes.mAuto}>

                        <Typography variant="h6"  className={classes.value} >{props.api.title_english}</Typography>

                    </Grid>

                    <Grid item xs={6} >
                        {/* Number of Episodes */}

                        <Typography variant="caption" className={classes.subHeading}>Episodes</Typography>
                        <Typography  variant="h6" className={classes.value}> {props.api.episodes}</Typography>

                    </Grid>

                    <Grid item xs={6}>

                        {/* Rating of Anime */}

                        <Typography variant="caption" className={classes.subHeading}>Rating</Typography>
                        <Typography variant="h6" className={classes.value} >{props.api.score}</Typography>
                    </Grid>

                    <Grid item xs={6}>

                        {/* Status of Anime */}

                        <Typography variant="caption" className={classes.subHeading}>Status</Typography>
                        <Typography  variant="h6" className={classes.status} >Watching</Typography>
                    </Grid>

                    <Grid item xs={6}>

                        {/* Status of Anime */}

                        <Typography variant="caption" className={classes.subHeading}>Airing</Typography>
                        <Typography  variant="h6" className={classes.status} >Yes</Typography>
                    </Grid>
                </Grid>
                <Button variant="contained" size="small" color="primary" className={[classes.w100,classes.mt5]}>
                    <Typography variant="button">More Details</Typography>
                </Button>
            </CardContent>
        </Card>
    )
}

export default  ListingCard