export const getDate = () => {

    const date = new Date();
    const [year, month, day, hour] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()];
    const today = {
        year: year,
        month: month,
        day: day,
        hour: hour
    }

    return today;

};