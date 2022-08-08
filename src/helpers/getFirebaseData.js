// import { useEffect, useState } from "react";
import { db } from "../firebase";

export const getFirebaseData = ( iconActive ) => {

    // const [firebaseData, setFirebaseData] = useState({
    //     data: [],
    //     loading: true
    // });

    let firebaseData = [];
    console.log('icon active, ', iconActive)

    // returns an array with all the Table elements
    db.collection( iconActive ).onSnapshot( ( querySnaphot ) => {

       const data = querySnaphot.docs.map( doc => ( {
           id: doc.id,
           ...doc.data()
       } ) );
       firebaseData.push(data)
    //    firebaseData = data;

   } )
    // try {

    // } catch ( error ) {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode)
    //     console.log(errorMessage)

    // }

    // console.log('icon active from useFetch: ', iconActive)
    // console.log('a new requets')
    // console.log('firebase data: ', firebaseData)
    console.log('firestoreData', firebaseData)


    return firebaseData;

};