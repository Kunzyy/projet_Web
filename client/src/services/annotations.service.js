import http from "../http-common";

class AnnotationService {

    add(){
        return http.post('/applications/add',);
    }

    runAnnotation(nbrImgGen, nbrMaxObj){
        return http.post('/annotations/runAnnotation',{
            nbrImgGen: nbrImgGen,
            nbrMaxObj: nbrMaxObj
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
