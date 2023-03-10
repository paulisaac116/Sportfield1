import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import PropTypes from 'prop-types';

import { GreenButton } from '../../Buttons/GreenButton';
import { PurpleButton } from '../../Buttons/PurpleButton';
import { Message } from '../../Message';

import '../../../styles/AdminPage/AdminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { DesktopDatePicker, DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import moment from 'moment';
import 'moment/locale/es';

import { months } from '../../../data/CalendarMonths';

export const ModalAddCourse = ( { isModalVisible, setIsModalVisible, setArrayMessage } ) => {

    const initialValues = { title: '', dateStart: '', dateEnd: '', timeStart: '', timeEnd: '', price: '', description: '' };

    const [formValues, setFormValues] = useState( initialValues );
    const [formErrors, setFormErrors] = useState( {} );

    const [dateStart, setDateStart] = useState( '' );
    const [dateEnd, setDateEnd] = useState( '' );

    const [timeStart, setTimeStart] = useState( '' );
    const [timeEnd, setTimeEnd] = useState( '' );

    const hiddeModal = () => {
        // setFormValues( initialValues );
        setFormErrors( {} );
        setIsModalVisible( false );
    };

    const darkTheme = createTheme( {
        palette: {
            mode: 'dark',
        },
    } );


    const handleChangeDateStart = ( newValue ) => {
        setDateStart( newValue );
        setFormValues( { ...formValues, dateStart: newValue } );
    };

    const handleChangeDateEnd = ( newValue ) => {
        setDateEnd( newValue );
        setFormValues( { ...formValues, dateEnd: newValue } );

    };

    const handleChangeTimeStart = ( newValue ) => {
        setTimeStart( newValue );
        setFormValues( { ...formValues, timeStart: newValue } );

    };

    const handleChangeTimeEnd = ( newValue ) => {
        setTimeEnd( newValue );
        setFormValues( { ...formValues, timeEnd: newValue } );

    };


    const handleInputChange = ( { target } ) => {
        const { name, value } = target;
        setFormValues( { ...formValues, [name]: value } );
        setFormErrors( { ...formErrors, [name]: '' } );
    };

    const handleAddCourse = async () => {


        let errorsObj = validate( formValues, dateStart, dateEnd, timeStart, timeEnd );

        if ( Object.keys( errorsObj ).length === 0 ) {

            const { title, price, description } = formValues;
            try {

                const course = db.collection( 'Courses' ).doc();

                await course.set( {
                    active: true,
                    id: course.id,
                    title,
                    dateStart: {
                        day: dateStart.date(),
                        month: dateStart.month(),
                        year: dateStart.year()
                    },
                    dateEnd: {
                        day: dateEnd.date(),
                        month: dateEnd.month(),
                        year: dateEnd.year()

                    },
                    timeStart: {
                        hour: timeStart.hour(),
                        minute: timeStart.minute()

                    },
                    timeEnd: {
                        hour: timeEnd.hour(),
                        minute: timeEnd.minute()

                    },
                    price,
                    description,
                    registered: []
                } );

                setFormErrors( {} );
                setFormValues( initialValues );
                setDateStart( '' );
                setDateEnd( '' );
                setTimeStart( moment().format( 'LT' ) );
                setTimeEnd( moment().format( 'LT' ) );
                setIsModalVisible( false );
                setArrayMessage( ( prevState ) => (
                    [
                        ...prevState,
                        <Message
                            messageContent={'Curso registrado'}
                        />
                    ]
                ) );

            } catch ( error ) {
                const errorCode = error.code;
                const errorMesage = error.message;
                // console.log( 'contact with the provider' );
                console.log( 'errorCode: ', errorCode );
                console.log( 'errorMesagge: ', errorMesage );

            }

        } else setFormErrors( errorsObj );

    };

    const validate = ( values, dateStart, dateEnd, timeStart, timeEnd ) => {

        const errors = {};

        const regexText = /^(?=.{5,50}$)[\w\s.:!???'"??????????????????????????-]+$/m;
        const regexPrice = /^\d{1,2}(\.\d{1,2})?$/m;

        if ( !values.title ) errors.title = 'Ingrese un t??tulo';
        else if ( !regexText.test( values.title ) ) errors.title = 'Ingrese texto entre 5 y 50 caracteres';

        if ( !values.dateStart ) errors.dateStart = 'Seleccione una fecha de inicio';
        if ( !values.dateEnd ) errors.dateEnd = 'Seleccione una fecha de finalizaci??n';
        if ( !values.timeStart ) errors.timeStart = 'Seleccione una hora de inicio';
        if ( !values.timeEnd ) errors.timeEnd = 'Seleccione una fecha de finalizaci??n';

        if ( !values.price ) errors.price = 'Ingese un valor';
        else if ( !regexPrice.test( values.price ) ) errors.price = 'Ingrese un precio con el formato $99:99';

        if ( !values.description ) errors.description = 'Ingrese una descripci??n';

        return errors;
    };

    useEffect( () => {
        setFormValues( initialValues );
    }, [isModalVisible] );

    useEffect( () => {

        // console.log( 'date start: ', dateStart.getYear() );
        if ( typeof timeStart !== 'string' ) console.log( timeStart.hour() );
    }, [timeStart] );


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content  modal__addCourse'>
                <h1 className='modal__content--title'>Agregar nuevo curso</h1>
                <form className="register__form form">
                    <div className="register__form--row">
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="title">T??tulo del curso</label>
                            <input
                                type="text"
                                className={`input ${formErrors.title ? 'input__error' : ''}`}
                                name="title"
                                value={formValues.title}
                                placeholder="Volley"
                                onChange={handleInputChange}
                            />
                            {formErrors.title
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.title}</p>
                                </div>
                                : <></>
                            }
                        </div>
                        <div className='register__form--column date-column input__error--group'>
                            <div className='date-colum__label-input'>
                                <label htmlFor="dateStart">Fecha inicio</label>
                                <ThemeProvider theme={darkTheme}>
                                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='es'>
                                        <DesktopDatePicker
                                            inputFormat='DD/MM/YYYY'
                                            value={formValues.dateStart}
                                            onChange={handleChangeDateStart}
                                            renderInput={( params ) => <TextField {...params} />}
                                            className='inputDate'
                                            name='dateStart'
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>

                            </div>
                            <div className='date-colum__label-input'>
                                <label htmlFor="dateEnd">Fecha fin</label>
                                <ThemeProvider theme={darkTheme}>
                                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='es'>
                                        <DesktopDatePicker
                                            inputFormat='DD/MM/YYYY'
                                            value={formValues.dateEnd}
                                            onChange={handleChangeDateEnd}
                                            renderInput={( params ) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>

                            </div>
                        </div>
                        {formErrors.dateStart
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.dateStart}</p>
                            </div>
                            : <></>
                        }
                        {formErrors.dateEnd
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.dateEnd}</p>
                            </div>
                            : <></>
                        }
                        <div className='register__form--column time-column input__error--group'>
                            <div>
                                <label htmlFor="timeStart">Hora inicio</label>
                                <ThemeProvider theme={darkTheme}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopTimePicker
                                            inputFormat='hh:mm A'
                                            value={formValues.timeStart}
                                            onChange={handleChangeTimeStart}
                                            renderInput={( params ) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </div>
                            <div>
                                <label htmlFor="timeEnd">Hora fin</label>
                                <ThemeProvider theme={darkTheme}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopTimePicker
                                            inputFormat='hh:mm A'
                                            value={formValues.timeEnd}
                                            onChange={handleChangeTimeEnd}
                                            // onChange={handleInputChange}
                                            renderInput={( params ) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </div>
                        </div>
                        {formErrors.timeStart
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.timeStart}</p>
                            </div>
                            : <></>
                        }
                        {formErrors.timeEnd
                            ? <div className='form__errors'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                <p className='form__errors--text'>{formErrors.timeEnd}</p>
                            </div>
                            : <></>
                        }
                        <div className="register__form--column input__error--group">
                            <label htmlFor="lastName">Costo</label>
                            <input
                                type="number"
                                className={`input ${formErrors.price ? 'input__error' : ''} `}
                                name="price"
                                value={formValues.price}
                                placeholder="99.99"
                                onChange={handleInputChange}
                            />
                            {formErrors.price
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.price}</p>
                                </div>
                                : <></>
                            }
                        </div>
                        <div className="register__form--column input__error--group">
                            <label htmlFor="lastName">Descripci??n</label>
                            <textarea
                                type="text"
                                className={`input text-area ${formErrors.description ? 'input__error' : ''} `}
                                name="description"
                                value={formValues.description}
                                placeholder="Lunes a viernes, en las ma??anas"
                                onChange={handleInputChange}
                            />
                            {formErrors.description
                                ? <div className='form__errors'>
                                    <FontAwesomeIcon icon={faExclamationCircle} className='form__errors--icon' />
                                    <p className='form__errors--text'>{formErrors.description}</p>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>

                </form>
                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Aceptar'
                        button_func={handleAddCourse}
                    />
                    <PurpleButton
                        button_name='Cancelar'
                        button_func={hiddeModal}
                    />

                </div>
            </div>

        </div>
    );
};

ModalAddCourse.propTypes = {
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setArrayMessage: PropTypes.func
};

