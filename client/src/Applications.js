import logo from './logo.svg';
import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

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

function Applications() {
    const classes = useStyles();
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
                            <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
                                <Button>Options</Button>
                                <Button>Annoter</Button>
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
