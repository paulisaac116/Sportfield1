import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ModalDeleteCourse } from '../components/AdminPage/Courses/ModalDeleteCourse';

test( 'Show the properly course data', () => {

    render(
        <MemoryRouter>
            <ModalDeleteCourse course={{ title: 'Introducción a React Testing' }} isModalVisible={true} setIsModalVisible={function setModal() { }} setArrayMessage={function serArray() { }} />
        </MemoryRouter>
    );

    expect( screen.getByText( 'Introducción a React Testing' ) ).toBeInTheDocument();


} );