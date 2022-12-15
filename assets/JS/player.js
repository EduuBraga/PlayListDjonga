// Objeto manipulador do áudio
const player = {
  thumbMsc: document.querySelector(".img-msc"),
  nameMsc: document.querySelector(".name-music"),
  audioMain: document.querySelector("#audio-main"),
  audiosFile: audios,
  audioCurrent: {},
  indexAudioCurrent: 0,
  start() {
    player.audioCurrent = player.audiosFile[player.indexAudioCurrent]

    player.audioMain.src = player.audioCurrent.music
    player.thumbMsc.src = player.audioCurrent.thumb
    player.nameMsc.innerText = player.audioCurrent.nameMsc

    buttons.progressBar.max = player.audioMain.duration
  },
  nextMusic() {
    buttons.backOrAdvanceIndex('next')
    player.start()
    buttons.btnPlayOrPause.src = "./assets/icons/pause.png"
    buttons.progressBar.value = 0
    player.audioMain.play()
  },
}

// Objeto manipulador dos botões 
const buttons = {
  btnToBack: document.querySelector('.btn_to_back'),
  btnPlayOrPause: document.querySelector('.btn_play_or_pause'),
  btnToNext: document.querySelector('.btn_to_next'),
  progressBar: document.querySelector("#progress"),
  timeTotal: document.querySelector("#timeTotal"),
  timeCurrent: document.querySelector("#timeCurrent"),
  backOrAdvanceIndex(backOrNext) {
    const lastIndexAudio = player.audiosFile.length - 1

    if (backOrNext === 'back') {
      player.indexAudioCurrent--

      const indexAudioNegative = player.indexAudioCurrent < 0
      indexAudioNegative ? player.indexAudioCurrent = lastIndexAudio : null
    } else {
      player.indexAudioCurrent++

      const indexAudioSpentLastIndex = player.indexAudioCurrent > lastIndexAudio
      indexAudioSpentLastIndex ? player.indexAudioCurrent = 0 : null
    }
  },
  handleBackOrNextMusic(backOrNext) {
    buttons.backOrAdvanceIndex(backOrNext)

    player.start()
    buttons.btnPlayOrPause.src = "./assets/icons/play.png"
    buttons.progressBar.value = 0
  },
  PlayOrPauseMusic() {
    const musicPaused = player.audioMain.paused
    buttons.progressBar.max = player.audioMain.duration

    if (musicPaused) {
      buttons.btnPlayOrPause.src = "./assets/icons/pause.png"
      player.audioMain.play()
      return
    }

    buttons.btnPlayOrPause.src = "./assets/icons/play.png"
    player.audioMain.pause()
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


// Objeto gerente da playlist 
const playlist = {
  imgOpenPlaylist: document.querySelector('.img_open_playlist'),
  containerPlaylist: document.querySelector('.container_playlist'),
  startHTMLplaylist() {
    player.audiosFile.forEach(audio => {
      playlist.containerPlaylist.innerHTML += `
          <div id="music${audio.id}" class="item-playlist"> 
            <div>${audio.nameMsc}</div> 
            <span>${audio.duration}</span> 
          </div>
        `
    });

    //Adiciona feedback a primeira music quando a página pé carregada.
    document.querySelector('#music1').classList.add('active-music-playlist')

    //Adiciona eventos de click aos items da lista
    playlist.addEventItemPlaylist()
  },
  addEventItemPlaylist() {
    const itemsPlaylist = document.querySelectorAll('.item-playlist')

    itemsPlaylist.forEach((item, index) => {
      item.addEventListener('click', () => {
        const idMusicClicked = index

        //removendo feedback à música que está tocando na playlist.
        playlist.removeFeedbackActiveMusicPlaylist()
        
        //Adicionando feedback a música que está tocando na playlist.
        playlist.addFeedbackActiveMusicPlaylist(idMusicClicked)

        //Setando qual o index do áudio clicado e mudando o áudio de acordo.
        player.indexAudioCurrent = idMusicClicked
        buttons.btnPlayOrPause.src = "./assets/icons/play.png"
        player.start()
      })
    })
  },
  addFeedbackActiveMusicPlaylist(id) {
    const musicClicked = document.querySelector(`#music${id + 1}`)

    musicClicked.classList.add('active-music-playlist')
  },
  removeFeedbackActiveMusicPlaylist(){
    const musicWithFeedback = document.querySelector('.active-music-playlist')

    if(musicWithFeedback){
      musicWithFeedback.classList.remove('active-music-playlist')
    }
  },
  hideOrShowPlaylist(hideOrShow) {
    hideOrShow === 'show'
      ? playlist.containerPlaylist.style = "bottom: 0"
      : playlist.containerPlaylist.style = "bottom: -100%"
  }
}