const axios = require("axios");
const cheerio = require("cheerio");
const Manga = require("../models/Manga");
const Chapter = require("../models/Chapter");
const puppeteer = require("puppeteer");

class MangaScraper {
  handleName(mangaName) {
    return mangaName.replace(/ /g, "+");
  }
  getMangaSearchUrl(mangaName) {
    return axios
      .get(
        "https://mangadex.tv/search?type=titles&title=" +
          this.handleName(mangaName)
      )
      .then((res) => {
        const $ = cheerio.load(res.data);
        const mangas = [];
        $(".row .manga-entry").each((_, elm) => {
          const detail = $(elm).find("a").attr("href");

          const imgUrl = $(elm).find("div > a > img").attr("data-src");
          const name = $(elm).find("a").text();
          const newManga = new Manga(name, imgUrl, detail);
          mangas.push(newManga);
        });
        return mangas;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getMangaDetails(mangaUrl) {
    return axios
      .get(mangaUrl)
      .then((res) => {
        const $ = cheerio.load(res.data);
        const chapters = [];
        $(".chapter-container .no-gutters").each((_, elm) => {
          const url = $(elm).find("a").attr("href");
          const name = $(elm).find("a").text();
          const newChapter = new Chapter(name, url);
          chapters.push(newChapter);
        });
        return chapters;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getChapterImages(chapterUrl) {
    // try {
    //   const browser = await puppeteer.launch({ headless: true });
    //   const page = await browser.newPage();
    //   await page.goto(chapterUrl, { waitUntil: "load", timeout: 0 });
    //   const data = await page.content();
    //   browser.close();
    //   const images = [];
    //   const $ = cheerio.load(data);

    //   $(".reader-main img").each((_, elm) => {
    //     const imageUrl = $(elm).attr("src");
    //     images.push(imageUrl);
    //   });
    //   return images;
    // } catch (e) {
    //   console.log(e);
    // }
    return axios
      .get(chapterUrl)
      .then((res) => {
        const images = [];
        const $ = cheerio.load(res.data);

        $(".reader-main img").each((_, elm) => {
          const imageUrl = $(elm).attr("data-src");
          images.push(imageUrl);
        });
        return images;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

let scraper = new MangaScraper();

module.exports = scraper;
