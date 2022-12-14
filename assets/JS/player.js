// ====== Puxando os elementos do áudio e manipulando para modificar na web
const player = {
  thumbMsc: document.querySelector(".img-msc"),
  nameMsc: document.querySelector(".name-music"),
  audioMain: document.querySelector("#audio-main"),
  audiosFile: audios,
  audioCurrent: {},
  audioCount: 0,
  start() {
    player.audioCurrent = player.audiosFile[player.audioCount]

    player.audioMain.src = player.audioCurrent.music
    player.thumbMsc.src = player.audioCurrent.thumb
    player.nameMsc.innerText = player.audioCurrent.nameMsc

    buttons.progressBar.max = player.audioMain.duration
  },
  reStart() {
    player.audioCount++

    if (player.audioCount > player.audiosFile.length - 1) {
      player.audioCount = 0
    }

    player.start()
    buttons.btnPlayOrPause.src = "./assets/icons/pause.png"
    buttons.progressBar.value = 0
    player.audioMain.play()
  },
}

// Objeto gerente da playlist 
const playlist = {
  Playlist: document.querySelector('#playlist'),
  containerAudiosPlaylist: document.querySelector("#container-audios"),
  audiosPlaylistPlay: [],
  itemsPlaylist: [],
  StartMusicPlaylist(event) {
    for (let i = 0; playlist.audiosPlaylistPlay.length > i; i++) {
      if (playlist.audiosPlaylistPlay[i].played.length === 1) {
        let musicaTocando = player.audiosPlaylistPlay[i]
        musicaTocando.pause()
        musicaTocando.played.length = 0
        musicaTocando.currentTime = 0
      } else {
        let musicaActive = document.querySelector('.active-music-playlist')
        if (musicaActive) {
          musicaActive.classList.remove('active-music-playlist')
        }

        let idMusic = event.target.getAttribute('id')
        player.audioCount = idMusic
        player.audioCurrent = player.audiosFile[player.audioCount]

        player.audioMain.src = player.audioCurrent.music
        player.thumbMsc.src = player.audioCurrent.thumb
        player.nameMsc.innerText = player.audioCurrent.nameMsc
        event.target.classList.add('active-music-playlist')
        buttons.btnPlayOrPause.src = "./assets/icons/play.png"
      }
    }
  },
  PlaylistStart() {
    let musicasNome = audios.map(music => { return music.nameMsc })
    let srcDasMusicas = audios.map(music => { return music.music })

    for (let i = 0; audios.length > i; i++) {
      playlist.containerAudiosPlaylist.innerHTML += `<audio class="audios-playlist" src="${srcDasMusicas[i]}"></audio>`
      let audiosPlaylist = document.querySelectorAll('.audios-playlist')

      audiosPlaylist[i].addEventListener("loadeddata", () => {
        let durationMusicsPlaylist = []
        durationMusicsPlaylist.push(buttons.getMinutesAndSeconds(audiosPlaylist[i].duration))

        playlist.Playlist.innerHTML += `
                <div id="${i}" class="item-playlist" onclick="playlist.StartMusicPlaylist(event)"> 
                    <div>${musicasNome[i]}</div> 
                    <span>${durationMusicsPlaylist}</span> 
                </div>`

        playlist.audiosPlaylistPlay = document.querySelectorAll(".audios-playlist")
        playlist.itemsPlaylist = document.querySelectorAll(".item-playlist")
      })
    }
  },
  hidePlaylist() {
    playlist.Playlist.style = "bottom: -100%;"
  },
  showPlaylist() {
    playlist.Playlist.style = "bottom: 0;"
  },
  ActiveButtonPLaylist() {
    for (let i = 0; audios.length > i; i++) {
      if (player.audioCount == playlist.itemsPlaylist[i].getAttribute('id')) {
        playlist.itemsPlaylist[i].classList.add('active-music-playlist')
      }
    }
  },
  removeActive() {
    let musicaActive = document.querySelector('.active-music-playlist')
    if (musicaActive) {
      musicaActive.classList.remove('active-music-playlist')
    }
  }
}

// === Objeto gerente dos botões ===
const buttons = {
  btnToBack: document.querySelector('.btn_to_back'),
  btnPlayOrPause: document.querySelector('.btn_play_or_pause'),
  btnToNext: document.querySelector('.btn_to_next'),
  progressBar: document.querySelector("#progress"),
  timeTotal: document.getElementById("timeTotal"),
  timeCurrent: document.getElementById("timeCurrent"),
  toBackMsc() {
    player.audioCount--

    if (player.audioCount < 0) {
      player.audioCount = player.audiosFile.length - 1
    }
    player.audioCurrent = player.audiosFile[player.audioCount]

    player.audioMain.src = player.audioCurrent.music
    player.thumbMsc.src = player.audioCurrent.thumb
    player.nameMsc.innerText = player.audioCurrent.nameMsc
    buttons.btnPlayOrPause.src = "./assets/icons/play.png"
    buttons.progressBar.value = 0

    playlist.removeActive()
    playlist.ActiveButtonPLaylist()
  },
  PlayOrPauseMusic() {
    if (player.audioMain.paused) {
      buttons.btnPlayOrPause.src = "./assets/icons/pause.png"
      player.audioMain.play()
      buttons.progressBar.max = player.audioMain.duration
    } else {
      buttons.btnPlayOrPause.src = "./assets/icons/play.png"
      player.audioMain.pause()
    }

    playlist.ActiveButtonPLaylist()
  },
  toNextMsc() {
    player.audioCount++

    if (player.audioCount > player.audiosFile.length - 1) {
      player.audioCount = 0
    }
    player.audioCurrent = player.audiosFile[player.audioCount]

    player.audioMain.src = player.audioCurrent.music
    player.thumbMsc.src = player.audioCurrent.thumb
    player.nameMsc.innerText = player.audioCurrent.nameMsc
    buttons.btnPlayOrPause.src = "./assets/icons/play.png"
    buttons.progressBar.value = 0

    playlist.removeActive()
    playlist.ActiveButtonPLaylist()
  },
  changeProgress() {
    player.audioMain.currentTime = buttons.progressBar.value
    buttons.progressBar.max = player.audioMain.duration
  },
  updateProgress() {
    buttons.timeCurrent.innerText =
      buttons.getMinutesAndSeconds(player.audioMain.currentTime)
    buttons.progressBar.value = player.audioMain.currentTime
  },
  AddTimeAudioToElement() {
    buttons.timeCurrent.innerText =
      buttons.getMinutesAndSeconds(player.audioMain.currentTime)
    buttons.timeTotal.innerText =
      buttons.getMinutesAndSeconds(player.audioMain.duration)
  },
  getMinutesAndSeconds(time) {
    const minutos = Math.floor(time / 60)
    const segundos = Math.floor(time % 60)
    return `${("0" + minutos).slice(-2)}:${("0" + segundos).slice(-2)}`
  }
}