$(function() {

    $.get('/lyric.json').then(function(object) {
        // 从lyric.json中获取，通过regex分隔开时间和内容，
        // 遍历数组，得到一个新的对象{time: value, words: value}
        let { lyric } = object
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

    })
    let audio = document.createElement('audio')
    audio.src= "//pfn28omfk.bkt.clouddn.com/%E4%BB%8E%E6%97%A0%E5%88%B0%E6%9C%89.mp3"
    audio.oncanplay = function(){
        audio.play()
        $('.disc-container').addClass('playing')
    }
    $('.cover').on('click',function(){
        audio.pause()
        $('.disc-container').removeClass('playing')
    })
    $('.playButton').on('click',function(){
        audio.play()
        $('.disc-container').addClass('playing')
    })
})