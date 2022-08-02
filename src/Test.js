import React, {useEffect, useState} from 'react';
import { db } from "./firebase";
import { useFetchFirestore } from './hooks/useFetchFirestore';

export const Test = () => {

    const { data, loading } = useFetchFirestore( 'Users' );

    const [find, setFind] = useState('')

    // !loading
    // ? {
    //     data.find(item => item.id === "x9bbt0P2oQaC3x2DzMtzhKaE8kW2") 
    // }
    // : console.log('not founded')
    
    // useEffect(() => {

    //     setFind(data.map(item => item.includes("x9bbt0P2oQaC3x2DzMtzhKaE8kW2")) )
    // }, [])

    // console.log(find)


    return (
        <div>

        </div>
    );
};


