import http from "../http-common";

class AnnotationService {

    add(){
        return http.post('/applications/add',);
    }

    runAnnotation(nbrImgGen, nbrMaxObj, nbrClasses, descr, userId, applicationId, bddId){
        return http.post('/annotations/runAnnotation',{
            nbrImgGen: nbrImgGen,
            nbrMaxObj: nbrMaxObj,
            nbrClasses: nbrClasses,
            description : descr,
            bddId: parseInt(bddId),
            application_id: parseInt(applicationId),
            user_id: parseInt(userId)
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

    getAllBdd(){
        return http.get('/database/getAll');
    }
}

export default new AnnotationService();
