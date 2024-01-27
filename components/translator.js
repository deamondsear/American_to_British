const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  americanToBritishTranslate(string) {
    const replaceWithHighlight = (key, value) => {
      const regex = new RegExp(`\\b${key}(?=[\\.\\s\\,\\!\\?])`, "gi");
      const timeRegex = new RegExp(/\b(\d{1,2}):(\d{2})\b/g);
      return string
        .replace(regex, `<span class="highlight">${value}</span>`)
        .replace(timeRegex, `<span class="highlight">${"$1"}.${"$2"}</span>`);
    };

    for (let key in americanOnly) {
      string = replaceWithHighlight(key, americanOnly[key]);
    }
    for (let key in americanToBritishSpelling) {
      string = replaceWithHighlight(key, americanToBritishSpelling[key]);
    }
    for (let key in americanToBritishTitles) {
      string = replaceWithHighlight(key, americanToBritishTitles[key]);
    }
    return string;
  }

  britishToAmericanTranslate(string) {
    const replaceWithHighlight = (key, value) => {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      const timeRegex = new RegExp(/\b(\d{1,2})\.(\d{2})\b/g);
      return string
        .replace(regex, `<span class="highlight">${value}</span>`)
        .replace(timeRegex, `<span class="highlight">${"$1"}:${"$2"}</span>`);
    };
    for (let key in britishOnly) {
      string = replaceWithHighlight(key, britishOnly[key]);
    }
    for (let key in americanToBritishSpelling) {
      string = replaceWithHighlight(americanToBritishSpelling[key], key);
    }
    for (let key in americanToBritishTitles) {
      string = replaceWithHighlight(americanToBritishTitles[key], key);
    }
    return string;
  }
}

module.exports = Translator;
