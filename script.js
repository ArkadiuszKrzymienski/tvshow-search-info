window.onload = function() {
    showsApp.init();
}

let showsApp = {
    data: null,
    searchInput: null,
    showsDataSection: null,
    init: function() {
        this.searchInput = document.getElementById('search-input');
        this.searchInput.addEventListener('keyup', () => {
                this.loadData(this.searchInput.value)
        } )
        this.showsDataSection = document.querySelector('.series-section');
        this.loadData('friends')
    },

    loadData: function(str){
        fetch("https://api.tvmaze.com/search/shows?q=" + str.trim())
            .then(response => response.json())
            .then(data => this.dataReady(data))
    },

    dataReady: function(showData){
        this.data = showData;
        
        let allBoxesHtml = '';

        for(let i = 0; i< showData.length; i++){
            let show = showData[i];
            // console.log(showData)
            let score = show.score;
            show = show.show;
            let genres = show.genres.join(', ');
            let imgSrc = null;
            let imgSrcOriginal = null;
            if(show.image){
                imgSrc = show.image.medium;
                imgSrcOriginal = show.image.original;
            } else {
                imgSrc = '/errorimage.png';
                imgSrcOriginal = '/errorimage.png';
            }
            let showtitle = null;
            if(!show.name) continue;
            showtitle = show.name;

            let network = '-';
            if(show.network) network = show.network.name;

            let officialSite = '-';
            if(show.officialSite) officialSite = show.officialSite;
            let premiered = '-';
            if(show.premiered) premiered = show.premiered;

            let summary = show.summary;
            summary = `
             <p>Show: ${showtitle} <p> 
             <p>Date: ${premiered} <p> 
             <p>Network: ${network} <p> 
             <br>`
             + summary;

             allBoxesHtml += this.getShowBoxByTemplate(imgSrc, showtitle, genres, summary)
        }
        console.log(this.showDataSection)
        this.showsDataSection.innerHTML = allBoxesHtml
    },

    getShowBoxByTemplate: function(imgSrc,title, genres,overview){
        return `
            <div class='showbox'>
                <img src="${imgSrc}" alt="">
                <div class="showtitle">${title}</div>
                <div class="show-genres">${genres}</div>
                <div class="show-overview">${overview}</div>
            </div>`
    }
}