// fetchAlbums = () => {
//   fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     .then(res => res.json()) //nothing shows up in the console but gets the real json data
//     .then(json => console.log(json))
//     .then(json => console.log(json.length)); //after getting the json from before you console log it
// };

//async await stuff without arrow functions
// async function fetchAlbums() {
//   const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
//   const json = await res.json(); //nothing shows up in the console but gets the real json data
//   console.log(json);
//   console.log(json.length); //after getting the json from before you console log it
// }

// async await with arrow functions
const fetchAlbums = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json(); //nothing shows up in the console but gets the real json data
  console.log(json);
  console.log(json.length); //after getting the json from before you console log it
};

fetchAlbums();
