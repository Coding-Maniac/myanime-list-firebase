import './App.css';
import Header from './components/Header'
import {Container, Grid} from "@material-ui/core";
import ListingCard from './components/ListingCard'
function App() {
  return (
    <div className="App">
        <Header />
        <Container className="mt-5" maxWidth="md" >
            <Grid container spacing={1}>
                <Grid container item md={4}>
                    <ListingCard />
                </Grid>
            </Grid>
        </Container>
    </div>
  );
}

export default App;
