import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import { ModalNotificationsUser } from '../components/ProfilePage/ModalNotificationsUser';

test( 'Show notifications panel', () => {

    render(
        <MemoryRouter>
            <ModalNotificationsUser isModalVisible={true} setIsModalVisible={function setModal() { }} setNumber={function serNumber() { }} number={7} setNotificationNumber={function setNotifications() { }} />
        </MemoryRouter>
    );

    expect( screen.getByText( 'Notificaciones' ) ).toBeInTheDocument();

} );