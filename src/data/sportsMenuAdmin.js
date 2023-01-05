import { faFutbol, faBasketballBall, faTableTennis, faVolleyballBall } from '@fortawesome/free-solid-svg-icons';

export const sportsMenuAdmin = [

    {
        id: "soccer",
        name: "Soccer",
        color: "green-dark",
        text: "Fútbol",
        icon: faFutbol,
        active: true
    },
    {
        id: "basketball",
        name: "basketball",
        color: "yellow",
        text: "Básquet",
        icon: faBasketballBall,
        active: false
    },
    {
        id: "volleyball",
        name: "Volleyball",
        color: "purple-light",
        text: "Voleibol",
        icon: faVolleyballBall,
        active: false
    },
    {
        id: "tennis",
        name: "Tennis",
        color: "red",
        text: "Tenis",
        icon: faTableTennis,
        active: false
    }
];