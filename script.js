const musicContainer = document.querySelector('.muzplace');
const playBtn = document.querySelector('#play-pause');
const playIcon = document.querySelector('#play-icon');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio-player');
const progress = document.querySelector('#progress-bar');
const currTime = document.querySelector('#current-time');
const durTime = document.querySelector('#duration');
const title = document.querySelector('#song-title');
const artist = document.querySelector('#song-artist');
const cover = document.querySelector('#cover-image');
const playlistItems = document.querySelectorAll('.playlist-item');

// Song titles
const songs = [
    {
        title: "I'm with you",
        artist: "Red Hot Chili Peppers",
        cover: "img/music-with-you.jpg",
        src: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3" // Sample Audio
    },
    {
        title: "Butter",
        artist: "BTS",
        cover: "img/music-butter.jpg",
        src: "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3" // Sample Audio
    },
    {
        title: "Back Together",
        artist: "Unknown Artist",
        cover: "img/music-back-together.jpg",
        src: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg" // Sample Audio
    },
    {
        title: "Unwind",
        artist: "Unknown Artist",
        cover: "img/music-unwind.jpg",
        src: "https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg" // Sample Audio
    }
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.cover;
    audio.src = song.src;

    // Highlight active song in playlist
    playlistItems.forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('active');
            item.style.opacity = '1';
        } else {
            item.classList.remove('active');
            item.style.opacity = '0.6';
        }
    });
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playIcon.setAttribute('name', 'pause');
    audio.play().catch(error => {
        console.log("Audio file not found or playback error:", error);
        // Optional: alert/notify user if strictly necessary, but console log is less intrusive
    });
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playIcon.setAttribute('name', 'play');
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    // Update time display
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currTime.innerText = `${currentMinutes}:${currentSeconds}`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
        durTime.innerText = `${durationMinutes}:${durationSeconds}`;
    }
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth; // not used range input directly handles value
    // For range input:
    const duration = audio.duration;
    audio.currentTime = (progress.value / 100) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progress.addEventListener('input', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Playlist click
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
    });
});


