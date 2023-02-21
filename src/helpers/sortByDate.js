export const sortByDate = ( array ) => {

    const ordenedArray = [...array];
    ordenedArray.sort( ( a, b ) => new Date( b.savedIn?.year, b.savedIn?.month, b.savedIn?.date, b.savedIn?.hour, b.savedIn?.minutes, b.savedIn?.seconds ) - new Date( a.savedIn?.year, a.savedIn?.month, a.savedIn?.date, a.savedIn?.hour, a.savedIn?.minutes, a.savedIn?.seconds ) );

    return ordenedArray;
};