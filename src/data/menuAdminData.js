import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVolleyballBall, faLightbulb, faComment, faBell } from '@fortawesome/free-solid-svg-icons';

export const menuAdminData = {

    1 : {
        id: "user",
        name: "Users",
        text: "Usuarios",
        icon: faUser,
        active: true
    },
    2 : {
        id: "turn",
        name: "Turns",
        text: "Turnos",
        icon: faVolleyballBall,
        active: false
    },
    3 : {
        id: "course",
        name: "Courses",
        text: "Cursos",
        icon: faLightbulb,
        active: false
    },
    4 : {
        id: "comment",
        name: "Comments",
        text: "Comentarios",
        icon: faComment,
        active: false
    },
    5 : {
        id: "notification",
        name: "Notifications",
        text: "Notificaciones",
        icon: faBell,
        active: false,
    }

}