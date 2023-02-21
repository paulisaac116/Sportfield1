import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HeaderAdmin from '../components/AdminPage/HeaderAdmin';

test( 'Display the sing out button', () => {

    render(
        <MemoryRouter>
            <HeaderAdmin setAdminSession={function setAdminSession() { }} />
        </MemoryRouter>
    );

    expect( screen.getByText( 'Salir' ) ).toBeInTheDocument();
} );