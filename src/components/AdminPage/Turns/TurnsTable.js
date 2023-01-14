import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Turn } from './Turn';

import { splitData, splitSports } from '../../../helpers/splitData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sportsMenuAdmin } from '../../../data/sportsMenuAdmin';

import '../../../styles/AdminPage/AdminPage.css';


export const TurnsTable = React.memo( ( { turnsData, activeTurns, currentPage, setTurnData, setIsModalVisible, setDataSize } ) => {

    const [sportsMenu, setSportsMenu] = useState( sportsMenuAdmin );

    const [activeSport, setActiveSport] = useState( 'soccer' );

    const [soccerReservedTurnsArray, setSoccerReservedTurnsArray] = useState( [] );
    const [soccerCompletedTurnsArray, setSoccerCompletedTurnsArray] = useState( [] );

    const [basketballReservedTurnsArray, setBasketballReservedTurnsArray] = useState( [] );
    const [basketballCompletedTurnsArray, setBasketballCompletedTurnsArray] = useState( [] );

    const [volleyballReservedTurnsArray, setVolleyballReservedTurnsArray] = useState( [] );
    const [volleyballCompletedTurnsArray, setVolleyballCompletedTurnsArray] = useState( [] );

    const [tennisReservedTurnsArray, setTennisReservedTurnsArray] = useState( [] );
    const [tennisCompletedTurnsArray, setTennisCompletedTurnsArray] = useState( [] );

    const [turnArray, setTurnArray] = useState( [] );

    const handleChangeSport = ( sportId ) => {

        let sportData = [...sportsMenu];

        sportData.forEach( sport => {
            if ( sport.id === sportId ) {
                sport.active = true;
                setActiveSport( sport.id );
            } else sport.active = false;
        } );

        setSportsMenu( sportData );
    };

    useEffect( () => {

        const { active, inactive } = splitData( turnsData );
        const { soccer: soccerActive, basketball: basketballActive, volleyball: volleyballActive, tennis: tennisActive } = splitSports( active );

        setSoccerReservedTurnsArray( soccerActive );
        setBasketballReservedTurnsArray( basketballActive );
        setVolleyballReservedTurnsArray( volleyballActive );
        setTennisReservedTurnsArray( tennisActive );

        const { soccer: soccerInactive, basketball: basketballInactive, volleyball: volleyballInactive, tennis: tennisInactive } = splitSports( inactive );

        setSoccerCompletedTurnsArray( soccerInactive );
        setBasketballCompletedTurnsArray( basketballInactive );
        setVolleyballCompletedTurnsArray( volleyballInactive );
        setTennisCompletedTurnsArray( tennisInactive );

    }, [turnsData] );


    useEffect( () => {

        activeTurns === true && activeSport === 'soccer'
            ? setTurnArray( soccerReservedTurnsArray )
            : activeTurns === false && activeSport === 'soccer'
                ? setTurnArray( soccerCompletedTurnsArray )
                : activeTurns === true && activeSport === 'basketball'
                    ? setTurnArray( basketballReservedTurnsArray )
                    : activeTurns === false && activeSport === 'basketball'
                        ? setTurnArray( basketballCompletedTurnsArray )
                        : activeTurns === true && activeSport === 'volleyball'
                            ? setTurnArray( volleyballReservedTurnsArray )
                            : activeTurns === false && activeSport === 'volleyball'
                                ? setTurnArray( volleyballCompletedTurnsArray )
                                : activeTurns === true && activeSport === 'tennis'
                                    ? setTurnArray( tennisReservedTurnsArray )
                                    : setTurnArray( tennisCompletedTurnsArray );


        setDataSize( turnArray.length );

    }, [activeTurns, activeSport, turnArray, soccerReservedTurnsArray, soccerCompletedTurnsArray, basketballReservedTurnsArray, basketballCompletedTurnsArray, volleyballReservedTurnsArray, volleyballCompletedTurnsArray, tennisReservedTurnsArray, tennisCompletedTurnsArray] );

    useEffect( () => {
        console.log( turnArray );
    }, [turnArray] );


    return (
        <div className='Turns animate__animated animate__fadeIn'>
            <div className='table-turns__body--sports'>
                <h2 className='hidden'>Deporte</h2>
                {
                    sportsMenu.map( ( sport ) => (
                        <span key={sport.id} className={`${sport.active ? sport.color : 'bg-black'}`} onClick={() => handleChangeSport( sport.id )}>
                            <FontAwesomeIcon icon={sport.icon} className='fa-2x' />
                            <p className='hidden'>{sport.text}</p>
                        </span>
                    ) )
                }
            </div>
            <div className={`table-turns__head ${!activeTurns ? 'columns-5' : 'columns-6'}`}>
                <p>Morador</p>
                <p>Cancha</p>
                <p>Fecha</p>
                <p>Hora</p>
                <p>Agendado</p>
                <p className={`${!activeTurns ? 'hidden' : ''}`}>Acción</p>
            </div>
            <div className='table-turns__body'>
                {
                    turnArray.length !== 0
                        ? turnArray[currentPage]?.map( turn => (
                            <Turn
                                key={turn.id}
                                turn={turn}
                                setTurnData={setTurnData}
                                setIsModalVisible={setIsModalVisible}
                            />
                        ) )
                        : <p>No data</p>
                }
                {turnArray[0]?.length === 0 && <p className='no-turns'>Sin turnos agendados</p>}
            </div>
        </div>
    );
} );

TurnsTable.propTypes = {
    tursData: PropTypes.array,
    setTurnData: PropTypes.func,
    setIsModalVisible: PropTypes.func
};