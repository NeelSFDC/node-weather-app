const express = require("express");
const path = require("path")
const hbs = require("hbs")
const util = require("./utils.js");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));
const SLDSpath = path.join(
  __dirname,
  "../node_modules/@salesforce-ux/design-system/assets"
);
// console.log(SLDSpath);
app.use('/slds',express.static(SLDSpath));

app.set('view engine','hbs')
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Junk Dev",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/weather", (req, res) =>{ 
  util.gc(req.query.search, (err, data) => {
    util.fc(data.longitude, data.latitude, data.location, (e, d) => {      
       res.send([
         {
           location: d.placename,
           temparature: d.temp,
           rainchance: d.rainchance,
         },
       ]);
    });
  });  
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
