$(function() {
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
    
    $.get('./songs.json').then(function(response) {
        let songs = response
        let song = songs.filter(songs =>songs.id===id)[0]
        let { url,cover,name,lyric } = song
        
        initPlayer.call(undefined, url)
        initText(cover,name,lyric)
    })
    
    function initPlayer(url){
        console.log(1);
        
        let audio = document.createElement('audio')
        audio.src = url
        audio.muted = ""
        audio.oncanplay = function() {
            audio.play()
            $('.disc-container').addClass('playing')
        }
        $('.cover').on('click', function() {
            audio.pause()
            $('.disc-container').removeClass('playing')
        })
        $('.playButton').on('click', function() {
            audio.play()
            $('.disc-container').addClass('playing')
        })
    }
    function initText(cover,name,lyric){
        $('.cover')[0].src = cover
        $('.song-description>h1')[0].innerText = name
        parseLyric(lyric)
    }
    function parseLyric (lyric){
        console.log('hhhhhhh')
        let array = lyric.split('\n')
        console.log(array)
        let regex = /^\[(.+)\](.*)$/
        
        array = array.map((string) => {
                let matches = string.match(regex)
                if (matches) {
                    return { time: matches[1], words: matches[2] }
                }
            })
            // 将内容append到('.lyric')上
        let $lyric = $('.lyric')
        array.map(function(object) {
            if (!object) { return }
            let $p = $('<p/>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric.children('.lyric-wrapper'))
        })
    }

   
})