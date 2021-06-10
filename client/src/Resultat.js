import './App.css';
import React , {useState} from 'react';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import {useStyles, Copyright, navbar} from "./commonFunctions";
import {useCookies} from "react-cookie";
import {useLocation} from "react-router-dom";

function Resultat() {
    const classes = useStyles();

    const [cookies, setCookie] = useCookies(['userId', 'isLogged', 'isAdmin']);

    const [annotationId, setAnnotationId] = useState(null);
    const [path, setPath] = useState('');

    if(cookies.isLogged === 'false'){
        setCookie('userId', undefined);
        setCookie('isLogged', 'false');
        setCookie('isAdmin', 'false');
        window.location.href='/';
    }

    const id = new URLSearchParams(useLocation().search).get('id');
    if(!annotationId && id){
            setAnnotationId(id);
    }

    if(path === ''){
        let img = Math.floor(Math.random() * 19) + 1;
        setPath('bdd1_result/'+img+'.PNG');
        console.log(path);
    }



    return (
        <div className="App">
            <div className={classes.root}>

                {navbar(
                    classes,
                    cookies.isLogged,
                    cookies.isAdmin,
                    () => {
                        setCookie('userId', null);
                        setCookie('isLogged', 'false');
                        setCookie('isAdmin', 'false');
                    }
                )}

                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Container  >
                            <p>Upload d'un modèle</p>
                            <button>Tester l annotation</button>
                            <br />
                            <Typography component="div" style={{ backgroundColor: '#CACFD2 ', height: '70vh' }} >
                                <h1> Résumé de l'annotation {annotationId}</h1>

                                <img src ={path} alt="resultat"/>
                            </Typography>
                        </Container>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    );
}

export default Resultat;
