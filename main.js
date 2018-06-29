

chrome.history.search({text: '', maxResults: 4}, function(data) {
    data.forEach((page) => {
        const { url, lastVisitTime, title } = page
        const dateTime  = moment(lastVisitTime).format('MMMM Do YYYY, h:mm:ss a')
        document.getElementById('browserHistory').insertAdjacentHTML('beforeend', `
        <div class="col s12 m3">
        <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${title}</span>
          <span><b>Last Visited:</b> ${dateTime}</span>
        </div>
        <div class="card-action">
          <a href="${url}">Click Me</a>
        </div>
      </div>
    </div>`);
        console.log(url, title, dateTime)
    });
});

fetch("http://reg.bom.gov.au/fwo/IDV60901/IDV60901.95936.json")
    .then(resp => resp.json())
    .then(data => console.log(data))