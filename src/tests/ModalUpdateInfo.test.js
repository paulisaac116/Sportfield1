import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import { ModalUpdateInfo } from '../components/ProfilePage/ModalUpdateInfo';


test( 'Display a warning when the user enter text into the cellphone input', () => {

    render(
        <MemoryRouter>
            <ModalUpdateInfo userData={{}} isModalVisible={true} setIsModalVisible={function setModal() { }} setArrayMessage={function setArray() { }} />
        </MemoryRouter>
    );

    userEvent.type( screen.getByPlaceholderText( '0987654321' ), 'Texto' );
    userEvent.click( screen.getByRole( 'button', { name: /Aceptar/i } ) );
    expect( screen.getByText( 'Ingrese un número de celular válido' ) ).toBeInTheDocument();

} );