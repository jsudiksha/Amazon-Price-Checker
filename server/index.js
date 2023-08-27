const express = require("express");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const puppeteer = require("puppeteer");

const app = express();
const port = 8000;

async function scrapeData(url, minPrice, userEmail) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let [el] = await page.$x('//*[@id="priceblock_ourprice"]');
    let txt = await el.getProperty("textContent");
    let rawtxt = await txt.jsonValue();
    let price = await rawtxt.replace("₹", "");
    await minPrice.replace("₹", "");
    console.log(price);
    console.log(minPrice);

    if (parseFloat(price) < parseFloat(minPrice)) {
      await sendMail(
        "Amazon product now affordable",
        `The price on ${url} has dropped below ${minPrice}`,
        userEmail
      );
      console.log("mail sent");
    }
    browser.close();
  } catch (e) {
    await sendMail("Amazon Price Checker Error", e.message, userEmail);
    console.log("error");
    throw e;
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.get("/", (req, res) => {
//   res.json({ message: "API Working" });
// });
app.get("/", (req, res) => {
  res.send("server is working");
});

app.post("/", (request, response) => {
  let Url = request.body.url;
  let minPrice = request.body.minPrice;
  let userEmail=request.body.email;
  scrapeData(Url, minPrice,userEmail);
  console.log("scraping in process");
  console.log(Url);
  console.log(minPrice);
  console.log(userEmail);
});
function sendMail(subject, body, userEmail) {
  const email = {
    to: userEmail,
    from: "amazonextensionproject@gmail.com",
    subject: subject,
    text: body,
    html: body,
  };

  return sgMail
    .send(email)
    .then(() => {
      console.log("Message sent");
    })
    .catch((error) => {
      console.log(error.response.body);
      // console.log(error.response.body.errors[0].message)
    });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
