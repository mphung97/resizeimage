const express = require('express')
const Jimp = require('Jimp');
const app = express();
const port = 3000;

const url = 'https://images.unsplash.com/photo-1531161339673-a943dd10e29f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';

app.get('/', (req, res) => {
  formatImage(url)
    .then(
      data => {
        const result = Object.assign({}, { "image": data })
        res.json({ result })
      }
    )
    .catch(
      error => console.log("Faild to process image", error)
    );
})

async function formatImage(url) {
  const image = await Jimp.read(url);

  let x = y = 0;
  let w = image.bitmap.width;
  let h = image.bitmap.height;

  if (w > h) {
    x = w / 2 - h / 2;
    w = h;
  } else if (w < h) {
    y = h / 2 - w / 2;
    h = w;
  }

  const data = await image
    .crop(x, y, w, h)
    .resize(300, 300)
    .getBase64Async(Jimp.AUTO);

  return data;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));