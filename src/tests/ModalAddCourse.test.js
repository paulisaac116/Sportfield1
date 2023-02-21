import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import { ModalAddCourse } from '../components/AdminPage/Courses/ModalAddCourse';

test( 'Show a warning when the user does not enter a course title', () => {

    render(
        <MemoryRouter>
            <ModalAddCourse isModalVisible={true} setIsModalVisible={function setModal() { }} setArrayMessage={function setArray() { }} />
        </MemoryRouter>
    );

    userEvent.click( screen.getByRole( 'button', { name: /Aceptar/i } ) );
    expect( screen.getByText( 'Ingrese un título' ) ).toBeInTheDocument();


} );