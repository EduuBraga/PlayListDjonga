cores
[x]ajeitar botões com o krita, para não comer as laterais.
[x] Adicionar botão de volume
[x] Adicionar código JS
[x] Adicionar funcionalidade de pular e voltar música
[x] Ajeitar media queries para telas diferentes
[x] Fazer lojo Personalizada no krita
[x] Adicionar Range para o tamanho da música para atualizar
[n] Adiconar Playlist ao lado do play.
[ ] 

<!-- PLaylist -->
css
/* .playlist{
    background-color: #615F57;
    position:fixed;
    right: 0px ;
    top: 17%;
    height: 70%;
} */

html
    <!-- <section class="playlist">
        <section><p>Música 1</p> </section>
        <section> </section>
        <section> </section>
        <section> </section>
        <section> </section>
        <section> </section>
        <section> </section>
        <section> </section>
        <section> </section>
    </section> -->



        voltarAoInicio() {
        if (player.audioContagem > player.audiosFile.length) {
            player.audiocontagem = 0
            player.audioAtual = player.audiosFile[player.audioContagem]

            player.audio.src = player.audioAtual.music
            player.thumbMsc.src = player.audioAtual.thumb
            player.nomeMsc.innerText = player.audioAtual.nome
            botoes.btnPP.src = "./icons/play.png"
        }