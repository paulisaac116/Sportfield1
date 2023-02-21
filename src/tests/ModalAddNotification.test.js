import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import { ModalAddNotification } from '../components/AdminPage/Notifications/ModalAddNotification';

test( 'Show a warning when the admin does not enter a notification title', () => {

    render(
        <MemoryRouter>
            <ModalAddNotification isModalVisible={true} setIsModalVisible={function setModal() { }} setArrayMessage={function setArray() { }} />
        </MemoryRouter>
    );

    userEvent.click( screen.getByRole( 'button', { name: /Enviar/i } ) );
    expect( screen.getByText( 'Ingrese un título' ) ).toBeInTheDocument();

} );