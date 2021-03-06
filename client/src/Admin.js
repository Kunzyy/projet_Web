import './App.css';
import React , {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {useStyles, Copyright, navbar} from "./commonFunctions";
import {useCookies} from "react-cookie";
import AnnotationService from "./services/annotations.service";
import UserService from "./services/user.service";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

function Admin() {
    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [annot, setAnnot] = useState([]);
    const [message, setMsg] = useState('');
    const [annotId, setAnnotId] = useState('');

    //Tableau users
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //Tableau annotations
    const [page2, setPage2] = React.useState(0);
    const [rowsPerPage2, setRowsPerPage2] = React.useState(10);

    const [cookies, setCookie] = useCookies(['userId', 'isLogged', 'isAdmin']);

    if(cookies.isLogged === 'false' || cookies.isAdmin === 'false'){
        setCookie('userId', undefined);
        setCookie('isLogged', 'false');
        setCookie('isAdmin', 'false');
        window.location.href='/';
    }

    function createDataAnnotations(id, database, application, user, path, date, descr) {
        return {id, database, user, application, path, date, descr};
    }

    if(!annot.length) {
        AnnotationService.getAllAnnotations()
            .then(res => {
                let tmp = [];
                for (let i = 0; i < res.data.length; i++) {
                    const row = res.data[i];
                    tmp.push(createDataAnnotations(
                        row.annotation_id,
                        row.bdd_id,
                        row.user_id,
                        row.application_id,
                        'annotation'+row.annotation_id,
                        row.creation_date,
                        row.description
                    ));
                }
                setAnnot(tmp);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const columnsAnnotations = [
        {id: 'id', label: 'ID', minWidth: 70 },
        {id: 'database', label: 'ID Database', minWidth: 70 },
        {id: 'user', label: 'ID User', minWidth: 70 },
        {id: 'application', label: 'ID application', minWidth: 70},
        {id: 'path', label: 'Path', minWidth: 100},
        {id: 'date', label: 'Date', minWidth: 100},
        {id: 'descr', label:'Description', minWidth: 250}
    ];


    function createDataUsers(id, username, fullName, boolAdmin, email) {
        return { id, username, fullName, boolAdmin, email };
    }

    if(!users.length) {
        UserService.getAllUsers()
            .then(res => {
                let tmp = [];
                for (let i = 0; i < res.data.length; i++) {
                    const row = res.data[i];
                    tmp.push(createDataUsers(row.user_id, row.username, row.full_name, row.bool_admin, row.email));
                }
                setUsers(tmp);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const columnsUsers = [
        {id: 'id', label: 'ID', minWidth: 70 },
        {id: 'username', label: 'Username', minWidth: 170 },
        {id: 'fullName', label: 'Nom complet', minWidth: 170},
        {id: 'boolAdmin', label: 'Admin', minWidth: 100,
        format: (value) => {if(value){return 'Oui';}else{return 'Non'}}},
        {id: 'email', label: 'email', minWidth: 200}
    ];

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
                <Grid container spacing={10}>
                    <Grid item xs={12} >
                        <Container  >
                            <Typography component="div" style={{height: '5vh' }} >
                            </Typography>
                            <Typography component="div" style={{ backgroundColor: '#CACFD2 ', height: '55vh' }} >
                                <TableContainer style={{ height: '55vh'}} className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columnsAnnotations.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {annot.slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2).map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columnsAnnotations.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format ? column.format(value) : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Typography>
                            <br/>
                                <Typography component="div" style={{height: '15vh'}} >
                                    <p>{message}</p>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="annotId"
                                    label="Id Annotation"
                                    type="number"
                                    id="annotId"
                                    onChange={e => setAnnotId(e.target.value)}
                                />
                                <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
                                    <Button
                                        onClick={()=>{
                                            if(annotId){
                                                AnnotationService.deleteAnnotation(annotId)
                                                    .then(() =>{
                                                        setMsg("Annotation bien supprim??e ! ")
                                                        setAnnot([]);
                                                    })
                                            }
                                            else{
                                                setMsg("S??lectionnez un id annotation");
                                            }

                                        }}
                                    >
                                        Supprimer Annotation</Button>
                                    <Button href={"#"}>Ajouter donn??es annotation</Button>
                                    <Button onClick={()=>{
                                        if(annotId){
                                            window.location.href = '/resultat?id=' + annotId;
                                        }else{
                                            setMsg('Choisissez une annotation ?? tester');
                                        }
                                    }}>Tester des annotations</Button>
                                </ButtonGroup>
                                    <br/>
                                <hr/>
                                <Button >
                                    <Link color="inherit" href="/NewApplication">Ajouter une Application</Link>
                                </Button>
                            </Typography>
                            <br/><br/><br/><br/><br/><br/>
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50vh' }} >
                                <TableContainer style={{height: '50vh'}} className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columnsUsers.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columnsUsers.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format ? column.format(value) : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Typography>
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
