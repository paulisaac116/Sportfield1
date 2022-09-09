export const getWeek = () => {

    /**
     * Calculate the last week of the month given
     * 
     * @param {*} finalDayNumber 
     * @param {*} finalDay 
     * @param {*} year 
     * @param {*} month 
     * @returns 
     */

    const calculate = ( finalDayNumber, finalDay, year, month ) => {

        const finalWeekMonth = [];
        for ( let i = finalDayNumber - 1; i >= 0; i-- ) {
            finalWeekMonth.push( {
                year: year,
                month: month,
                day: finalDay - i
            } );
        }

        const firtDayNextMonth = new Date( year, month + 1, 1 );
        const [nextYear, nextMonth, nextDay] = [firtDayNextMonth.getFullYear(), firtDayNextMonth.getMonth(), firtDayNextMonth.getDate()];
        let a = 0;
        while ( finalWeekMonth.length !== 7 ) {
            finalWeekMonth.push( {
                year: nextYear,
                month: nextMonth,
                day: firtDayNextMonth.getDate() + a
            } );
            a++;
        }

        return finalWeekMonth;

    };

    const today = new Date();
    const [year, month, day, dayNumber] = [today.getFullYear(), today.getMonth(), today.getDate(), today.getDay() === 0 ? 7 : today.getDay()];

    const weekArray = [];

    const firstMonday = day - dayNumber + 1;

    for ( let i = 0; i < 7; i++ ) {
        weekArray.push( {
            year: year,
            month: month,
            day: firstMonday + i
        } );
    }

    const finalDayMonth = new Date( year, month + 1, 0 );
    const [finalDayNumber, finalDay] = [finalDayMonth.getDay(), finalDayMonth.getDate()];
    const finalWeekMonth = calculate( finalDayNumber, finalDay, year, month );

    if ( JSON.stringify( finalWeekMonth[0] ) === JSON.stringify( weekArray[0] ) ) return finalWeekMonth;
    else if ( weekArray[0].day <= 0 ) {

        const firstDayMonth = new Date( year, month, 0 );;
        const [firstDayNumber, firstDay, firstYear, firstMonth] = [firstDayMonth.getDay(), firstDayMonth.getDate(), firstDayMonth.getFullYear(), firstDayMonth.getMonth()];

        return calculate( firstDayNumber, firstDay, firstYear, firstMonth );
    } else return weekArray;

};