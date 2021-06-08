import './App.css';
import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserService from "./services/user.service";

import {useStyles, Copyright, navbar} from "./commonFunctions";
import {useCookies} from "react-cookie";


function NewApplication() {
    const classes = useStyles();

    const [cookies, setCookie] = useCookies(['userId', 'isLogged', 'isAdmin']);

    const [msgError1, setError1] = useState('');
    const [msgError2, setError2] = useState('');
    const [msgError3, setError3] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setfullName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    function handleClick() {
        return new Promise((resolve, reject) => {
            if (username === "" || fullName === "" || mail === "" || password === "") {
                reject("Tous les champs ne sont pas remplis");
            } else {
                UserService.addUser(username, fullName, mail, password)
                    .then(res => {
                        console.log(res.data);
                        if(res.data.constraint === 'users_email_key'){
                            reject("Adresse email déjà utilisée ! ");
                        }
                        else {
                            console.log(res.data);
                            setCookie('userId', res.data);
                            setCookie('isLogged', 'true');
                            setCookie('isAdmin', 'false');
                            resolve();
                        }
                    })
                    .catch(err => {
                        reject("Problème avec la base de données");
                    });
            }
        });
    }

    return (
        <div className="App">

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
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="descriptionApplication"
                            label="Description Apllication"
                            name="descriptionApplication"
                            autoComplete="fullName"
                            autoFocus
                            onChange={e => setfullName(e.target.value)}
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
                            onChange={e => setMail(e.target.value)}
                        />
                        <p>{msgError3}</p>
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
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>

    );
}

export default NewApplication;
