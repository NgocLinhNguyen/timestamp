var express = require("express")
var strftime = require("strftime")
var path = require("path")
var app = express()

app.get('/:time', function (req, res) {
    var time = req.params.time
    var result
    if ((/^\d{8}\d*$/).test(time)) {
        var date = (strftime("%B %d, %Y", new Date(time * 1000)))
        result = {
            unix: time,
            natural: date
        }
    } else {
        var date = new Date(time)
        if (date !== "Invalid Date" && !isNaN(date)) {
            result = {
                unix: Date.parse(date)/1000,
                natural: strftime("%B %d, %Y", date)
            }
        } else {
            result = {
                unix: null,
                natural: null
            }
        }
    }
    res.json(result)
})
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening on port 8080!')
})