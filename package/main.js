const axios = require("axios");
const cheerio = require("cheerio");
const { Anime, Overview } = require("./anime");

class Scraper {
  handleName(animeName) {
    return animeName.replace(/ /g, "+");
  }
  getAnimeSearchURL(animeName) {
    let searchURLS = [];
    return axios
      .get("https://4anime.to/?s=" + this.handleName(animeName))
      .then((res) => {
        const $ = cheerio.load(res.data);
        $(".container #headerDIV_95").each((_, elm) => {
          searchURLS.push($(elm).find("a").attr("href"));
        });
        return searchURLS;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getAnimeFromURL(animeURL) {
    return axios
      .get(animeURL)
      .then((res) => {
        const $ = cheerio.load(res.data);
        let animeName = $(".single-anime-desktop").text();
        let animeGenres = [];
        $(".list")
          .children()
          .each((i, elm) => {
            let rawGenres = $(elm).text().split("\n");
            if (rawGenres[0] != "") {
              animeGenres.push(rawGenres[0]);
            }
          });
        let panelData = animeGenres.pop(animeGenres.length - 1);
        panelData = panelData.split("   ");
        if (panelData[0] == "  Bookmark") {
          panelData.shift();
        }
        if (panelData[0] == "Change color of watched") {
          panelData.shift();
        }
        panelData[0] = panelData[0].split(" Type "); //type
        panelData[1] = panelData[1].split("Studio "); //studio
        panelData[2] = panelData[2].split("Release Date (JP) "); //release date
        panelData[3] = panelData[3].split("Status "); //status
        panelData[4] = panelData[4].split("Language "); //language

        if (panelData[1][1] == "") {
          panelData[1][1] = "Studio ";
        }
        panelData[4][1] = panelData[4][1].replace("  ", "");
        for (let elm of panelData) {
          elm.shift();
        }
        let animeDes = $("#description-mob").children().last().text();
        let imageUrl =
          "https://4anime.to" + $(".cover").children().last().attr("src");

        //Get anime episodes
        let animeEpisodes = [];

        $(".episodes")
          .children()
          .each((i, elm) => {
            let idIndex = $(elm).find("a").attr("href").indexOf("=") + 1;
            let episodeData = {
              id: parseInt($(elm).find("a").attr("href").substring(idIndex)),
              episode: parseInt($(elm).text()),
              url: $(elm).find("a").attr("href"),
            };

            animeEpisodes.push(episodeData);
          });

        let anime = new Anime(
          animeName,
          animeGenres,
          animeDes,
          imageUrl,
          panelData[0].join(),
          panelData[1].join().replace(",", ""),
          panelData[2].join(),
          panelData[3].join(),
          panelData[4].join(),
          animeURL,
          animeEpisodes
        );
        return anime;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getVideoLinkFromUrl(episodeUrl) {
    return axios
      .get(episodeUrl)
      .then(async (res) => {
        const $ = cheerio.load(res.data);
        return $("source").attr("src");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getAnimeFromSearch(animeSearch) {
    return this.getAnimeSearchURL(animeSearch)
      .then(async (res) => {
        var animeFromSearch = [];
        for (let searchResult of res) {
          await this.getAnimeFromURL(searchResult)
            .then((data) => {
              animeFromSearch.push(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        return animeFromSearch;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  frontPage() {
    const url = "https://4anime.to";
    const urls = [];
    return axios
      .get(url)
      .then((res) => {
        const $ = cheerio.load(res.data);
        $("#headerDIV_4").each((i, elm) => {
          urls.push($(elm).find("a").attr("href"));
          // urls.push(this.getAnimeFromURL($(elm).find("a").attr("href")));
        });
        return urls;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  cleanUpLink(url) {
    return url.substring(url.lastIndexOf("http"), url.lastIndexOf("\\"));
  }
}
let scraper = new Scraper();
module.exports = {
  default: scraper,
};
