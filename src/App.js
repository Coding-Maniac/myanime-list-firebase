import './App.css';
import Header from './components/Header'
import {Container, Grid} from "@material-ui/core";
import ListingCard from './components/ListingCard'
import {useEffect, useState} from "react";
import {db} from './Firebase/Firebase';
function App() {
    // Initializing State
    const [loading,setLoading] = useState(true)
    const [animeList, setAnimeList] = useState([])

    // Initializing useEffect call to fetch anime list from db
    useEffect(() => {
        db.collection('anime').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setAnimeList(snapshot.docs.map( doc => doc.data() ))
        })
    },[])

    // useEffect call to display the anime list
    useEffect(() => {
        if(animeList){
            setLoading(false)
        }
    },[animeList])

  return (

    <div className="App">

        <Header />

        <Container className="mt-5" maxWidth="md" >

            <Grid container spacing={1}>

                {loading ? 'loading' : animeList.map(
                    anime => (

                        <Grid container item md={4}>

                            <ListingCard api={anime}  />

                        </Grid>

                    )

                ) }

            </Grid>

        </Container>
    </div>
  );
}

export default App;
