var express = require('express');
var router = express.Router();
var config = require('../config');

// do some checking here => check the default user profile
// ternary statement => MDN ternary
var toRender = (config.kidsmode) ? 'main_kids' : 'home';

/* GET page */
router.get('/', function(req, res, next) {
  res.render(toRender, {
    title: 'Done yet?',
    message : "handlebars is awesome",
    parents : true, //true because on the mainpge
    kids : false, //false becuase not on this page
    home : false, //false becuase not on this page
    prentsmode : config.parentsmode
  });
});

//route for the video
router.get('videos/:video', function(res, req){
  connect.query('SELECT * FROM tbl_videos')
  res.render('video', {movie : data});
})



//route for kids page to false
router.get('/parents', (req, res) => {
  console.log('hit the parents route');
  res.render('parents', { //parents is the name of the handlebars file linking to in this case
    parents : true, //true because on this page
    kids : false //false because not on page anymore
    home : false //false because not on page anymore
  });
});

//GET the parents page images
router.get('/', (req, res) => {
  connect.query('SELECT * videos_id FROM tbl_videos', (err, result) =>{
    if (err) {
      throw err; console.log(err);
    }else{
      console.log(result);
      res.render('videos', {
        title : 'Parents Videos',
        videoDecade: "videos_decade",
        message : "here are the parents videos",
        kidVid = result
      });
    }
  });
});

// parents page movie reccomendations
router.get('/:id', (req, res) => {
  connect.query(`SELECT * FROM tbl_videos WHERE videos_type="movrec" AND id="${req.params.id}"`, (err, result) => {
    if(err){
      throw err; console.log(err);
    }else{
      console.log(result[0]);
      res.render('videoMov', { //oneVid
        videoTitle : 'Parents Movie Reccomendations', //title : 'Parents Movie Reccomendations',
        //message: "parents reccomended movies",
        videoDecade: "videos_decade", //  videoDecade: "Video Decade",
        videoDetails: "Video Description",
        parents: true,
        home : false,
        kids: false,
        videoMov : result[0] //videoMov is name use in handlebars file to connect
      });
    }
  });
});
//GET the parents page tv reccomendations
router.get('/:id', (req, res) => {
  connect.query(`SELECT * FROM tbl_videos WHERE videos_type="tvrec" AND id="${req.params.id}"`, (err, result) => {
    if(err){
      throw err; console.log(err);
    }else{
      console.log(result[0]);
      res.render('videoTv', { //oneVid
        title : 'Parents Tv Reccomendations', //title : 'Parents Tv Reccomendations',
        videoTitle : 'videos_title',
        videoDecade: "videos_decade",
        //  message: "parents reccomended tv shows",
        parents: true,
        home : false,
        kids: false,
        videoTv : result[0] //videoTv is name use in handlebars file to connect
      });
    }
  });
});

//NEW
//Adding Vue Attempt to get Videos info Showing on parents tv section

const vm = new Vue({
  el : "#parentTvRec", //el meants element, this is an object so the syntax will be a bit different

  data : {
  hasVue : false, //if you make this true, then the message with this id in the html will show
  targetUrl: "http:vuejs.org",
  anchorOff : true,
  tvVideoFiltering : [ //creating an array of objects, tvVideoFiltering with videoTitle, videoDecade, videoDetails
    {videoTitle: "title of video"},
    {videoDecade: "decade of video"},
    {videoDetails: "description of video"}
  ]
},

 methods : {
  logtvVideoFiltering(e){ //e in vue, allows us to see what object want to look at, when click on it in browser, shows it in console, shows that line of code
    console.log(e.currentTarget);
  }
}
});

//NEW
//Adding Vue Attempt to get Videos info Showing on parents movie section
const vm = new Vue({
  el : "#parentMovRec", //el meants element, this is an object so the syntax will be a bit different

  data : {
  hasVue : false, //if you make this true, then the message with this id in the html will show
  targetUrl: "http:vuejs.org",
  anchorOff : true,
  movVideoFiltering : [ //creating an array of objects, movVideoFiltering with videoTitle, videoDecade, videoDetails
    {videoTitle: "title of video"},
    {videoDecade: "decade of video"},
    {videoDetails: "description of video"}
  ]
},

 methods : {
  logmovVideoFiltering(e){ //e in vue, allows us to see what object want to look at, when click on it in browser, shows it in console, shows that line of code
    console.log(e.currentTarget);
  }
}
});

module.exports = router;
