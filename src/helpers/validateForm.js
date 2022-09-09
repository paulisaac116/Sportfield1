export const validateForm = ( formValues, setFormErrors, setFormData ) => {

    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if ( !formValues.name ) {
        errors.name = 'Ingresa tu nombre';
    }
    if ( !formValues.lastName ) {
        errors.lastName = 'Ingresa tu apellido';
    }
    if ( !formValues.land ) {
        errors.land = 'Ingresa tu número de lote';
    }
    if ( !formValues.email ) {
        errors.email = 'Ingresa tu correo electrónico';
    } else if ( !regex.test( formValues.email ) ) {
        errors.email = 'No es un formato de correo válido';
    }
    if ( !formValues.password ) {
        errors.password = 'Ingresa tu contraseña';
    } else if ( formValues.password.length <= 5 ) errors.password = 'La contraseña debe tener mínino 6 caracteres';

    if ( Object.keys( errors ).length === 0 ) setFormData( formValues );
    else setFormErrors( errors );

};