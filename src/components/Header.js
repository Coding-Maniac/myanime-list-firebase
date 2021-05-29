import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography} from "@material-ui/core";
import {InputBase} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import AnimeDialog from "./AnimeDialog";
import SnackBar from "./SnackBar";


// We are setting the styles using useStyles

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },
    menuButton:{
        marginRight: theme.spacing(2),
    },
    title:{
        flexGrow: 1,
        display:'none',
        [theme.breakpoints.up('sm')]:{
            display: "block",
        },
    },
    search:{
        position:'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover':{
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft:0,
        width: '100%',
        [theme.breakpoints.up('sm')]:{
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0,2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1,1,1,0),
    //    Vertical Padding + Font size from SearchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]:{
            width: '20ch',
            '&:focus':{
                width: '25ch',
            }
        }
    },
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
        zIndex:'100'

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
}));


function Header() {

    const [search,setSearch] = useState("");
    const [animeList, setAnimeList] = useState([]) ;
    // Setting state for SnackBar
    const [snackState, setSnackState] = useState();
    const [snackType, setSnackType ] = useState();
    const [snackMessage, setSnackMessage] = useState();
    // Calling useStyles and assign it to classes to access the styling

    useEffect(() => {
        if(search.length <3){
            setAnimeList([])
        }
        if (search.length >= 3) {
            fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&limit=6`).then(
                res => res.json()
            ).then(
                (res) => {
                    let results = res.results;
                    setAnimeList(results)
                }
            ).catch(err => {
                console.log(err)
            })
        }
    },[search])

    const classes = useStyles();

    // Writing the actual Navbar code

    return(

        <div className={classes.root}>

            <AppBar position="static" >

                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        My Anime List
                    </Typography>

                    <div style={{position: 'relative'}}>

                        <div className={classes.search}>

                            <div className={classes.searchIcon}>

                                <SearchIcon />
                            </div>

                            <InputBase placeholder="search" classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                           inputProps={{ 'aria-label': 'search' }}
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                        <ul className={classes.listStyle}>
                            {
                                animeList.map(ele => (
                                    <AnimeDialog
                                        anime={ele}
                                        setAnimeList={setAnimeList}
                                        setSnackState={setSnackState}
                                        setSnackType={setSnackType}
                                        setSnackMessage={setSnackMessage}
                                    />
                                ))
                            }
                        </ul>

                    </div>

                </Toolbar>

            </AppBar>
            <SnackBar snackState={snackState}  type={snackType} message={snackMessage}  />
        </div>
    )
}

export default Header