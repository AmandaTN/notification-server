const { clientCategory } = require("./clientsCategories.js");
const { UID } = require("../util/UID.js");


const clients = [
  {
    id: UID("Joseph Travis"),
    name: "Joseph Travis",
    category: { id: clientCategory[0].id, name: clientCategory[0].name },
  },
  {
    id: UID("Jenna Scott"),
    name: "Jenna Scott",
    category: { id: clientCategory[1].id, name: clientCategory[1].name },
  },
];

exports.clients = clients;
