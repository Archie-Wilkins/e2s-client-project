// taken from
// https://stackoverflow.com/questions/24998624/day-name-from-date-in-js
export function getDayName(dateString) {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    return dayName
}