const { clients } = require("./data/clients.js");
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 5900;

const { Novu, PushProviderIdEnum } = require("@novu/node");
const novu = new Novu("a3d3720dbc0baf16c8275a461af103eb");

//Socket.io
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let eventList = [];

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on("newSchedule", (schedule) => {
    eventList.unshift(schedule);
    socket.emit("sendSchedules", eventList);
  });

  let interval = setInterval(function () {
    if (eventList.length > 0) {
      for (let i = 0; i < eventList.length; i++) {
        if (
          Number(eventList[i].date) === new Date().getDate().toLocaleString &&
          new Date().getSeconds() === 0
        ) {
          socket.emit("notification", {
            title: eventList[i].title,
            subject: eventList[i].subject,
            date: eventList[i].date,
            body: eventList[i].body,
          });
        }
      }
    }
  }, 1000);

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

app.get("/api", async (req, res) => {
  const subscriberId = "63c163a1d15f989449ecfeca";
  await novu.subscribers.identify(subscriberId, {
    firstName: "amanda",
    lastName: "torres",
  });
  await novu.subscribers.setCredentials(subscriberId, PushProviderIdEnum.FCM, {
    deviceTokens: [
      "ev4OWMLHUQR_ahDlF8wYAu:APA91bFJCQOHKQ_c3f51R5R8TyPvGu9udYOqdyqDm9mdEn3Md35UhpBMFO0VIlSYtA1fj1c8pzd9NStKO6nu0QZULdDRZm92e8zYhwFUb6Qlm9RfpD86UKJ4933yMSBeE5L-oltRFdG9",
    ],
  });
  const trigger = await novu.trigger("new-message", {
    to: {
      subscriberId: "63c163a1d15f989449ecfeca",
    },
    payload: {
      name: "Hello",
      customObject: {
        world: "World",
      },
    },
  });

  res.json(trigger.data);
});

app.get("/live", (req, res) => {
  res.json({
    message: "I'm alive",
  });
});

app.get("/notification", (req, res) => {
  //console.log(req)
  res.json(clients);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
