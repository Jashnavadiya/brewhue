const admin = require("firebase-admin");
require("dotenv").config();

const { firebaseAdminConfig } = require("./../constant/configFireBase");



admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    

});
// console.log("Bucket Name: ", admin.app().options.storageB/ucket);


module.exports = { admin };
