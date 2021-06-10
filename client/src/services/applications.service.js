import http from "../http-common";

class ApplicationService {
    getAll(){
        return http.get('applications/getAll');
    }

    getDescrById(applicationId){
        console.log(applicationId);
        return http.post('applications/getDescrById',{
            applicationId: parseInt(applicationId)
        });
    }

    add(name, descr, requirements){
        return http.post('applications/add',{
            name: name,
            descr: descr,
            requirements: requirements
        });
    }
}

export default new ApplicationService();
