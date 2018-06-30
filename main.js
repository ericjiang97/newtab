const CONFIG = {
    LOCATION: "MELBOURNE",
    NAME: "ERIC"
}   

const links = {
    fb: { title: "facebook", url: "https://facebook.com" },
    tw: { title: "twitter", url: "https://twitter.com" },
    gh: { title: "github", url: "https://github.com" },
    bb: { title: "bitbucket", url: "https://bitbucket.org" },
    gl: { title: "gitlab", url: "https://gitlab.com" },
    tr: { title: "trello", url: "https://trello.com" },
    md: { title: "mozilla docs", url: "https://developer.mozilla.org/en-US/" },
    tv: { title: "twitch", url: "https://twitch.tv" },
    yt: { title: "youtube", url: "https://youtube.com" },
    gm: { title: "gmail", url: "https://gmail.com" },
    gd: { title: "google drive", url: "https://drive.google.com" },
    hn: { title: "hackernews", url: "https://hckrnews.com" },
    d2: { title: "r/dota2", url: "https://dota2.reddit.com" },
    yh: { title: "r/youtubehaiku", url: "https://youtubehaiku.reddit.com" },
    rd: { title: "reddit", url: "https://reddit.com" },
    sc: { title: "scrungus.club", url: "http://scrungus.club" },
    nm: { title: "nice meme!", url: "https://niceme.me" }
  };


/**
 * DO NOT MODIFY BELOW THIS LINE
 */
const LOCATIONS = {
    SYDNEY: {
        BOM: {
            OBSERVATORY: "IDN60901",
            DATASET: "IDN60901.94768"
        }
    },
    MELBOURNE: {
        BOM: {
            OBSERVATORY: "IDV60901",
            DATASET: "IDV60901.95936"
        }

    }
}

const GREETINGS = [
    "HELLO",
    "BONJOUR",
    "CIAO",
    "OLA",
    "HALO",
    "NI HAO",
    `<i class="em em-wave"></i>`
]

chrome.history.search({text: '', maxResults: 4}, function(data) {
    data.forEach((page) => {
        const { url, lastVisitTime, title } = page
        const dateTime  = moment(lastVisitTime).format('MMMM Do YYYY, h:mm:ss a')
        document.getElementById('browserHistory').insertAdjacentHTML('beforeend', `
        <div class="col s12 m3">
        <div class="card grey darken-1 custom-card">
        <div class="card-content white-text">
          <span class="card-title">${title}</span>
          <span><b>Last Visited:</b> ${dateTime}</span>
        </div>
        <div class="card-action">
          <a href="${url}">Click Me</a>
        </div>
      </div>
    </div>`);
        // console.log(url, title, dateTime)
    });
});

const LOCATION = CONFIG.LOCATION
const WEATHER_CONFIG = LOCATIONS[LOCATION]
console.log(WEATHER_CONFIG)
const { BOM } = WEATHER_CONFIG
const { OBSERVATORY, DATASET } = BOM

fetch(`http://reg.bom.gov.au/fwo/${OBSERVATORY}/${DATASET}.json`)
    .then(resp => resp.json())
    .then(resp => {
        const { observations } = resp
        const { data } = observations
        const recentTemp = data[0]
        const { name, local_date_time, air_temp, apparent_t } = recentTemp
        const dateTime = local_date_time.split('/')[1]
        document.getElementById('temp').insertAdjacentHTML('beforeend', `${air_temp} &#8451;`)
        document.getElementById('feel_temp').insertAdjacentHTML('beforeend', `${apparent_t} &#8451;`)
        document.getElementById('loc').insertAdjacentHTML('beforeend', `${name}`)
        document.getElementById('updated').insertAdjacentHTML('beforeend', `Last Updated: ${dateTime}`)
        console.log(dateTime, recentTemp)
    })


fetch(`http://dev.virtualearth.net/REST/v1/Locations?q=${LOCATION}, Australia&key=AhDfHGIS81zTLXRpH7HzBDd006JKX4YJw4kF_VeTpmW6quBHyACHshGOOsUZbIOO`)
    .then(resp => resp.json())
    .then(resp => {
        const { resourceSets } = resp
        const { resources } = resourceSets[0]
        const { point } = resources[0]
        const coords = point.coordinates
        // console.log(coords)
        fetch(`https://api.darksky.net/forecast/ba5c875dbc651564d66027d0c05f579c/${coords[0]},${coords[1]}`)
            .then(resp => resp.json())
            .then(resp => {
                const { currently } = resp
                document.getElementById('summary').insertAdjacentHTML('beforeend', `${currently.summary}`)
            })
    })
    var GREETING = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    console.log(GREETING)
    document.getElementById('hello').insertAdjacentHTML('beforeend', `${GREETING}, ${CONFIG.NAME}`)


 
      
    let search = document.getElementById('search')
    let items = document.getElementById('items')
    
    search.focus()
    
    search.addEventListener('input', ({ target: { value } }) => {
      console.log(value)
      if (links[value]) window.location = links[value].url
    })
    
    search.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode === 8) search.value = ''
      if (keyCode == 13) window.location = `https://www.google.com.au/search?&q=${search.value}&source=web`
    })

    Object.keys(links).forEach(key => {
        const { title, url } = links[key]
        console.log(links[key])
        document.getElementById('items').insertAdjacentHTML('beforeend', `
           <div> <a href="${url}">${key} : ${title}</a></div>
        `)
    })