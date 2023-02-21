/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnzymeAdapter, shallow, configure } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { RegisterPage } from '../pages/RegisterPage';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


test( 'Display a warning when the user does not enter their email', () => {

    render(
        <MemoryRouter>
            <RegisterPage />
        </MemoryRouter>
    );

    // EnzymeAdapter

    // configure( { adapter: new Adapter() } );


    // const wrapper = shallow(
    //     <RegisterPage />
    // );

    // const data = [{ email: 'paul@paul.com' }];

    // userEvent.type( wrapper.find( 'input[name="register-btn"]' ).at( 0 ), 'paul@paul.com' );
    // userEvent.click( wrapper.find( 'button' ).at[0] );

    // userEvent.type( screen.getByRole( 'textbox', { name: 'Correo electrónico' } ), 'paul@paul.com' );
    userEvent.click( screen.getByRole( 'button', { name: /Registrarse/i } ) );

    // expect( data ).toBeDefined();

    // await waitFor(
    //     () => expect( screen.getByText( 'El email ya está registrado' ) ).toBeInTheDocument()
    // );

    expect( screen.getByText( 'Ingrese su correo electrónico' ) ).toBeInTheDocument();
} );
