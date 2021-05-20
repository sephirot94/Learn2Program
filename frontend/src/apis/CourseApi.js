import {Learn2Program} from '../apis/clients'

const GetAllCourses = () => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    return Learn2Program.get('/courses', config);
};

const GetUserCourses = (username) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    return Learn2Program.get(`/courses/${username}`, config);
};

const RegisterUserCourses = (values) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };
    const body = {
        "user": values.user,
        "course": values.course
    };
    return Learn2Program.post('/courses/register_user', body, config);
};

const AddCourse = (course) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    const body = {
        "name": course.name,
        "description": course.description,
        "level": course.level,
        "owner": localStorage.username

    };
    return Learn2Program.post('/courses/add', body, config);
};

const ModifyCourse = (course) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    const body = {
        "id": course.id,
        "name": course.name,
        "description": course.description,
        "level": course.level,
        "owner": localStorage.username

    };
    return Learn2Program.post('/courses/modify', body, config);
};

const DeleteCourse = (id) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    const body = {
        "id": id

    };
    return Learn2Program.post('/courses/delete', body, config);
};

const CourseApi = { 
    GetAllCourses,
    GetUserCourses,
    RegisterUserCourses,
    AddCourse,
    ModifyCourse,
    DeleteCourse
};

export default CourseApi;