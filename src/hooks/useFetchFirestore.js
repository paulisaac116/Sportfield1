import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useFetchFirestore =  (iconActive) => {

    const [firebaseData, setFirebaseData] = useState({
        data: [],
        loading: true
    });

    useEffect( () => {

        db.collection(iconActive).onSnapshot( (querySnaphot) => {

            const data = querySnaphot.docs.map( doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setFirebaseData({
                data: data,
                loading: false
            })

        })

        // return unsuscribe()
        return () => {
            setFirebaseData({
                data: [],
                loading: true
            })
        }
    
    }, [iconActive])

    return firebaseData;

}