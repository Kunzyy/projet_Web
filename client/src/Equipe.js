import './App.css';
import Typography from '@material-ui/core/Typography';


import Box from '@material-ui/core/Box';
import {useStyles, Copyright, navbar} from "./commonFunctions";
import {useCookies} from "react-cookie";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


function Equipe() {
    const classes = useStyles();

    const [cookies, setCookie] = useCookies(['userId', 'isLogged', 'isAdmin']);

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
