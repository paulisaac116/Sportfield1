import React, {useEffect, useState} from 'react';
import { validateForm } from '../helpers/validateForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const RegisterForm = ({setFormData}) => {

    const initialValues = { name: '', lastName: '', land: '', email: "", password: "" };
    const [formValues, setFormValues] = useState( initialValues );
    const [formErrors, setFormErrors] = useState( {} );


    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, [name]: value } );
    };

    
    useEffect ( () => {
        
        validateForm(setFormData);

    }, [setFormData])


    return (
        <form className="register__form form" onSubmit={validateForm}>
            <div className="register__form--row">
                <div className='register__form--column input__error--group'>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className={`input ${formErrors.name ? 'input__error' : ''}`}
                        id="name"
                        name="name"
                        value={formValues.name}
                        placeholder="Paul"
                        onChange={handleInputChange}
                    />
                    {formErrors.name
                        ? <div className='form__errors'>
                            <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                            <p className='form__errors--text'>{formErrors.name}</p>
                        </div>
                        : <></>
                    }
                </div>
                <div className="register__form--column input__error--group">
                    <label htmlFor="lastName">Apellido</label>
                    <input
                        type="text"
                        className={`input ${formErrors.lastName ? 'input__error' : ''}`}
                        id="lastName"
                        name="lastName"
                        value={formValues.lastName}
                        placeholder="Guala"
                        onChange={handleInputChange}
                    />
                    {formErrors.lastName
                        ? <div className='form__errors'>
                            <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                            <p className='form__errors--text'>{formErrors.lastName}</p>
                        </div>
                        : <></>
                    }
                </div>
            </div>

            <div className="register__form--row input__error--group">
                <label htmlFor="land">Número de lote</label>
                <input
                    type="number"
                    className={`input ${formErrors.land ? 'input__error' : ''}`}
                    id="land"
                    name="land"
                    value={formValues.land}
                    placeholder='100'
                    onChange={handleInputChange}
                />
                {formErrors.land
                    ? <div className='form__errors'>
                        <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                        <p className='form__errors--text'>{formErrors.land}</p>
                    </div>
                    : <></>
                }
            </div>

            <div className="register__form--row input__error--group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    className={`input ${formErrors.email ? 'input__error' : ''}`}
                    id="email"
                    name="email"
                    value={formValues.email}
                    placeholder='paulguala@gmail.com'
                    onChange={handleInputChange}
                />
                {formErrors.email
                    ? <div className='form__errors'>
                        <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                        <p className='form__errors--text'>{formErrors.email}</p>
                    </div>
                    : <></>
                }
            </div>

            <div className="register__form--row input__error--group">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    className={`input ${formErrors.password ? 'input__error' : ''}`}
                    id="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                />
                {formErrors.password
                    ? <div className='form__errors'>
                        <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                        <p className='form__errors--text'>{formErrors.password}</p>
                    </div>
                    : <></>
                }
            </div>

        </form>
    );
};
