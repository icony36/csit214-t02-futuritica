require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/authRoutes");
const staffRoutes = require("./routes/staffRoutes");
const studentRoutes = require("./routes/studentRoutes");
const commonRoutes = require("./routes/commonRoutes");
const {loginRequired, ensureCorrectRole} = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


// routes
app.get('/', (req, res) => {
    res.send({hello: 'there!'});
})

app.use("/api/auth", authRoutes);
app.use("/api/staff", 
    loginRequired, 
    ensureCorrectRole("staff"),
    staffRoutes
);
app.use("/api/student",     
    loginRequired,
    ensureCorrectRole("student"),
    studentRoutes
);
app.use("/api/common", 
    // loginRequired,
    commonRoutes
);

app.use((req, res, next) => {
    let err = new Error("Page Not Found!");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});