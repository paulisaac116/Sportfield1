import { render, screen, rerender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AdminPage } from "../pages/AdminPage";
import '@testing-library/jest-dom';
import { configure, shallow } from "enzyme";

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

describe( 'Users CRUD Test', () => {

    test( 'Users', () => {

        // configure( { adapter: new Adapter() } );

        render(
            <MemoryRouter>
                <AdminPage adminSession={true} />
            </MemoryRouter>
        );

        // rerender(
        //     <MemoryRouter>
        //     </MemoryRouter>
        // )
        // userAdmid.setState( { adminSession: true } );

        // render(
        //     <MemoryRouter>
        //         <AdminPage />
        //     </MemoryRouter>
        // );
        expect( screen.getByText( 'Moradores' ) ).toBeInTheDocument();
    } );
} );