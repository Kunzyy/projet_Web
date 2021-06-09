import './App.css';
import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


import Box from '@material-ui/core/Box';
import UserService from "./services/user.service";
import {useStyles, Copyright, navbar} from "./commonFunctions";
import {useCookies} from "react-cookie";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


function Equipe() {
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

            </div>
            <Grid container spacing={3}>
            <Grid item xs={3} >
            <Card className={classes.shapeCard}>
                
                    <CardMedia
                    className={classes.media}
                    image="/static/guy.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Guy Roland KUE 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       Polytech UMONS Master 2 ingénieur civil en informatique et gestion 
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs={3}>
            <Card className={classes.shapeCard}>
               
                    <CardMedia
                    className={classes.media}
                    image="/static/pf.png"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Pierre-François MISTRI
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       Polytech UMONS Master 2 ingénieur civil en informatique et gestion 
                    </Typography>
                    </CardContent>
                </Card>
                </Grid><Grid item xs={3}>
            <Card className={classes.shapeCard}>
                
                    <CardMedia
                    className={classes.media}
                    image="/static/nicolas.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Nicolas KUNTZ
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       Polytech UMONS Master 2 ingénieur civil en informatique et gestion 
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs={3}>                  
            <Card className={classes.shapeCard}>               
                    <CardMedia
                    className={classes.media}
                    image="/static/thomas.png"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Thomas GUILY
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       Polytech UMONS Master 2 ingénieur civil en informatique et gestion 
                    </Typography>
                    </CardContent>
            
                </Card>
                </Grid>
                </Grid>

            <Box mt={8}>
                <Copyright />
            </Box>
        </div>

    );
}

export default Equipe;
