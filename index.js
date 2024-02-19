const express = require('express');
const path = require('path');
const app = express();
const handlebars = require('express-handlebars');
const routes = require('./routes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./scr/middleware/authMiddleware');



app.use(express.static(path.resolve("scr/static")))

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(auth)



app.engine("hbs", handlebars.engine({
    extname: "hbs"
}))

app.set('view engine', "hbs");
app.set('views', path.resolve('scr/views'));


app.use(routes)
const port = 3000


mongoose.connect(`mongodb://localhost:27017/exam`)

    .then(() => {
        console.log("dp is connected")
        app.listen(port, () => console.log(`Server has been sucsessfully lauched on port ${port}`))
    }


    ).catch(err => console.log("db error: " + err));
