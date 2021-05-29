import './App.css';
import Header from './components/Header'
import {Container, Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {db} from './Firebase/Firebase';
import DetailsDialog from "./components/DetailsDialog";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import {  makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
        nav:{
            listStyle: 'none',
            display: 'flex',
            paddingLeft: '0',
        },
        navItem: {
            paddingRight: '1rem',
            transition: 'all 0.3s ease-in-out',
            '&:hover':{
                transform: 'translateY(-2px)'
            }
        },
        navLink:{
            color: '#888686',
            fontSize: '1rem',
            textDecoration: 'none',
            fontWeight: 'bold',

        },
        active:{
            color:'#000',
        }
    })
)
function App() {
    const classes = useStyles();
    // Initializing State
    const [loading, setLoading] = useState(true)
    const [animeList, setAnimeList] = useState([])

    // Initializing useEffect call to fetch anime list from db
    useEffect(() => {
        db.collection('anime').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setAnimeList(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    // useEffect call to display the anime list
    useEffect(() => {
        if (animeList) {
            setLoading(false)
        }
    }, [animeList])
    const animeLoader = (category) => {
        if(!loading){
            console.log("here")

            return animeList.map(
                anime => (
                        anime.status === category ? (
                            <Grid container item md={4}>
                            <DetailsDialog api={anime}/>
                            </Grid>

                        ) : ""

                )
            )
        }

    }

    return (

        <div className="App">

            <Header/>

            <Container className="mt-5" maxWidth="md">
                <Router>
                    <nav>
                        <ul className={classes.nav}>
                            <li className={classes.navItem} >
                                <NavLink exact to="/" className={classes.navLink} activeClassName={classes.active} >Currently Watching</NavLink>
                            </li>
                            <li className={classes.navItem} >
                                <NavLink to="/towatch" className={classes.navLink} activeClassName={classes.active} >To Watch</NavLink>
                            </li>
                            <li className={classes.navItem} >
                                <NavLink to="/onhold" className={classes.navLink} activeClassName={classes.active} >On Hold</NavLink>
                            </li>
                            <li className={classes.navItem} >
                                <NavLink to="/dropped" className={classes.navLink} activeClassName={classes.active} >Dropped</NavLink>
                            </li>
                            <li className={classes.navItem} >
                                <NavLink to="/completed" className={classes.navLink} activeClassName={classes.active} >Completed</NavLink>
                            </li>
                            <li className={classes.navItem} >
                                <NavLink to="/all" className={classes.navLink} activeClassName={classes.active} >All</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path={"/"}>
                            <Grid container spacing={1}>
                                { loading ? "Loading" : "" }
                                {animeLoader('Watching')}
                            </Grid>

                        </Route>
                        <Route path={"/towatch"}>
                            <Grid container spacing={1}>
                                {animeLoader('To Watch')}
                            </Grid>

                        </Route>
                        <Route path={"/onhold"}>
                            <Grid container spacing={1}>
                                {animeLoader('On Hold')}
                            </Grid>

                        </Route>
                        <Route path={"/dropped"}>
                            <Grid container spacing={1}>
                                {animeLoader('Dropped')}
                            </Grid>

                        </Route>
                        <Route path={"/completed"}>
                            <Grid container spacing={1}>
                                {animeLoader('Completed')}
                            </Grid>

                        </Route>
                        <Route path={"/all"}>
                            <Grid container spacing={1}>
                                {loading ? 'loading' : animeList.map(
                                    anime => (

                                        <Grid container item md={4}>

                                            <DetailsDialog api={anime}  />

                                        </Grid>

                                    )

                                ) }
                            </Grid>

                        </Route>
                    </Switch>
                </Router>



            </Container>

        </div>
    );
}

export default App;
