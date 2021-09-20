import React from 'react';
import { Menu, Button} from 'antd';
import {Link, useHistory} from "react-router-dom";


const MainMenu = () => {
    const history = useHistory();
    const handleLogout =  () => {
        history.push("/");

    };
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            className="main-menu"
        >
            <Menu.Item>
                <Link to="/login">Iniciar Sesion</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/register">Registrarse</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/acerca-de">Acerca de</Link>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={handleLogout}>Regresar</Button>
            </Menu.Item>
        </Menu>
    );
};

export default MainMenu;