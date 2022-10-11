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
        botoes.btnPP.src = "./assets/icons/pause.png"
        botoes.barraDeProgresso.value = 0
        player.audio.play()
    },

}

// Objeto gerente da playlist 
window.playlist = {
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
                player.audioContagem = idMusic
                player.audioAtual = player.audiosFile[player.audioContagem]

                player.audio.src = player.audioAtual.music
                player.thumbMsc.src = player.audioAtual.thumb
                player.nomeMsc.innerText = player.audioAtual.nome
                event.target.classList.add('active-music-playlist')
                botoes.btnPP.src = "./assets/icons/play.png"
            }
        }


    },
    PlaylistStart() {
        let musicasNome = audios.map(music => { return music.nome })
        let srcDasMusicas = audios.map(music => { return music.music })

        for (let i = 0; audios.length > i; i++) {
            playlist.containerAudiosPlaylist.innerHTML += `<audio class="audios-playlist" src="${srcDasMusicas[i]}"></audio>`
            let audiosPlaylist = document.querySelectorAll('.audios-playlist')

            audiosPlaylist[i].addEventListener("loadeddata", () => {
                let durationMusicsPlaylist = []
                durationMusicsPlaylist.push(botoes.segundosParaMinutos(audiosPlaylist[i].duration))

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
            if (player.audioContagem == playlist.itemsPlaylist[i].getAttribute('id')) {
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
        botoes.btnPP.src = "./assets/icons/play.png"
        botoes.barraDeProgresso.value = 0

        playlist.removeActive()
        playlist.ActiveButtonPLaylist()
    },
    PlayPause() {
        if (player.audio.paused) {
            botoes.btnPP.src = "./assets/icons/pause.png"
            player.audio.play()
            botoes.barraDeProgresso.max = player.audio.duration
        } else {
            botoes.btnPP.src = "./assets/icons/play.png"
            player.audio.pause()
        }

        playlist.ActiveButtonPLaylist()
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
        botoes.btnPP.src = "./assets/icons/play.png"
        botoes.barraDeProgresso.value = 0


        playlist.removeActive()
        playlist.ActiveButtonPLaylist()
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