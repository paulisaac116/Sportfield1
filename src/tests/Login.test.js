import { render, screen } from '@testing-library/react';
import { Router } from 'express';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
// import TestRenderer from 'react-test'


describe( 'Login Test', () => {

    test( 'Input password in Login Page', () => {
        render(
            // <FieldUser />
        );
        const input = screen.getByRole( 'textbox', { name: 'email', hidden: true } );
        expect( input ).toBeInTheDocument();
    } );


} );