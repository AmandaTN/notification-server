const express = require("express");
const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS library
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});