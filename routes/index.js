const express = require("express");
const router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");

let checkSubscriberCount = async channelUrl => {
  let response = await request(channelUrl);

  let $ = cheerio.load(response);

  let subscribersCount = $(
    '[class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"]'
  ).attr("title");

  return subscribersCount;
};
/* GET home page. */
router.get("/", function(req, res, next) {
  let subscriberCount = 0;
  (async () => {
    let youtubeChannelUrl =
      "https://www.youtube.com/channel/UChy8R5gSDhOR4K0n84kjq2A?view_as=subscriber";

    subscriberCount = await checkSubscriberCount(youtubeChannelUrl);
    res.render("index", { title: "Express", count: subscriberCount });
  })();
});

module.exports = router;
