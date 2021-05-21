import React from 'react';
import { makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import {CardActions} from "@material-ui/core";
import {CardContent} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles({
    root:{
        minWidth: 275,
    },
    title:{
        fontSize: 14,
    },
    pos:{
        marginBottom: 12,
    },
});

function ListingCard(){
    const classes = useStyles()

    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" glutterBottom>
                    Anime Card of the day
                </Typography>
            </CardContent>
        </Card>
    )
}

export default  ListingCard