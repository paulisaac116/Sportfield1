import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { User } from '../components/AdminPage/Users/User';

test( 'Displar the "Activar" button when the user state is disable (active = false)', () => {

    render(
        <MemoryRouter>
            <User
                user={{
                    active: false,
                    name: 'Antonio',
                    lastName: 'Correa',
                    land: '8',
                    email: 'antonio@correa.com',
                    cellphone: '0987654321',
                    id: '1234567'
                }}
                setUserData={function setUser() { }} setIsModalVisible={function setModal() { }} filter={[]}
            />
        </MemoryRouter>
    );
    expect( screen.getByRole( 'button', { name: 'Activar' } ) ).toBeInTheDocument();



} );