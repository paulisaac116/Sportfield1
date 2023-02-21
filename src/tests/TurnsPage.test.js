import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import { TurnsPage } from '../pages/TurnsPage';

test( 'Display a warning when the user does not select a field first', () => {

    render(
        <MemoryRouter>
            <TurnsPage />
        </MemoryRouter>
    );

    userEvent.click( screen.getByRole( 'button', { name: /Agendar turno/i } ) );
    expect( screen.getByText( 'Seleccione una cancha' ) ).toBeInTheDocument();

} );