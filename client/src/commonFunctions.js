import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import Button from "@material-ui/core/Button";

// Fonctions pour la mise en forme des pages de Sign in et de sign up

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

function menu(isLogged, clearCookies){
    if(isLogged === 'true'){
        return(
            <div>
                <Button color="inherit">
                    <Link color="inherit" href="/applications">Applications</Link>
                </Button>

                <Button color="inherit">
                    <Link
                        color="inherit"
                        href="/"
                        onClick={() => {
                            console.log("Clearing cookies");
                            clearCookies();
                            }
                        }
                    >
                        Logout
                    </Link>
                </Button>
            </div>
        );
    }
    else {
        return(
            <div>
                <Button disabled={true} color="inherit">
                    <Link color="inherit" href="/applications">Applications</Link>
                </Button>

                <Button color="inherit">
                    <Link color="inherit" href="/">Login</Link>
                </Button>
            </div>
        );
    }
}

function adminButton(isAdmin){
    if(isAdmin === 'true'){
        return (
            <Button color="inherit">
                <Link color="inherit" href="/admin">Admin</Link>
            </Button>
        );
    }

}

export{
    useStyles,
    Copyright,
    menu,
    adminButton
};
