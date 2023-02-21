export const getDate = () => {

    const date = new Date();
    const [year, month, day, hour, minutes, seconds] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
    const today = {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minutes: minutes,
        seconds: seconds
    };

    return today;

};