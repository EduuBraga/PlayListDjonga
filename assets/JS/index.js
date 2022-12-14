// ====== Start e eventos atribuídos aos botões =====
window.addEventListener("load", () => {
    player.start()
    playlist.PlaylistStart()

    botoes.btnAnterior.addEventListener("click", botoes.voltarMsc)
    botoes.btnPP.addEventListener("click", botoes.PlayPause)
    botoes.btnProxima.addEventListener("click", botoes.proximaMsc)

    botoes.barraDeProgresso.addEventListener("charge", botoes.mudarProgresso)
    botoes.barraDeProgresso.addEventListener("input", botoes.mudarProgresso)
    player.audioMain.addEventListener("timeupdate", botoes.atualizacaoDeProgresso)
    player.audioMain.addEventListener("loadeddata", botoes.timerAudio)

    player.audioMain.addEventListener("ended", player.reStart)
})
