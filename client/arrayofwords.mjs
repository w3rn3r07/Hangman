export let randomwordstr = '';
// A function to select a random word from the genres array:-
export function drawWord() {
  const genres = ['Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Thriller'];
  const randomno = Math.floor((Math.random()) * genres.length); // gives a random index number from 0 to genres.length-1
  randomwordstr = (genres[randomno]).toUpperCase(); // selects random word from the array and converts it to uppercase
}
