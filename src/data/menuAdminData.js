import { faUser, faLightbulb, faComment, faBell, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

export const menuAdminData = [

    {
        id: "user",
        name: "Users",
        text: "Moradores",
        description: "Este módulo te permite visualizar los moradores registrados",
        icon: faUser,
        active: true
    },
    {
        id: "turn",
        name: "Turns",
        text: "Turnos",
        description: "Este módulo te permite visualizar los turnos agendados",
        icon: faTicketAlt,
        active: false
    },
    {
        id: "course",
        name: "Courses",
        text: "Cursos",
        description: "Este módulo te permite visualizar los moradores registrados en un curso",
        icon: faLightbulb,
        active: false
    },
    {
        id: "comment",
        name: "Comments",
        text: "Comentarios",
        description: "Este módulo te permite visualizar los comentarios enviados por lo moradores",
        icon: faComment,
        active: false
    },
    {
        id: "notification",
        name: "Notifications",
        text: "Notificaciones",
        description: "Este módulo te permite enviar notificaciones a los moradores",
        icon: faBell,
        active: false,
    }

];