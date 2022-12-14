// ====== Start e eventos atribuídos aos botões =====
window.addEventListener("load", () => {
  player.start()
  playlist.PlaylistStart()

  buttons.btnToBack.addEventListener("click", buttons.toBackMsc)
  buttons.btnPlayOrPause.addEventListener("click", buttons.PlayOrPauseMusic)
  buttons.btnToNext.addEventListener("click", buttons.toNextMsc)

  buttons.progressBar.addEventListener("charge", buttons.changeProgress)
  buttons.progressBar.addEventListener("input", buttons.changeProgress)

  player.audioMain.addEventListener("timeupdate", buttons.updateProgress)
  player.audioMain
    .addEventListener("loadeddata", buttons.AddTimeAudioToElement)
  player.audioMain.addEventListener("ended", player.reStart)
})
