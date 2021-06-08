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
import DataServiceUser from '../src/services/tmpUserService';

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


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Admin() {
    const classes = useStyles();
    const [NbrImg, setNbrImg] = useState('');
    const [NbrObjet, setNbrObjet] = useState('');
    const [Description, setDescription] = useState('');
   

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


                            <Link color="inherit" href="/">ACCEUIL </Link>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                        </Typography>
                        <Button color="inherit">
                            <Link color="inherit" href="/applications">Applications </Link>
                        </Button>

                        <Button color="inherit">
                            <Link color="inherit" href="/">Login </Link>
                        </Button>

                    </Toolbar>
                </AppBar>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Container  >
                            <br />
                            <Typography component="div" style={{ backgroundColor: '#CACFD2 ', height: '45vh' }} >
                                <h1> Annotations </h1>
                                les actions requises pour l'utilisation de l'application seront mises là!
                            </Typography>
                            <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
                            <Button>Supprimer Annotation</Button>
                            <Button onClick={submitValue}>Utiliser Annnotation</Button>
                            <Button onClick={submitValue}>Ajouter Annotation</Button>
                            <Button >
                            <Link color="inherit" href="/NewApplication">Ajouter Application </Link>   
                            </Button>
                        </ButtonGroup>
                            
                        </Container>

                        <Container  >
                            <br />
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '28vh' }} >
                                <h1> Utilisateur</h1>
                                les informations sur l'application selectionées seront ici
                            </Typography>

                            <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
                            <Button>Supprimer utilisateur</Button>
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

export default Admin;
