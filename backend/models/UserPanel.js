const mongoose = require('mongoose');

const UserPanelSchema = new mongoose.Schema({
  home: {
    logo: String,
    darkLogo: String,
    section1Img: String,
    section1Text: String,
    section2Heading: String,
    section2Info: [{
      img: String,
      text: String
    }],
    section3Heading: String,
    section3Img: [{
      img: String
    }],
    section4Heading: String,
    section4Pdf: String,
    section5Heading: String,
    section5Comments: [{
      logo_name: String,
      name: String,
      review: String,
      date: String
    }],
    section6: {
      time_period: String,
      time_open: String,
      time_close: String,
      address: String,
      number: [String]
    }
  },
  social: {
    insta:[],
    facebook: [],
    twitter: [],
    pinterest: [],
    linkedin: [],
    yt: [],
  }
});

const UserPanel = mongoose.model('UserPanel', UserPanelSchema);

module.exports = UserPanel;
