import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';

import { GreenButton } from '../../Buttons/GreenButton';
import { PurpleButton } from '../../Buttons/PurpleButton';
import { Message } from '../../Message';

import '../../../styles/AdminPage/AdminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DesktopDatePicker, DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import 'moment/locale/es';

export const ModalEditCourse = ( { isModalVisible, setIsModalVisible, course, setArrayMessage } ) => {

    const [formErrors, setFormErrors] = useState( {} );
    const [formValues, setFormValues] = useState( {} );

    const [dateStart, setDateStart] = useState( '' );
    const [dateEnd, setDateEnd] = useState( '' );

    const [timeStart, setTimeStart] = useState( '' );
    const [timeEnd, setTimeEnd] = useState( '' );


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

    const hiddeModal = () => {
        setFormErrors( {} );
        setFormValues( course );
        setIsModalVisible( false );
    };

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFormValues( { ...formValues, [name]: value } );
        setFormErrors( { ...formErrors, [name]: '' } );
    };



    const handleEditCourse = async () => {

        let errorsObj = validate( formValues, dateStart, dateEnd, timeStart, timeEnd );


        if ( Object.keys( errorsObj ).length === 0 ) {


            const { id, title, description, price } = formValues;

            try {

                await db.collection( 'Courses' ).doc( id ).update( {
                    title: title,
                    description: description,
                    price: price,
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

                    }


                } );

                setFormValues( {} );
                setFormErrors( {} );
                setDateStart( '' );
                setDateEnd( '' );
                setTimeStart( moment().format( 'LT' ) );
                setTimeEnd( moment().format( 'LT' ) );
                setIsModalVisible( false );
                setArrayMessage( ( prevState ) => (
                    [
                        ...prevState,
                        <Message
                            messageContent={'Curso actualizado'}
                        />
                    ]
                ) );


            } catch ( error ) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log( errorCode );
                console.log( errorMessage );
            }

        }

    };


    const validate = ( values, dateStart, dateEnd, timeStart, timeEnd ) => {

        const errors = {};

        const regexText = /^(?=.{5,50}$)[\w\s.:!¿?'"ÁÉÍÓÚáéíóúÜüñ-]+$/m;
        const regexPrice = /^\d{1,2}(\.\d{1,2})?$/m;

        if ( !values.title ) errors.title = 'Ingrese un título';
        else if ( !regexText.test( values.title ) ) errors.title = 'Ingrese texto entre 5 y 50 caracteres';

        if ( !values.dateStart ) errors.dateStart = 'Seleccione una fecha de inicio';
        if ( !values.dateEnd ) errors.dateEnd = 'Seleccione una fecha de finalización';
        if ( !values.timeStart ) errors.timeStart = 'Seleccione una hora de inicio';
        if ( !values.timeEnd ) errors.timeEnd = 'Seleccione una fecha de finalización';

        if ( !values.price ) errors.price = 'Ingese un valor';
        else if ( !regexPrice.test( values.price ) ) errors.price = 'Ingrese un precio con el formato $99:99';

        if ( !values.description ) errors.description = 'Ingrese una descripción';

        return errors;
    };

    useEffect( () => {
        setFormValues( course );
    }, [course] );


    useEffect( () => {

        setDateStart( moment().set(
            {
                'year': course.dateStart?.year,
                'month': course.dateStart?.month,
                'date': course.dateStart?.date
            } ) );
        setDateEnd( moment().set(
            {
                'year': course.dateEnd?.year,
                'month': course.dateEnd?.month,
                'date': course.dateEnd?.date
            } ) );
        setTimeStart( moment().set(
            {
                'hour': course.TimeStart?.hour,
                'minute': course.TimeStart?.minute
            } ) );
        setTimeEnd( moment().set(
            {
                'hour': course.TimeEnd?.hour,
                'minute': course.TimeEnd?.minute
            } ) );

        // console.log( 'dateStart: ', typeof dateStart.year() );


    }, [course] );

    useEffect( () => {

        // console.log( 'dateStart: ', typeof dateStart.year() ?? '' );
        // console.log( 'timeStart: ', typeof timeStart.hour() ?? '' );

        console.log( typeof moment().year() );


    }, [dateStart, timeStart] );


    return (
        <div className={`modal animate__animated ${isModalVisible ? 'flex animate__fadeIn' : 'hidden'}`}>
            <div className='modal__content  modal__addCourse'>
                <h1 className='modal__content--title'>Editar curso</h1>
                <div className="register__form form">
                    <div className="register__form--row">
                        <div className='register__form--column input__error--group'>
                            <label htmlFor="title">Título del curso</label>
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
                            <div>
                                <label htmlFor="dateStart">Fecha inicio</label>
                                <ThemeProvider theme={darkTheme}>
                                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='es'>
                                        <DesktopDatePicker
                                            inputFormat='DD/MM/YYYY'
                                            // value={dateStart}
                                            value={formValues.dateStart}
                                            onChange={handleChangeDateStart}
                                            // onChange={handleInputChange}
                                            renderInput={( params ) => <TextField {...params} />}
                                            className='inputDate'
                                            name='dateStart'
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </div>

                            <div>
                                <label htmlFor="dateEnd">Fecha fin</label>
                                <ThemeProvider theme={darkTheme}>
                                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='es'>
                                        <DesktopDatePicker
                                            inputFormat='DD/MM/YYYY'
                                            // value={dateEnd}
                                            value={formValues.dateEnd}
                                            onChange={handleChangeDateEnd}
                                            // onChange={handleInputChange}
                                            renderInput={( params ) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>
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
                        </div>
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
                                            renderInput={( params ) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </ThemeProvider>
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
                        </div>
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
                            <label htmlFor="lastName">Descripción</label>
                            <textarea
                                type="text"
                                className={`input text-area ${formErrors.description ? 'input__error' : ''} `}
                                name="description"
                                value={formValues.description}
                                placeholder="Lunes a viernes, en las mañanas"
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

                </div>

                <div className='modal__buttons'>
                    <GreenButton
                        button_name='Aceptar'
                        button_func={handleEditCourse}
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

ModalEditCourse.propTypes = {
    course: PropTypes.object,
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    setArrayMessage: PropTypes.func
};
