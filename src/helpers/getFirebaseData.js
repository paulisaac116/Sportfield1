import { db } from "../firebase";

export const getFirebaseData = ( iconActive ) => {

    let firebaseData = [];

    // returns an array with all the Table elements
    db.collection( iconActive ).onSnapshot( ( querySnaphot ) => {

        const data = querySnaphot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
        firebaseData.push( data );

    } );

    return firebaseData;

};