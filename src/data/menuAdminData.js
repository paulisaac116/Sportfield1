import { faUser, faVolleyballBall, faLightbulb, faComment, faBell } from '@fortawesome/free-solid-svg-icons';

export const menuAdminData = [

    {
        id: "user",
        name: "Users",
        text: "Usuarios",
        icon: faUser,
        active: true
    },
    {
        id: "turn",
        name: "Turns",
        text: "Turnos",
        icon: faVolleyballBall,
        active: false
    },
    {
        id: "course",
        name: "Courses",
        text: "Cursos",
        icon: faLightbulb,
        active: false
    },
    {
        id: "comment",
        name: "Comments",
        text: "Comentarios",
        icon: faComment,
        active: false
    },
    {
        id: "notification",
        name: "Notifications",
        text: "Notificaciones",
        icon: faBell,
        active: false,
    }

];