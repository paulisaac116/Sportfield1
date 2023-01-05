export const splitData = ( data ) => {

    console.log( 'data: ', data );

    let active = [];
    let inactive = [];

    data.map( ( item ) => item.active === true ? active.push( item ) : inactive.push( item ) );
    active = matrix( active );
    inactive = matrix( inactive );

    return { active, inactive };

};

export function matrix( array ) {

    const matrix = [];
    let row = [];
    let counter = 0;

    while ( array.length !== 0 ) {
        if ( counter === 4 ) {
            matrix.push( row );
            row = [];
            counter = 0;
        } else {
            row.push( array.shift() );
            counter++;
        }
    }
    matrix.push( row );
    return matrix;
}

export const splitSports = ( sportArray ) => {

    let soccer = [];
    let basketball = [];
    let volleyball = [];
    let tennis = [];

    sportArray.forEach( array => {

        array.forEach( turn => {
            turn.field.fieldType === 'Fútbol'
                ? soccer.push( turn )
                : turn.field.fieldType === 'Basquet'
                    ? basketball.push( turn )
                    : turn.field.fieldType === 'Voleibol'
                        ? volleyball.push( turn )
                        : tennis.push( turn );

        } );

    } );

    soccer = matrix( soccer );
    basketball = matrix( basketball );
    volleyball = matrix( volleyball );
    tennis = matrix( tennis );

    return { soccer, basketball, volleyball, tennis };

}; 