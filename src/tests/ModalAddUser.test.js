import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ModalAddUser } from "../components/AdminPage/Users/ModalAddUser";
import userEvent from '@testing-library/user-event';

test( 'Display a warning when the user does not enter their password', () => {


    render(
        <MemoryRouter>
            <ModalAddUser isModalAddUserVisible={true} setIsModalAddUserVisible={function setModal() { }} setArrayMessage={function setArray() { }} />
        </MemoryRouter>

    );
    userEvent.click( screen.getByRole( 'button', { name: /Aceptar/i } ) );
    expect( screen.getByText( 'Ingrese su contraseña' ) ).toBeInTheDocument();
} );