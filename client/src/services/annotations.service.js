import http from "../http-common";

class AnnotationService {

    add(){
        return http.post('/applications/add',);
    }

    runAnnotation(nbrImgGen, nbrMaxObj, descr){
        return http.post('/annotations/runAnnotation',{
            nbrImgGen: nbrImgGen,
            nbrMaxObj: nbrMaxObj,
            description : descr,
            bdd_name: 'bdd test',
            bdd_id: 2,
            bdd_size: 0,
            'nb_classes':0,
            'application_id':1,
            'user_id':1,
            'creation_path': 'path',
            'creation_date': '04/06/21'
        });
    }

    getAllAnnotations(){
        return http.get('/annotations/getAll')
    }

    deleteAnnotation(annotId){
        return http.post('/annotations/delete',{
            annotId: annotId
        })
    }
}

export default new AnnotationService();
