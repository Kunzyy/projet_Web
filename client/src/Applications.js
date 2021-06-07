import logo from './logo.svg';
import './App.css';
import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import DataServiceUser from './services/tmpUserService';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SettingsIcon from '@material-ui/icons/Settings';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useCookies} from "react-cookie";

import {useStyles, Copyright, adminButton, menu} from "./commonFunctions";

function Applications() {
    const classes = useStyles();
    const [NbrImg, setNbrImg] = useState('');
    const [NbrObjet, setNbrObjet] = useState('');
    const [Description, setDescription] = useState('');

    const [cookies, setCookie] = useCookies(['userId', 'isLogged', 'isAdmin']);


    console.log(cookies.userId);
    console.log(cookies.isLogged);
    console.log(cookies.isAdmin);


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
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <Link color="inherit" href="/">ACCUEIL </Link>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                        </Typography>

                        {adminButton(cookies.isAdmin)}
                        {menu(cookies.isLogged,
                            () => {
                                setCookie('userId', null);
                                setCookie('isLogged', 'false');
                                setCookie('isAdmin', 'false');
                            })
                        }

                    </Toolbar>
                </AppBar>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Container maxWidth="sm" style={{ 'border-right': '1px solid grey', height: '80vh' }}>
                            <Container>
                                <h1> Applications </h1>
                                <Typography component="div"  >
                                <ul>
                                        <li>
                                            <Link href="#">Application 1</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Application 2</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Application 3</Link>
                                        </li>
                                    </ul>
                            </Typography>

                            </Container>
                            <br />
                            <br />
                            <br />
                            <br />
                            <hr />
                            <Container>
                                <h1> Mes Annotations </h1>
                                <Typography component="div"  >
                                    <ul>
                                        <li>
                                            <Link href="#">Annotation 1</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Annotation 2</Link>
                                        </li>
                                    </ul>
                                </Typography>

                            </Container>


                        </Container>
                    </Grid>
                    <Grid item xs={9} >
                        <Container  >
                            <br />
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '12vh' }} >
                                <h1> Application</h1>
                                les informations sur l'application selectionées seront ici
                            </Typography>
                        </Container>

                        <Container  >
                            <br />
                            <Typography component="div" style={{ backgroundColor: '#CACFD2 ', height: '45vh' }} >
                                <h1> Zone de traitement</h1>
                                les actions requises pour l'utilisation de l'application seront mises là!

                            </Typography>
     <form  noValidate autoComplete="off">
      <div>
        <TextField 
        id="Nombre d'image" 
        label="Nombre d'image"
        helperText="Nombre d'image annoté généré"
        defaultValue="500"
        type="number" 
        value={NbrImg}
        onChange={e => setNbrImg(e.target.value)}
        variant="outlined" />

        <TextField
          id="Nombre d'objet"
          label="Nombre d'objet"
          defaultValue="3"
          type="number" 
          helperText="Nombre d'objet maximun sur chaque image annoté"
          value={NbrObjet}
          onChange={e => setNbrObjet(e.target.value)}
          variant="outlined"
        />
        <TextField
          id="Nombre d'objet"
          label="Description"
          type="text" 
          helperText="Description de l'annotation sur base des classes d'objet"
          value={Description}
          onChange={e => setDescription(e.target.value)}
          variant="outlined"
        />
      </div>
    </form>
                            <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
                                <Button>Options</Button>
                                <Button onClick={submitValue}>Annoter</Button>
                                <Button>Upload</Button>
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

export default Applications;
