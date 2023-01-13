const { UID } = require('../util/UID.js');

const catID = (name) => {
    return UID(name).slice(-3);
};


const clientCategory = [
    {id: catID("Founder"), name: "Founder"},
    {id: catID("NonprofOrg"), name: "Nonprofit Organizations"},
    {id: catID("RisingNonprofOrg"), name: "Rising Nonprofit Organizations"},
]

exports.clientCategory = clientCategory;