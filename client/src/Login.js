import './App.css';
import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import {useCookies} from "react-cookie";

import UserService from './services/user.service';
import {useStyles, Copyright, navbar} from "./commonFunctions";


function Login () {

    const classes = useStyles();

    // Attention les cookies sont d'office stockés en string !!!

    const [cookies, setCookie] = useCookies([
        'userId',
        'isLogged',
        'isAdmin']
    );

    if(cookies.isLogged === 'true'){
        window.location.href='/applications';
    }

    const [msgError, setError] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    function handleClick() {
        return new Promise((resolve, reject) => {
        if (mail === "" || password === "") {
            reject("Email et mot de passe requis");
        } else {
            UserService.checkLogin(mail, password)
                .then(res => {
                    if (res.data) {
                        let isAdmin = res.data.bool_admin;
                        setCookie('userId', res.data.user_id);
                        setCookie('isLogged', 'true');
                        setCookie('isAdmin', isAdmin);
                        resolve();
                    } else {
                        reject("Mauvais identifiants de connexion");
                    }
                })
                .catch(err => {
                    console.log(err);
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
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate >
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={async ()=>{
                                    await handleClick()
                                        .then( () => {
                                            setError(null);
                                            console.log("You are logged");
                                            window.location.href='/applications';
                                        })
                                        .catch(msg => {
                                            setError(msg);
                                        });
                                }
                            }
                        >
                            Sign In
                        </Button>
                        <p>{msgError}</p>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/inscription" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </div>
    );
}

export default Login;
