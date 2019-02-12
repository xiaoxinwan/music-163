$(function() {
    $.get('//localhost:3000/personalized?limit=6').then(function(response) {
        //response 可能是字符串

        let items = response.result
        items.forEach((i) => {
            let $li = $(`
                <li>
                    <a href="./playlist.html?id=${i.id}">
                        <img src=${i.picUrl} alt="">
                        <p>${i.name}</p>
                    </a>
                </li>
            `)
            $('#recomSongList').append($li)
        })
        // items.forEach((i) => {
        //
        //
        // })
        $('#latestMusicLoading').remove()
    });
    $.get('//localhost:3000/personalized/newsong').then(function (response) {
        let items = response.result
        items.forEach((i) => {
            let $li = $(`
             <li>
                 <a href="./song.html?id=${i.id}">
                     <div class="song">
                         <div class="songtitle">${i.song.name}</div>
                         <div class="artist">${i.song.artists[0].name}-${i.song.album.name}</div>
                     </div>
                     <span>
                        <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-play1"></use>
                     </svg>
                     </span>
                 </a>
             </li>
            `)
            $('#latestMusic').append($li)
        })
    })
    $.get('//localhost:3000/top/list?idx=1').then(function(response) {
        let items = response.playlist.tracks

        let arr = items.splice(0,10)
        arr.forEach((i,index) => {
            let $li = $(`
                <li>
                    <a class="song" href="./song.html?id=${i.id}">
                        <span class="serialNum">${index+1}</span>
                        <div class="song-wrapper">
                            <div class="songInfo">
                                <span class="name">${i.name}</span>
                                <span class="artist">${i.ar[0].name}</span>
                            </div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-play1"></use>
                            </svg>
                        </div>
                    </a>
                </li>
            `)
            $('#hotmusicPlaylist').append($li)
        })
    })

    $('.siteNav').on('click', 'ol.tabItems>li', function(e) {
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index() //返回索引值，知道是哪一个
        $('.tabContent > li').eq(index).addClass('active')
            .siblings().removeClass('active')
    })

    $.get('//localhost:3000/search/hot').then(function (res) {
        let hots = res.result.hots
        hots.forEach((i) => {
            let $li = $(`
                <li>${i.first}</li>
            `)
            $('#hotSearchList').append($li)
        })
    })

    let func = debounce(function(e) {
        $('label.searchInner').text('')
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if (value === '') {
            $('.hotSearch').css('display','block')
            $('.searchSuggest').css('display','none')
            $('.searchSuggest').empty()
        }
        if (value) {
            $('.hotSearch').css('display','none')
            $.get(`//localhost:3000/search/suggest?keywords= ${value}`).then((res) => {
                let result = res.result.songs
                console.log(result)
                if (result.length !== 0) {
                    $('.searchSuggest').css('display','block')
                    let $h3 = $(`
                        <h3>搜索 "${value}"</h3>
                        <ul id="searchSuggestList"></ul>
                    `)
                    $('.searchSuggest').append($h3)
                    result.forEach((i) => {
                        let $li = $(`
                            <li>
                                <svg class="searchIcon" aria-hidden="true">
                                    <use xlink:href="#icon-search"></use>
                                </svg>
                                <span>
                                    <a href="./song.html?id=${i.id}">${i.name}</a>
                                </span>
                            </li>
                        `)
                        $('#searchSuggestList').append($li)
                    })
                } else {
                    $('.searchSuggest').text('无结果')
                }
            })
        }

        // }, 400)
    }, 500)
    $('input#searchSong').on('input', func)

    function debounce (fn, delayTime) {
        let timer
        return function () {
            clearTimeout(timer)
            let context = this
            let args = arguments
            timer = setTimeout(()=>{
                fn.apply(context,args)
            },delayTime)
        }
    }
    window.debounce = debounce
    // })
    //
    // function search(keyword) {
    //     console.log('搜索' + keyword);
    //     return new Promise((resolve, reject) => {
    //         var database = [
    //             { "id": "1", "name": "岁月神偷" },
    //             { "id": "2", "name": "追梦赤子心" },
    //             { "id": "3", "name": "美丽之最" },
    //             { "id": "4", "name": "花樽与花" }
    //         ]
    //         let result = database.filter(function(item) {
    //             return item.name.indexOf(keyword) >= 0
    //         })
    //         setTimeout(function() {
    //             console.log('搜到' + keyword + '的结果')
    //             resolve(result)
    //         }, (Math.random() * 500 + 500))
    //     })
    // }
    //
    // window.search = search
})
