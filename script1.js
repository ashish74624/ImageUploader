let songItem = Array.from(document.getElementsByClassName("songItems"));
let songItemR = Array.from(document.getElementsByClassName("songItemsR"));

songs = [
  {
    songName: "Slim shady",
    file: "songs/1.mp3",
    cover: "img/1.jpeg",
    Disc: '"The Real Slim Shady" is a song by American rapper Eminem',
  },
  {
    songName: "Criminal",
    file: "songs/2.mp3",
    cover: "img/2.jpeg",
    Disc: "The Criminal Lyrics from Ra One",
  },
  {
    songName: "Lose you To love Me",
    file: "songs/3.mp3",
    cover: "img/3.jpeg",
    Disc: "Song by Selena Gomeez",
  },
  {
    songName: "Bombay To Punjab",
    file: "songs/4.mp3",
    cover: "img/4.jpeg",
    Disc: "Song by Deep Jandu and Divine",
  },
  {
    songName: "One Dance",
    file: "songs/5.mp3",
    cover: "img/5.jpeg",
    Disc: '"One Dance" is a song by Canadian rapper and singer Drake',
  },
  {
    songName: "Flo Rida- Low",
    file: "songs/6.mp3",
    cover: "img/6.jpeg",
    Disc: '"Low" is the debut by rapper and singer Flo Rida',
  },
  {
    songName: "Goliya",
    file: "songs/7.mp3",
    cover: "img/7.jpeg",
    Disc: "Song by Diljit Dosanjh and Honey Singh",
  },
];
let NAME = Array.from(document.getElementsByClassName("NAME"));
let NAMER = Array.from(document.getElementsByClassName("NAMER"));

console.log(songItem);
songItem.forEach((element, i) => {
  // console.log( element.getElementsByTagName("img")[0])
  element.getElementsByTagName("img")[0].src = songs[i].cover;
  // element.getElementsByTagName('h1')[0].innerText = songs[i].songName
});
NAME.forEach((element, i) => {
  element.getElementsByTagName("h1")[0].innerText = songs[i].songName;
  element.getElementsByTagName("p")[0].innerText = songs[i].Disc;
});

show_bar = () => {
  let sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
};

class Run {
  constructor(id, song_name, artist, song) {
    this.id = id;
    this.songname = song_name;
    this.artist = artist;

    this.song = song;
  }
  fill = () => {
    localStorage.setItem("id", this.id);
    localStorage.setItem("song_name", this.songname);
    localStorage.setItem("artist", this.artist);
    localStorage.setItem("song", this.song);
  };
}
let run1 = new Run("img/1.jpeg", "Slim Shady", "Eminem", "songs/1.mp3");
let run2 = new Run("img/2.jpeg", "Criminal", "Akon", "songs/2.mp3");
let run3 = new Run(
  "img/3.jpeg",
  "Lose You To Love Me",
  "Salena Gomez",
  "songs/3.mp3"
);
let run4 = new Run(
  "img/4.jpeg",
  "Bombay To Punjab",
  "Deep Jandu, DIVINE",
  "songs/4.mp3"
);
let run5 = new Run("img/5.jpeg", "One Dance", "Drake", "songs/5.mp3");
let run6 = new Run("img/6.jpeg", "LOW", "Flo Rida", "songs/6.mp3");
let run7 = new Run("img/7.jpeg", "Goliya", "Yo Yo Honey Singh", "songs/7.mp3");
