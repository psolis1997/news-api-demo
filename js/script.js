const url = "https://gnews.io/api/v4/";

// Get Inputs:
const countrySelect = document.getElementById("countrySelect");
const topicSelect = document.getElementById("topicSelect");
const languageSelect = document.getElementById("languageSelect")
const searchBtn = document.getElementById("searchSubmit");
const searchInput = document.getElementById("searchInput");


// API Token Call
$.ajax({
    type: "GET",
    url: "./js/config.json",

    success: function (response) {
        token = response.token;
        mainFunction(token);
    }
})

// Get Top Headlines
function mainFunction(myKey) {

    const key = myKey;

    getNews("en", "breaking-news");

    $("#searchSubmit").click(function () {
        console.log('search');
        searchNews(searchInput.value);
    });

    $("#countrySelect").change(function () {
        filtered(countrySelect.value, topicSelect.value, languageSelect.value);
    })

    $("#topicSelect").change(function () {
        filtered(countrySelect.value, topicSelect.value, languageSelect.value);
    })

    $("#languageSelect").change(function () {
        filtered(countrySelect.value, topicSelect.value, languageSelect.value);
    })

    function filtered() {
        getNews(countrySelect.value, topicSelect.value, languageSelect.value)
    }

    function getNews(country, topic, language) {
        $.ajax({
            url: `${url}top-headlines?category=${topic}&lang=${language}&country=${country}&apikey=${key}`,
            type: "GET",
            data: "json",
    
            success: function (newsData) {
                let results = document.getElementById("results");
                results.innerHTML = "";
                let i = 0;
                for (i = 0; i < newsData.articles.length; i++) {
                    let story = newsData.articles[i];
                    // console.log(story); Logs out each story
    
                    results.innerHTML += `
                    <div class="col-lg-4 col-md-6 col-sm-1">
                        <div class="card" mt-3>
                            <img src="${story.image}" class="card-img-top" alt="news image"> 
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${story.title}</h5> 
                                <p class="card-text fw-light">${story.description}
                                <br><br>Source:
                                <a class="text-primary" href="${story.source.url}" target="_blank">${story.source.name}</a>
                                <br><br>
                                <a class="text-danger" href="${story.url}" target="_blank"> View full article </a></p> 
                            </div>
                        </div>
                    </div>
                    `;
                }
            },

            error: function() {
                console.log("Error - Could not get news");
            }
        })
    }

    function searchNews(search) {
        $.ajax({
            url: `${url}/search?q=${search}&lang=en&apikey=${key}`,
            type: "GET",
            data: "json",

            success: function (newsData) {
                let results = document.getElementById("results");
                results.innerHTML = "";
                for (let i = 0; i < newsData.articles.length; i++) {
                    let story = newsData.articles[i];

                    results.innerHTML += `
                    <div class="col-lg-4 col-md-6 col-sm-1">
                        <div class="card" mt-3>
                            <img src="${story.image}" class="card-img-top" alt="news image"> 
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${story.title}</h5> 
                                <p class="card-text fw-light">${story.description}
                                <br><br>Source:
                                <a class="text-primary" href="${story.source.url}" target="_blank">${story.source.name}</a>
                                <br><br>
                                <a class="text-danger" href="${story.url}" target="_blank"> View full article </a></p> 
                            </div>
                        </div>
                    </div>
                    `;
                }
            },
            error: function () {
                console.log("Could not do search");
            }
        })
    }
}