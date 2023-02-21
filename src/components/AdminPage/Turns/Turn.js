import React from 'react';
import { RedButton } from '../../Buttons/RedButton';

import { hours } from '../../../data/CalendarHours';
import { months } from '../../../data/CalendarMonths';

export const Turn = ( { turn, setTurnData, setIsModalVisible } ) => {

    const handleDeleteTurn = () => {
        setTurnData( turn );
        setIsModalVisible( true );
    };

    return (
        <div className='table-turns__body--row'>
            <div className='body-row__data'>
                <p className='body-row__data-name'>{`${turn.name} ${turn.lastName}`}</p>
                <p className='body-row__data-field--row'>{`${turn.field?.fieldId} - ${turn.field?.location}`}</p>
                <div className='body-row__data-field--col hidden'>
                    <p>{`${turn.field?.fieldId}`}</p>
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
                                                <p className={`date-list${turn.date.length === 2 ? key + 1 : ''}`}>{`${date.day} ${date.date} de ${months[date.month]}`}</p>
                                                <p>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</p>
                                            </>
                                        ) )
                                    }
                                </div>
                                <div className='body-row__data--date-row hidden'>
                                    {
                                        turn.date.map( ( date, key ) => (
                                            <p key={key}>{`${date.day} ${date.date} de ${months[date.month]}`}</p>

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
                                <p className='date-list'>{`${turn.date[0].day} ${turn.date[0].date} de ${months[turn.date[0].month]}`}</p>
                                <div className='body-row__data--hour-row'>
                                    {
                                        turn.date.map( ( date, key ) => (
                                            <p key={key}>{`${hours.find( item => item.start === date.timeStart ).timeRange}`}</p>

                                        ) )
                                    }

                                </div></>
                        : <p className='text-white'>ups</p>
                }

                <p className='body-row__data-saved'>{`${turn.savedIn?.day} de ${months[turn.savedIn?.month]} - ${turn.savedIn?.hour}:${turn.savedIn?.minutes}`}</p>
            </div>
            {
                turn.active === true
                    ? <div className='body-row__buttons'>
                        <RedButton
                            button_name={'Finalizar'}
                            button_func={() => handleDeleteTurn( turn )}
                        />
                    </div>
                    : <></>
            }
        </div>
    );
};
