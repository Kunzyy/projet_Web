import http from "../http-common";

class ApplicationService {
    getAll(){
        return http.get('applications/getAll');
    }

    getDescrById(applicationId){
        console.log(applicationId);
        return http.post('applications/getDescrById',{
            applicationId: applicationId
        });
    }

    add(){
        return http.post('applications/add');
    }
}

export default new ApplicationService();
