import './App.css';
import React , {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DataServiceUser from './services/tmpUserService';
import ApplicationService from './services/applications.service';
import AnnotationService from './services/annotations.service';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useCookies} from "react-cookie";
import DOMPurify from "dompurify"
import { useDropzone } from "react-dropzone"

import {useStyles, Copyright, navbar} from "./commonFunctions";

function Applications() {
    const classes = useStyles();
    const [NbrImg, setNbrImg] = useState(500);
    const [NbrObjet, setNbrObjet] = useState(3);
    const [NbrClasses, setNbrClasses] = useState(3);
    const [Description, setDescription] = useState('');

    const [applicationName, setName] = useState('Veuillez choisir une application à gauche');
    const [apps, setApps] = useState('');
    const [files, setFiles] = useState([])

    const [cookies, setCookie] = useCookies(['userId', 'isLogged', 'isAdmin']);

    /*console.log(cookies.userId);
    console.log(cookies.isLogged);
    console.log(cookies.isAdmin);*/

    if(cookies.isLogged === 'false'){
        setCookie('userId', undefined);
        setCookie('isLogged', 'false');
        setCookie('isAdmin', 'false');
        window.location.href='/';
    }

    let search = window.location.search;
    let params = new URLSearchParams(search);

    if(apps === '') {
        let htmlOutput = [];
        ApplicationService.getAll()
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const row = res.data[i];
                    console.log(row);
                    htmlOutput.push('<li> <a href="?id='+ row.application_id +'">' + row.application_name + '</a></li>');
                }
                setApps(htmlOutput.join('\n'));
                console.log(htmlOutput.join('\n'));
            })
            .catch(err => {
                console.log(err);
                setApps('<p>Problème avec la base de données</p>');
            })
    }

    if(params.get('id')){
        ApplicationService.getDescrById(params.get('id'))
            .then(res => {
                console.log(res);
                setName(res.data.application_name);
                setDescription(res.data.description);
            })
            .catch(err => {
                console.log(err);
            })
    }

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

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        },
      })


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

            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Container maxWidth="sm" style={{ 'borderRight': '1px solid grey', height: '80vh' }}>
                        <Container>
                            <h1> Applications </h1>
                            <Typography component="div">
                                <ul dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(apps)}}/>
                            </Typography>
                        </Container>
                        <br />
                        <br />
              


                    </Container>
                </Grid>
                <Grid item xs={9} >
                    <Container  >
                        <br />
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '20vh' }} >
                            <h1>{applicationName}</h1>
                            {Description}
                        </Typography>
                    </Container>

                    <Container  >
                        <br />
                        <Typography component="div" style={{ backgroundColor: '#CACFD2 ', height: '13vh' }} >
                        <h1> Zone de drop</h1>
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drop le fichier des images d'objet</p>
                        </div>

                        </Typography>
                        <br />
                        <br/>
                        <form  noValidate autoComplete="off">
                          <div>
                            <TextField
                            id="Nombre d'images"
                            label="Nombre d'images"
                            helperText="Nombre d'images annotées générées"
                            type="number"
                            value={NbrImg}
                            onChange={e => setNbrImg(e.target.value)}
                            variant="outlined" />


                            <TextField
                              id="Nombre d'objets"
                              label="Nombre d'objets"
                              type="number"
                              helperText="Nombre d'objets maximum sur chaque image annotée"
                              value={NbrObjet}
                              onChange={e => setNbrObjet(e.target.value)}
                              variant="outlined"
                            />

                            <TextField
                              id="Nombre de classe"
                              label="Nombre de classe"
                              type="number"
                              helperText="Nombre de classe du dossier d'objet"
                              onChange={e => setNbrObjet(e.target.value)}
                              variant="outlined"
                            />

                            <TextField
                             id="description"
                              label="Description"
                              type="text"
                              helperText="Description de l'annotation sur base des classes d'objet"
                              value={Description}
                              onChange={e => setDescription(e.target.value)}
                              variant="outlined" 

                            />


                          </div>
                        </form>
                    </Container>

                    <br />
                    <br />
                        <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
                            <Button onClick={() =>{
                                AnnotationService.runAnnotation(NbrImg, NbrObjet)
                                .then(res => {
                                console.log(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            }
                            }>Annoter</Button>
                        </ButtonGroup>
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
