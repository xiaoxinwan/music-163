$(function() {
    $.get('./songs.json').then(function(response) {
        //response 可能是字符串
        let items = response
        items.forEach((i) => {
            let $li = $(`
            <li>
                <a href="./song.html?id=${i.id}">
                    <div class="song">
                        <div class="songtitle">${i.name}</div>
                        <div class="artist">${i.artist}-专辑1</div>
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
                // $('#hotmusicPlaylist').append($li)
        })
        $('#latestMusicLoading').remove()
    });

    $.get('./songs.json').then(function(response) {
        let items = response
        items.forEach((i) => {
            
            
            let $li = $(`
            <li>
            <a class="song" href="./song.html?id=${i.id}">
                <span class="serialNum"></span>
                <div class="song-wrapper">
                    <div class="songInfo">
                        <span class="name">${i.name}</span>
                        <span class="artist">${i.artist}</span>
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

    let timer = undefined
    $('input#searchSong').on('input', function(e) {
        $('label.searchInner').text('')
        $('#output').addClass('active')
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if (value === '') { return }
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            search(value).then((result) => {
                timer = undefined
                if (result.length !== 0) {
                    $('#output').text(result.map((r) => r.name).join(','))
                } else {
                    $('#output').text('无结果')
                }
            })
        }, 400)
    })

    function search(keyword) {
        console.log('搜索' + keyword);
        return new Promise((resolve, reject) => {
            var database = [
                { "id": "1", "name": "岁月神偷" },
                { "id": "2", "name": "追梦赤子心" },
                { "id": "3", "name": "美丽之最" },
                { "id": "4", "name": "花樽与花" }
            ]
            let result = database.filter(function(item) {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function() {
                console.log('搜到' + keyword + '的结果')
                resolve(result)
            }, (Math.random() * 500 + 500))
        })
    }

    window.search = search
})