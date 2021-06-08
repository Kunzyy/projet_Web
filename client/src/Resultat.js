import './App.css';
import React , {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DataServiceUser from './services/tmpUserService';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {useStyles, Copyright, navbar} from "./commonFunctions";
import {useCookies} from "react-cookie";

function Resultat() {
    const classes = useStyles();
    const [NbrImg, setNbrImg] = useState('');
    const [NbrObjet, setNbrObjet] = useState('');
    const [Description, setDescription] = useState('');

    const [cookies, setCookie] = useCookies(['userId', 'isLogged', 'isAdmin']);

    if(cookies.isLogged === 'false'){
        setCookie('userId', undefined);
        setCookie('isLogged', 'false');
        setCookie('isAdmin', 'false');
        window.location.href='/';
    }

    const submitValue = () => {
        var data = {
            'nbr image' : NbrImg,
            'nbr objet' : NbrObjet,
            'description' : Description,
            'bdd_name': 'bdd test',
            'bdd_id': 2,
            'bdd_size': 0,
            'nb_classes':0,
            'application_id':1,
            'user_id':1,
            'creation_path': 'path',
            'creation_date': '04/06/21'

        };
        DataServiceUser.annoter(data)
      .then(response => {console.log(response.data);})
      .catch(e => {
        console.log(e);
      });
      console.log(data)
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
                        <br />
                        <Typography component="div" style={{ backgroundColor: '#CACFD2 ', height: '45vh' }} >
                            <h1> Resumé de l'annotation </h1>
                            les actions requises pour l'utilisation de l'application seront mises là!
                        </Typography>
                        <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
                        <Button>Nouvelle Annotation</Button>
                        <Button onClick={submitValue}>Télécharger Annnotation</Button>
                        <Button onClick={submitValue}>Ajouter Annotation</Button>
                    </ButtonGroup>

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
