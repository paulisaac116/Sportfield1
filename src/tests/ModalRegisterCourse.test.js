import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import { ModalRegisterCourse } from '../components/ProfilePage/ModalRegisterCourse';

test( 'Display a warning when the user does not select a course first', () => {

    render(
        <MemoryRouter>
            <ModalRegisterCourse isModalVisible={true} setIsModalVisible={function setModal() { }} setArrayMessage={function setArray() { }} courses={[]} userData={{}} />
        </MemoryRouter>
    );

    userEvent.click( screen.getByRole( 'button', { name: /Registrarse/i } ) );
    expect( screen.getByText( 'Seleccione un curso' ) ).toBeInTheDocument();

} );