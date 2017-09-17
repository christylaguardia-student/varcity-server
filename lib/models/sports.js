
let id = 0;
let sports = [];

const maleSports = [
  'Basketball',
  'Baseball',
  'Football',
  'Soccer',
  'Golf',
  'Wrestling',
  'Swimming',
  'Lacrosse',
  'Water Polo',
  'Track',
  'Volleyball',
  'Tennis'
];

const femaleSports = [
  'Basketball',
  'Softball',
  'Volleyball',
  'Soccer',
  'Golf',
  'Track',
  'Swimming',
  'Lacrosse',
  'Water Polo',
  'Gymnastics',
  'Tennis'
];

maleSports.forEach(sport => {
  sports.push(`${sport} - Boy's`)
  sports.push(`${sport} - Men's`)
});

femaleSports.forEach(sport => {
  sports.push(`${sport} - Girl's`)
  sports.push(`${sport} - Women's`)
});

sports.sort((a,b) => a.text > b.text ? 1 : -1)

console.log(sports);

module.exports = sports;
