import React, { useEffect, useState } from 'react';
import { BlackButton } from './BlackButton';
import { HourTimeData } from './HourTimeData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export const HourBar = ( { wichHour, wichTimePeriod } ) => {

    const [timePeriod, setTimePeriod] = useState( null );
    const [hour, setHour] = useState( null );
    const [timePeriodValue, setTimePeriodValue] = useState( "AM" );

    useEffect( () => {

        const timeAM = () => {
            setTimePeriod(
                <BlackButton
                    button_id="period-btn"
                    button_name="AM"
                    button_func={timeMenuAM}
                    button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
                /> );
            wichTimePeriod( document.getElementById( 'period-btn' ).value );
        };
        const timePM = () => {
            setTimePeriod(
                <BlackButton
                    button_id="period-btn"
                    button_name="PM"
                    button_func={timeMenuPM}
                    button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
                /> );
            wichTimePeriod( document.getElementById( 'period-btn' ).value );
        };

        const timeMenuAM = () => {
            setTimePeriod(
                <div className="hour-bar__am-pm-menu">
                    <BlackButton
                        button_id="period-btn"
                        button_name="AM"
                        button_func={timeAM}
                        button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
                    />
                    <BlackButton
                        button_id="period-btn"
                        button_name="PM"
                        button_func={timePM}
                    />
                </div>
            );
        };

        const timeMenuPM = () => {
            setTimePeriod(
                <div className="hour-bar__am-pm-menu">
                    <BlackButton
                        button_id="period-btn"
                        button_name="PM"
                        button_func={timePM}
                        button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
                    />
                    <BlackButton
                        button_id="period-btn"
                        button_name="AM"
                        button_func={timeAM}
                    />
                </div>
            );
        };

        const listMenuHour = ( hourValue ) => {
            setHour(
                <>
                    <BlackButton
                        button_name={hourValue}
                        button_func={() => setHourMenu( hourValue )}
                        button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
                    />
                    <div className="hour-bar__numbers-menu">
                        {
                            Object.keys( HourTimeData ).map( ( item, keys ) => (
                                <BlackButton
                                    key={keys}
                                    button_name={HourTimeData[item].value}
                                    button_func={() => setHourMenu( HourTimeData[item].value )}
                                />
                            ) )
                        }
                    </div>

                </>
            );
        };

        const setHourMenu = ( hourValue ) => {
            setHour(
                <BlackButton
                    button_name={hourValue}
                    button_func={() => listMenuHour( hourValue )}
                    button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
                /> );
        };

        setTimePeriod(
            <BlackButton
                button_id="period-btn"
                button_name="AM"
                button_func={timeMenuAM}
                button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
            /> );
        setHour(
            <BlackButton
                button_name={HourTimeData[1].value}
                button_func={() => listMenuHour( HourTimeData[1].value )}
                button_logo={<FontAwesomeIcon size="lg" icon={faCaretDown} />}
                button_id={HourTimeData[1].id}
            /> );
        wichTimePeriod( timePeriod);
    }, [] );

    useEffect( () => {
        //wichHour(timePeriodValue)
        //setTimePeriodValue(document.getElementById("period-btn").innerHTML)
        wichHour( timePeriodValue );

        console.log( "valor del hour desde HourBar pero el segundo useEffect (debe salir un hola)", timePeriodValue );
    }, [timePeriodValue] );


    return (
        <div className="hour-bar">
            <p>HORA</p>
            <div className="hour-bar__time-and-hour">
                <div className="time-menu">
                    {timePeriod}
                </div>
                <div className="hour-menu">
                    {hour}
                </div>
            </div>
        </div>
    );
};
