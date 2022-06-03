// ====== Puxando os elementos do áudio e manipulando para modificar na web
window.player = {
    thumbMsc: document.querySelector(".img-msc"),
    nomeMsc: document.querySelector(".name-music"),
    audio: document.querySelector("#audio-principal"),
    audiosFile: audios,
    audioAtual: {},
    audioContagem: 0,
    start() {
        this.audioAtual = this.audiosFile[this.audioContagem]

        this.audio.src = this.audioAtual.music
        this.thumbMsc.src = this.audioAtual.thumb
        this.nomeMsc.innerText = this.audioAtual.nome

        botoes.barraDeProgresso.max = player.audio.duration
    },
    reStart() {
        botoes.btnProxima = player.audioContagem++
        if (player.audioContagem > player.audiosFile.length - 1) {
            player.audioContagem = 0
        }
        player.audioAtual = player.audiosFile[player.audioContagem]

        player.audio.src = player.audioAtual.music
        player.thumbMsc.src = player.audioAtual.thumb
        player.nomeMsc.innerText = player.audioAtual.nome
        botoes.btnPP.src = "./icons/pause.png"
        botoes.barraDeProgresso.value = 0
        player.audio.play()
    }
}


// ====== Puxando os botões e Funções dos botões
window.botoes = {
    btnAnterior: document.getElementsByClassName("btn")[0],
    btnPP: document.getElementsByClassName("btn")[1],
    btnProxima: document.getElementsByClassName("btn")[2],
    barraDeProgresso: document.getElementById("progresso"),
    tempoTotal: document.getElementById("tempoTotal"),
    tempoPercorrido: document.getElementById("tempoPercorrido"),
    voltarMsc() {
        this.btnAnterior = player.audioContagem--
        if (player.audioContagem < 0) {
            player.audioContagem = player.audiosFile.length - 1
        }
        player.audioAtual = player.audiosFile[player.audioContagem]

        player.audio.src = player.audioAtual.music
        player.thumbMsc.src = player.audioAtual.thumb
        player.nomeMsc.innerText = player.audioAtual.nome
        botoes.btnPP.src = "./icons/play.png"
        botoes.barraDeProgresso.value = 0
    },
    PlayPause() {
        if (player.audio.paused) {
            botoes.btnPP.src = "./icons/pause.png"
            player.audio.play()
        } else {
            botoes.btnPP.src = "./icons/play.png"
            player.audio.pause()
        }
    },
    proximaMsc() {
        this.btnProxima = player.audioContagem++
        if (player.audioContagem > player.audiosFile.length - 1) {
            player.audioContagem = 0
        }
        player.audioAtual = player.audiosFile[player.audioContagem]

        player.audio.src = player.audioAtual.music
        player.thumbMsc.src = player.audioAtual.thumb
        player.nomeMsc.innerText = player.audioAtual.nome
        botoes.btnPP.src = "./icons/play.png"
        botoes.barraDeProgresso.value = 0
    },
    mudarProgresso() {
        player.audio.currentTime = botoes.barraDeProgresso.value
        botoes.barraDeProgresso.max = player.audio.duration
    },
    atualizacaoDeProgresso() {
        botoes.tempoPercorrido.innerText = botoes.segundosParaMinutos(player.audio.currentTime)
        botoes.barraDeProgresso.value = player.audio.currentTime
    },
    timerAudio() {
        botoes.tempoPercorrido.innerText = botoes.segundosParaMinutos(player.audio.currentTime)
        botoes.tempoTotal.innerText = botoes.segundosParaMinutos(player.audio.duration)
    },
    segundosParaMinutos(tempo) {
        const minutos = Math.floor(tempo / 60)
        const segundos = Math.floor(tempo % 60)
        return `${("0" + minutos).slice(-2)}:${("0" + segundos).slice(-2)}`
    }
}
