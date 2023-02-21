import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { CoursesTable } from '../components/AdminPage/Courses/CoursesTable';

test( 'Display the "Editar" button when the course is active (active = true)', () => {

    render(
        <MemoryRouter>
            <CoursesTable
                tableData={[{
                    active: true,
                    id: '1234567',
                    title: 'Introducción a la filosofía',
                    description: 'Todos los días',
                    registered: []
                }]}
                currentPage={0} setCourseData={function setCourses() { }} setIsModalEditVisible={function setModal() { }} setIsModalDeleteVisible={function setModal() { }} setDataSize={function setData() { }} activeCourses={true}
            />
        </MemoryRouter>
    );
    expect( screen.getByRole( 'button', { name: 'Editar' } ) ).toBeInTheDocument();

} )

