//IMPORT NODE MODULES
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var api = require("./api");
var routeMw = require("./middleware/routing.mw");
var cookieParser = require("cookie-parser");
//var configurePassport = require("./config/passport");
var prerender = require('prerender-node');
prerender.set('prerenderToken', process.env.PRERENDER_KEY);
var app = express();
var clientPath = path.join(__dirname, "../client");

app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(prerender);
//configurePassport(app);


app.use('/api', api);


app.get("*", function (req, res, next) {
    if (routeMw.isAsset(req.url)) {
        return next();
    } else { //console.log(res.send((path.join(clientPath,"index.html"))));

        res.sendFile(path.join(clientPath, "/index.html"));
    }
})


//LISTEN ON PORT 3000

app.listen(process.env.PORT || 3000);
