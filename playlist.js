$(function () {
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)

    $.get(`//localhost:3000/playlist/detail?id=${id}`).then((res)=> {
        let content = res.playlist
        let $header = $(`
            <div class="plHeaderBg"  style="background-image: url(${content.coverImgUrl})"></div>
            <div class="plHeaderWrapper">
                <div class="coverWrapper">
                    <img src=${content.coverImgUrl} alt="">
                    <span>歌单</span>
                </div>
                <div class="plName">
                    <h2 class="plTitle">${content.name}</h2>
                    <div class="plCreator">
                        <img src=${content.creator.avatarUrl} alt="">
                        <span>${content.creator.nickname}</span>
                    </div>
                </div>
            </div>
        `)
        $('.plHeader').append($header)

        let tags = content.tags
        tags.forEach((t, index)=>{
            let $tags = $(`
                <li>${ t }</li>
            `)
            $('.tags').append($tags)
        })
        $('.plIntroduceText > p')[0].innerText = content.description
        let playlist = res.playlist.tracks
        playlist.forEach((p,index)=>{
            let $li = $(`
                <li>
                    
                    <div class="songNum">${index+1}</div>
                    <div class="songContent">
                        <div class="songContentWrapper">
                            <div class="songTitle">${p.name}</div>
                            <div class="singer">
                                <span class="singerName">${p.ar[0].name}</span> - <span class="songAlbum">${p.al.name}</span>
                            </div>
                        </div>
                        <a href="./song.html?id=${p.id}">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-play1"></use>
                            </svg>
                        </a>
                    </div>
                </li>
            `)
            $('.plSongs').append($li)
        })
    })
})
