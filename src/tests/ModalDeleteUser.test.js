import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { ModalAddUser } from "../components/AdminPage/Users/ModalAddUser";
import { ModalDeleteUser } from '../components/AdminPage/Users/ModalDeleteUser';
import { Message } from '../components/Message';

test( 'Display the data of the user to delete', () => {

    render(
        <MemoryRouter>
            <ModalDeleteUser
                user={{ name: 'Juan', lastName: 'Perez', email: 'juan@perez.com', land: 125 }} isModalVisible={true} setIsModalVisible={function setModal() { }} setArrayMessage={function setArray() { }} />
        </MemoryRouter>
    );

    expect( screen.getByText( '125' ) ).toBeInTheDocument();
} );