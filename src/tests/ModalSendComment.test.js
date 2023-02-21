import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import { ModalSendComment } from '../components/ProfilePage/ModalSendComment';

test( 'Display a warning when the user does not enter a comment title', () => {

    render(
        <MemoryRouter>
            <ModalSendComment isModalVisible={true} setIsModalVisible={function setModal() { }} setArrayMessage={function setArray() { }} courses={[]} userData={{}} />
        </MemoryRouter>
    );

    userEvent.click( screen.getByRole( 'button', { name: /Enviar/i } ) );
    expect( screen.getByText( 'Ingrese un título' ) ).toBeInTheDocument();
} );