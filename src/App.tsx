import React from 'react';
import './App.css';
import Breeds from "./features/breeds/Breeds";
import {AppBar, Container, Grid, Toolbar, Typography} from "@mui/material";
import {useGetBreedListQuery} from "./features/breeds/breedsApi";
import Filters from "./features/filters/Filters";
import {useAppSelector} from "./app/hooks";

function App() {
    const {data, isLoading} = useGetBreedListQuery();
    let {data: filtered} = useAppSelector((state) => state.filters);

    if (isLoading || data === undefined) {
        return null;
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Dog O' View
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <br/>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Filters breeds={data}/>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Breeds breeds={filtered}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
