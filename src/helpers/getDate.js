export const getDate = () => {

    const date = new Date();
    const [year, month, day, hour, minutes] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()];
    const today = {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minutes: minutes
    };

    return today;

};