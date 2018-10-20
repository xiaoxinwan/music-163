$(function() {
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
    
    $.get('./songs.json').then(function(response) {
        let songs = response
        let song = songs.filter(songs =>songs.id===id)[0]
        let { url,cover,name,artist,lyric } = song
        
        initPlayer.call(undefined, url)
        initText(cover,name,artist,lyric)
    })
    
    function initPlayer(url){
        
        
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
        setInterval(()=>{
            
            let seconds = audio.currentTime
            let minutes = ~~(seconds/60)
            let left = seconds - minutes*60
            let time = `${pad(minutes)}: ${pad(left)}`
            let $lyric = $('.lyric-wrapper > p')
            let $whichlyric
            for(let i=0; i<$lyric.length; i++){
                if($lyric[i+1] !== undefined && $lyric.eq(i).attr('data-time') < time && $lyric.eq(i+1).attr('data-time') > time){
                    
                    $whichlyric = $lyric.eq(i)
                    break
                }
            }
            if($whichlyric){
                $whichlyric.addClass('active').prev().removeClass('active')
                let top = $whichlyric.offset().top
                let lyricTop = $('.lyric-wrapper').offset().top
                let delta = top - lyricTop - $('.lyric').height()/3
                $('.lyric-wrapper').css('transform',`translateY(-${delta}px)`)
            }
        },500)
    }
    function pad(number){
        return number > 10 ? number + '' : '0' + number
    }
    function initText(cover,name,artist,lyric){
        $('.cover')[0].src = cover
        $('.song-description>h1')[0].innerText = name + '-' + artist
        parseLyric(lyric)
    }
    function parseLyric (lyric){
        let array = lyric.split('\n')    
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