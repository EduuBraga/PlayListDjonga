// ====== Start e eventos atribuídos aos botões =====
window.addEventListener("load", () => {
    player.start()
    player.PlaylistStart()

    botoes.btnAnterior.addEventListener("click", botoes.voltarMsc)
    botoes.btnPP.addEventListener("click", botoes.PlayPause)
    botoes.btnProxima.addEventListener("click", botoes.proximaMsc)

    botoes.barraDeProgresso.addEventListener("charge", botoes.mudarProgresso)
    botoes.barraDeProgresso.addEventListener("input", botoes.mudarProgresso)
    player.audio.addEventListener("timeupdate", botoes.atualizacaoDeProgresso)
    player.audio.addEventListener("loadeddata", botoes.timerAudio)

    player.audio.addEventListener("ended", player.reStart)
})
