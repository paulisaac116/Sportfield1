import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ModalDeleteTurn } from '../components/AdminPage/Turns/ModalDeleteTurn';

test( 'Display the turn information properly', () => {

    render(
        <MemoryRouter>
            <ModalDeleteTurn
                turn={{
                    name: 'Enner',
                    lastName: 'Valencia',
                    field: {
                        fieldType: 'f1',
                        fieldType: 'Fútbol',
                        location: 'Sector Medio'
                    },
                    id: '123456',
                    land: '90',
                    date: [
                        {
                            date: 9,
                            day: 'Domingo',
                            month: 0,
                            timeEnd: 18,
                            timeStart: 17,
                            year: 2023
                        }
                    ]
                }}
                isModalVisible={true} setIsModalVisible={function setModal() { }} setArrayMessage={function setArray() { }}
            />
        </MemoryRouter>
    );

    expect( screen.getByText( 'Enner Valencia' ) ).toBeInTheDocument();


} );