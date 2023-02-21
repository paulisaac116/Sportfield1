import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { ModalAddTurn } from '../components/AdminPage/Turns/ModalAddTurn';
import firebase from 'firebase';
import { act } from '@testing-library/react';
import { container } from 'webpack';
import { useFetchFirestore } from '../hooks/useFetchFirestore';
import { db } from '../firebase';

test( 'Display the "Continuar" button properly', async () => {

    render(
        <MemoryRouter>
            <ModalAddTurn isModalVisible={false} setIsModalVisible={function setModal() { }} setArrayMessage={function setArray() { }} />
        </MemoryRouter>
    );

    expect( screen.getByText( 'Continuar' ) ).toBeInTheDocument();

} );