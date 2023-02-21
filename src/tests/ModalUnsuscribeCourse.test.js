import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ModalUnsubscribeCourse } from '../components/ProfilePage/ModalUnsubscribeCourse';

test( 'Show the correct course information in the modal', () => {

    render(
        <MemoryRouter>
            <ModalUnsubscribeCourse
                course={{ title: 'Introducción a Jest' }}
                isModalVisible={true}
                setIsModalVisible={function setModal() { }}
                userData={{}} />
        </MemoryRouter>
    );

    expect( screen.getByText( 'Introducción a Jest' ) ).toBeInTheDocument();



} );