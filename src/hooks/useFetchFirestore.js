import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useFetchFirestore = (iconActive) => {

    const [firebaseData, setFirebaseData] = useState({
        data: [],
        loading: true
    });

    // console.log('icon active from useFetch: ', iconActive)
    // console.log('a new requets')
    // console.log('firebase data: ', firebaseData)

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

        return () => {
            setFirebaseData({
                data: [],
                loading: true
            })
        }
    
    }, [iconActive])

    return firebaseData;

}