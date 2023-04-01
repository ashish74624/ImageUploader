console.log("Welcome To Spotify");

let song1 = localStorage.getItem("song");
let audioElement = new Audio(song1); // audioElement is a variable
let play = document.getElementById("play");
let bar = document.getElementById("bar");
let cvr = document.getElementById("cvr");
cvr.src = localStorage.getItem("id");
let song_name = document.getElementById("song_name");
song_name.innerText = localStorage.getItem("song_name");
let artist = document.getElementById("artist");
artist.innerText = localStorage.getItem("artist");

load = () => {
  audioElement.play();
  play.classList.remove("fa-circle-play");
  play.classList.add("fa-circle-pause");
};

// audioElement.play()
//Handle play/pause click
play.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    play.classList.remove("fa-circle-play"); // arg = class name
    play.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    play.classList.remove("fa-circle-pause");
    play.classList.add("fa-circle-play");
  }
});
// Listen to Events
update_bar = () => {
  audioElement.addEventListener("timeupdate", () => {
    // time update is an event just like 'click' and it is an audio event
    console.log("time update");
    //Update seekbar
    progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    // The above code is (currentTime of audio) divided by (duration of the audio) multiplied by 100 to get a percentage of completion of the audio
    console.log(progress);
    bar.value = progress; // Makes the bar move according to the duartion of the song
    // In short here we give the value to the progress bar which is calcutated previously
  });

  // Updating the song as we click on the seek

  bar.addEventListener("change", () => {
    audioElement.currentTime = (bar.value * audioElement.duration) / 100;
  });
};
update_bar();
let i = document.getElementById("icon");

i.addEventListener("click", () => {
  // For the like btn
  if (i.classList.contains("text-white")) {
    i.classList.remove("text-white");
    i.classList.add("text-green-500");
  } else {
    i.classList.remove("text-green-500");
    i.classList.add("text-white");
  }
});
let next = document.getElementById("next");
// if ((process = 100)) {
//   next();
// }
next = () => {
  class Nextsong {
    constructor(id, song_name, artist, song) {
      this.id = id;
      this.song_name = song_name;
      this.artist = artist;
      this.song = song;
    }
    playnext = () => {
      audioElement.pause();

      localStorage.setItem("id", this.id);
      localStorage.setItem("song_name", this.song_name);
      localStorage.setItem("artist", this.artist);

      localStorage.setItem("song", this.song);
      cvr.src = localStorage.getItem("id");
      artist.innerText = localStorage.getItem("artist");
      song_name.innerText = localStorage.getItem("song_name");
      song1 = localStorage.getItem("song");
      audioElement = new Audio(song1);
      audioElement.play();
      update_bar();
    };
  }
  switch (localStorage.id) {
    case "img/1.jpeg":
      let ns1 = new Nextsong("img/2.jpeg", "Criminal", "Akon", "songs/2.mp3");
      ns1.playnext();
      break;
    case "img/2.jpeg":
      let ns2 = new Nextsong(
        "img/3.jpeg",
        "Lose You To Love Me",
        "Salena Gomez",
        "songs/3.mp3"
      );
      ns2.playnext();
      break;
    case "img/3.jpeg":
      let ns3 = new Nextsong(
        "img/4.jpeg",
        "Bombay To Punjab",
        "Deep Jandu, DIVINE",
        "songs/4.mp3"
      );
      ns3.playnext();
      break;
    case "img/4.jpeg":
      let ns4 = new Nextsong("img/5.jpeg", "One Dance", "Drake", "songs/5.mp3");
      ns4.playnext();
      break;
    case "img/5.jpeg":
      let ns5 = new Nextsong("img/6.jpeg", "LOW", "Flo Rida", "songs/6.mp3");
      ns5.playnext();
      break;
    case "img/6.jpeg":
      let ns6 = new Nextsong(
        "img/7.jpeg",
        "Goliya",
        "Yo Yo Honey Singh",
        "songs/7.mp3"
      );
      ns6.playnext();
      break;
    case "img/7.jpeg":
      let ns7 = new Nextsong(
        "img/1.jpeg",
        "Slim Shady",
        "Eminem",
        "songs/1.mp3"
      );
      ns7.playnext();
      break;
    default:
      break;
  }
};

prev = () => {
  class Prevsong {
    constructor(id, song_name, artist, song) {
      this.id = id;
      this.song_name = song_name;
      this.artist = artist;
      this.song = song;
    }
    playprev = () => {
      audioElement.pause();

      localStorage.setItem("id", this.id);
      localStorage.setItem("song_name", this.song_name);
      localStorage.setItem("artist", this.artist);

      localStorage.setItem("song", this.song);
      cvr.src = localStorage.getItem("id");
      artist.innerText = localStorage.getItem("artist");
      song_name.innerText = localStorage.getItem("song_name");
      song1 = localStorage.getItem("song");
      audioElement = new Audio(song1);
      audioElement.play();
      update_bar();
    };
  }
  switch (localStorage.id) {
    case "img/1.jpeg":
      // let ps1= new Prevsong()

      let ps1 = new Prevsong(
        "img/7.jpeg",
        "Goliya",
        "Yo Yo Honey Singh",
        "songs/7.mp3"
      );
      ps1.playprev();
      break;
    case "img/2.jpeg":
      let ps2 = new Prevsong(
        "img/1.jpeg",
        "Slim Shady",
        "Eminem",
        "songs/1.mp3"
      );
      ps2.playprev();
      break;
    case "img/3.jpeg":
      let ps3 = new Prevsong("img/2.jpeg", "Criminal", "Akon", "songs/2.mp3");
      ps3.playprev();
      break;
    case "img/4.jpeg":
      let ps4 = new Prevsong(
        "img/3.jpeg",
        "Lose You To Love Me",
        "Salena Gomez",
        "songs/3.mp3"
      );
      ps4.playprev();
      break;
    case "img/5.jpeg":
      let ps5 = new Prevsong(
        "img/4.jpeg",
        "Bombay To Punjab",
        "Deep Jandu, DIVINE",
        "songs/4.mp3"
      );
      ps5.playprev();
      break;
    case "img/6.jpeg":
      let ps6 = new Prevsong("img/5.jpeg", "One Dance", "Drake", "songs/5.mp3");
      ps6.playprev();
      break;
    case "img/7.jpeg":
      let ps7 = new Prevsong("img/6.jpeg", "LOW", "Flo Rida", "songs/6.mp3");
      ps7.playprev();
      break;

    default:
      break;
  }
};
