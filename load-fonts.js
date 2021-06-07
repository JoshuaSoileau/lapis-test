import fonts from "./fonts.json";

const FontFaceObserver = require("fontfaceobserver");

const { others, ...baseFonts } = fonts;

const LoadFont = (font) =>
  new Promise((resolve, reject) => {
    if (!font) resolve();

    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css?family=${font.name.replace(
      /\s+/g,
      "+"
    )}:wght@${font.weights.join()}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const roboto = new FontFaceObserver(font.name, {});
    roboto
      .load()
      .then(() => {
        document.documentElement.classList.add(font.title || font.name);
        resolve();
      })
      .catch(reject);
  });

const LoadFonts = () => Promise.all([...fonts.map(LoadFont)]);

export default LoadFonts;
