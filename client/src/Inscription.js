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


function Inscription() {
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
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Inscription
        </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Nom et prénom"
                            name="fullName"
                            autoComplete="fullName"
                            autoFocus
                            onChange={e => setfullName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setMail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="ConfirmerEmail"
                            label="Confimer Email Address"
                            name="ConfirmerEmail"
                            autoComplete="email"
                            autoFocus
                            onChange={e => {
                                    if (e.target.value !== mail && e.target.value !== "")
                                        setError2("Les emails ne correspondent pas");
                                    else
                                        setError2(null);
                                }
                            }
                        />
                        <p>{msgError2}</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            onChange={e => {
                                if (e.target.value !== password && e.target.value !== "")
                                    setError3("Les mots de passe ne correspondent pas");
                                else
                                    setError3(null);
                                }
                            }
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
                            Valider
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

export default Inscription;
