$(function() {
    $.get('./songs.json').then(function(response) {
        //response 可能是字符串
        let items = response
        items.forEach((i) => {
            console.log(i.id)
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
        })
        $('#latestMusicLoading').remove()
    });
})


