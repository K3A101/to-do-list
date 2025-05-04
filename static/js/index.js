console.log('Happy developing ✨')

const currentDate = new Date();
console.log(currentDate);

const day = document.querySelector('.day');
const dateNumber = document.querySelector('.date-number');
const months = document.querySelector('.month');
dateNumber.innerHTML = currentDate.getDate();

let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let days = {
    Sunday: 'Djadumingu',
    Monday: 'Djaluna',
    Tuesday: 'Djamars',
    Wednesday: 'Djarason',
    Thursday: 'Djaweps',
    Friday: 'Djabierne',
    Saturday: 'Djasabra'
};

day.innerHTML = days[dayNames[currentDate.getDay()]];

let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let formattedMonths = {
    January: 'Yanüari',
    February: 'Februari',
    March: 'Mart',
    April: 'Aprel',
    May: 'Mèi',
    June: 'Yüni',
    July: 'Yüli',
    August: 'Òugùstùs',
    September: 'Sèptèmber',
    October: 'Òktober',
    November: 'Novèmber',
    December: 'Desèmber'
};

months.innerHTML = formattedMonths[monthNames[currentDate.getMonth()]];
