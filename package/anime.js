class Anime {
  constructor(name, imageUrl, url, episodes) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.url = url;
    this.episodes = episodes;
  }
}

class Overview {
  constructor(animeName, imgUrl, videoUrl, extra) {
    this.animeName = animeName;
    this.imgUrl = imgUrl;
    this.videoUrl = videoUrl;
    this.extra = extra;
  }
}

module.exports = {
  Anime: Anime,
  Overview: Overview,
};
