import './App.css';
import Header from './components/Header'
import {Container, Grid} from "@material-ui/core";
import ListingCard from './components/ListingCard'
import {useEffect, useState} from "react";
function App() {
    const api = {
        'image_url' : 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
        'title_english': 'Naruto',
        'episodes': 220,
        'rating':'',
        'status': 'Watching',
        'airing': 'Yes'
    }
    const [loading,setLoading] = useState(true)
    const [anime,setAnime] = useState({});
    const [error,setError] = useState(null);
    useEffect(
        ()=> {
            fetch('https://api.jikan.moe/v3/anime/20').then(
                res => res.json()
            ).then(
                res => {
                    setLoading(false);
                    setAnime(res)
                },
                error => {
                    setError(error);
                }
            )
        }
        ,[])
    console.log(anime)
    let val;
    if(error){
        val = <div>Error: {error.message}</div>
    }else if(loading){
        val = <div>Loading !!!!</div>
    }else{
        val = <ListingCard api={anime} />
    }
  return (
    <div className="App">
        <Header />
        <Container className="mt-5" maxWidth="md" >
            <Grid container spacing={1}>
                <Grid container item md={3}>
                    {val}
                </Grid>
            </Grid>
        </Container>
    </div>
  );
}

export default App;
