import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { LoginPage } from '../pages/LoginPage';

describe( 'Login Test', () => {

    test( 'Display a warning when the user does not enter their email', () => {

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        userEvent.click( screen.getByRole( 'button', { name: /Aceptar/i } ) );
        expect( screen.getByText( 'Usuario no registrado' ) ).toBeInTheDocument();

    } );
} );