import './App.css';
import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ApplicationService from "./services/applications.service";

import {useStyles, Copyright, navbar} from "./commonFunctions";
import {useCookies} from "react-cookie";


function NewApplication() {
    const classes = useStyles();

    const [cookies, setCookie] = useCookies(['userId', 'isLogged', 'isAdmin']);

    const [msgError1, setError1] = useState('');
    const [msgError2, setError2] = useState('');
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [requirements, setRequire] = useState('');

    if (cookies.isLogged === 'false' || cookies.isAdmin === 'false') {
        setCookie('userId', undefined);
        setCookie('isLogged', 'false');
        setCookie('isAdmin', 'false');
        window.location.href = '/';
    }

    function handleClick() {
        return new Promise((resolve, reject) => {
            if (name === "" || descr === "" || requirements === "") {
                reject("Tous les champs ne sont pas remplis");
            } else {
                ApplicationService.add(name, descr, requirements)
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject("Problème avec la base de données");
                    });
            }
        });
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

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Nouvelle Application
        </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="applicationName"
                            label="Nom application"
                            name="applicationName"
                            autoComplete="username"
                            autoFocus
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="descriptionApplication"
                            label="Description Application"
                            name="descriptionApplication"
                            autoComplete="fullName"
                            autoFocus
                            onChange={e => setDescr(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="requirements"
                            label="requirements"
                            name="requirements"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setRequire(e.target.value)}
                        />
                        <p>{msgError2}</p>
                        <p>{msgError1}</p>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={async ()=>{
                                await handleClick()
                                    .then(() => {
                                        setError1(null);
                                        console.log("Sign up ok !");
                                        window.location.href='/applications';
                                    })
                                    .catch(msg => {
                                        setError1(msg);
                                    });
                                }
                            }
                        >
                            Créer
          </Button>
                    </form>
                </div>
            </Container>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>

    );
}

export default NewApplication;
