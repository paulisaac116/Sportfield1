import React from 'react';
import PropTypes from 'prop-types';

import { hours } from '../../../data/CalendarHours';
import { months } from '../../../data/CalendarMonths';
import { RedButton } from '../../Buttons/RedButton';

export const TurnsTable = ( { tursData, setTurnData, setIsModalVisible } ) => {

    const handleDeleteTurn = ( turn ) => {
        setTurnData( turn );
        setIsModalVisible( true );

    };

    return (
        <div className='Turns animate__animated animate__fadeIn'>
            <div className='table-turns__head'>
                <p>Usuario</p>
                <p>Cancha</p>
                <p>Fecha</p>
                <p>Hora</p>
                <p>Agendado</p>
            </div>
            <div className='table-turns__body'>
                {
                    tursData?.map( ( turn, key ) => (
                        <div className='table-turns__body--row' key={key}>
                            <div className='body-row__data'>
                                <p className='body-row__data-name'>{`${turn.name} ${turn.lastName}`}</p>
                                <p className='body-row__data-field--row'>{`${turn.field?.fieldType} ${turn.field?.fieldId} - ${turn.field?.location}`}</p>
                                <div className='body-row__data-field--col hidden'>
                                    <p>{`${turn.field?.fieldType} ${turn.field?.fieldId}`}</p>
                                    <p>{`${turn.field?.location}`}</p>
                                </div>
                                {
                                    Array.isArray( turn.date )
                                        ? turn.date.length === 1 || turn.date[0]?.date !== turn.date[1]?.date
                                            ? <>
                                                <div className='body-row__data--date-list'>
                                                    {
                                                        turn.date.map( ( date, key ) => (
                                                            <>
                                                                <p className={`date-list${turn.date.length === 2 ? key + 1 : ''}`}>{`${date.day} ${date.date} de ${months[date.month]} de ${date.year}`}</p>
                                                                <p>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</p>
                                                            </>
                                                        ) )
                                                    }
                                                </div>
                                                <div className='body-row__data--date-row hidden'>
                                                    {
                                                        turn.date.map( ( date, key ) => (
                                                            <p key={key}>{`${date.day} ${date.date} de ${months[date.month]} de ${date.year}`}</p>

                                                        ) )
                                                    }
                                                </div>
                                                <div className={`body-row__data--hour-row hidden ${turn.date.length === 2 ? 'min-h-6rem' : 'g'}`}>
                                                    {
                                                        turn.date.map( ( date, key ) => (
                                                            <p key={key}>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</p>

                                                        ) )
                                                    }

                                                </div>
                                            </>
                                            : <>
                                                <p className='date-list'>{`${turn.date[0].day} ${turn.date[0].date} de ${months[turn.date[0].month]} de ${turn.date[0].year}`}</p>
                                                <div className='body-row__data--hour-row'>
                                                    {
                                                        turn.date.map( ( date, key ) => (
                                                            <p key={key}>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</p>

                                                        ) )
                                                    }

                                                </div></>
                                        : <p className='text-white'>ups</p>
                                }

                                <p className='body-row__data-saved'>{`${turn.savedIn?.day} de ${months[turn.savedIn?.month]} de ${turn.savedIn?.year} - ${turn.savedIn?.hour}:${turn.savedIn?.minute}`}</p>
                            </div>
                            <div className='body-row__buttons'>
                                <RedButton
                                    button_name={'Eliminar'}
                                    button_func={() => handleDeleteTurn( turn )}
                                />
                            </div>
                        </div>
                    ) )

                }

            </div>

        </div>
    );
};

TurnsTable.propTypes = {
    tursData: PropTypes.array,
    setTurnData: PropTypes.func,
    setIsModalVisible: PropTypes.func
};