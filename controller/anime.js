const axios = require("axios");
const cheerio = require("cheerio");
const { Anime, Overview } = require("../models/Anime");

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

        let imageUrl =
          "https://4anime.to" + $(".cover").children().last().attr("src");

        let animeEpisodes = [];

        $(".episodes")
          .children()
          .each((_, elm) => {
            let idIndex = $(elm).find("a").attr("href").indexOf("=") + 1;
            let episodeData = {
              id: parseInt($(elm).find("a").attr("href").substring(idIndex)),
              episode: parseInt($(elm).text()),
              url: $(elm).find("a").attr("href"),
            };

            animeEpisodes.push(episodeData);
          });

        let anime = new Anime(animeName, imageUrl, animeURL, animeEpisodes);
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

  recentReleases() {
    const url = "https://4anime.to/recently-added";
    const animes = [];
    return axios
      .get(url)
      .then((res) => {
        const $ = cheerio.load(res.data);
        $("#headerDIV_4").each((i, elm) => {
          if (i < 10) {
            const newAnime = new Overview(
              $(elm).find("#headerA_7").text(),
              $(elm).find("img").attr("src"),
              $(elm).find("#headerA_5").attr("href"),
              $(elm).find("#headerA_8").text()
            );
            animes.push(newAnime);
          }
        });
        return animes;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  popularThisWeek() {
    const url = "https://4anime.to/popular-this-week";
    const animes = [];
    return axios
      .get(url)
      .then((res) => {
        const $ = cheerio.load(res.data);
        $("#headerDIV_4").each((i, elm) => {
          if (i < 10) {
            const newAnime = new Overview(
              $(elm).find("#headerA_7").text(),
              $(elm).find("img").attr("src"),
              $(elm).find("#headerA_5").attr("href"),
              $(elm).find("#headerA_8").text()
            );
            animes.push(newAnime);
          }
        });
        return animes;
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
