window.addEventListener("load", () => {
  // Iniciando configurações do primeiro áudio
  player.start()

  // Adicionando eventos aos botões
  buttons.btnToBack
    .addEventListener("click", _ => buttons.handleBackOrNextMusic('back'))
  buttons.btnToNext
    .addEventListener("click", _ => buttons.handleBackOrNextMusic('next'))
  buttons.btnPlayOrPause.addEventListener("click", buttons.PlayOrPauseMusic)

  // Adicionando eventos a barra de progresso
  buttons.progressBar.addEventListener("charge", buttons.changeProgress)
  buttons.progressBar.addEventListener("input", buttons.changeProgress)

  // Adicionando eventos ao áudio
  player.audioMain.addEventListener("timeupdate", buttons.updateProgress)
  player.audioMain
    .addEventListener("loadeddata", buttons.AddTimeAudioToElement)
  player.audioMain.addEventListener("ended", player.nextMusic)

  // Adicionando eventos a Playlist
  playlist.imgOpenPlaylist.addEventListener('click', playlist.showPlaylist)
})
