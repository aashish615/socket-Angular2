var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// for filtering from jsondata (fetch by id or operator sign , find by age etc..so
var _=require('underscore') // by installing : npm install underscore --save

// This is for submission form  using body parser or multer by installing  :npm install body-parser multer --save
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.set('views', './templates') // specify the views directory
app.set('view engine', 'pug') // register the template engine

app.use(express.static(__dirname + '/templates')); // for static folder in which you can put all your subfolder and files


io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('add-message', (message, name) => {
    io.emit('message', {type:'new-message', text: message, name:name});
    console.log('user send', message, name);
  });
});

// for root folder which contains index.pug
    app.get('/', function (req, res) {
      var config=require('./templates/data/jsondata.json')
      //console.log(config);
      res.render('index', { title: 'Home', data:config})
    })

// for jsondata show on behalf of id and diffent operator using Underscore npm
    app.get('/show', function (req, res) {
      // var _=require('underscore')
      var config=require('./templates/data/jsondata.json')
      var user_id = req.param('id')
      var filtered = _.where(config, {_id:user_id});

      // for testing using more then two constraint where or filter use in underscore.js
      //         //var filtered=_.where(config,{_id:user_id});
      //       //var filtered =_.where(config, {age :24});
      //       //var filtered =_.where(config, {isActive :false,age :24});
       //
      //    var filtered =_.filter(config, function(item)
      //    {
      //      return item.age >= 30 && item.age <= 40;
      //      //return item.age === 20 || item.age === 24;
      //      //return item._id === user_id || item.age === 39;
      //      //return item.isActive ==false;
       //
      //   });
      //  filtered.sort(function(a,b) { return a.age - b.age });


      res.render('show', { title: 'Show', data:filtered})
    })



// for show About.pug page
    app.get('/about', function (req, res) {
      res.render('about', { title: 'About', message: 'Hello you are at About PAge!'})
    });

// for show Contact.pug page
    app.get('/contact', function (req, res) {
      res.render('contact', { title: 'Contact Us'})
    });

// for submiting form using post method using  bodyparser or multi parser
    app.post('/contact', upload.array(), function (req, res, next) {
    //  console.log(req.body
      var formData = req.body;
      console.log(formData);
      res.send("Name:" +req.body.name_ +"<br>"+"Email :" + req.body.email_ +"<br>"+"Website : "+ req.body.website_ +"<br>"+"Message :"+ req.body.message_);
      //res.json(req.body);

    });


// for show Services.pug page
    app.get('/services', function (req, res) {
      res.render('services', { title: 'Contact Us'})
    });


// for show Price.pug page
    app.get('/price', function (req, res) {
      res.render('price', { title: 'Prices'})
    });


// for show Modal.pug page
    app.get('/modal', function (req, res) {
      res.render('modal', { title: 'Contact Us'})
    });

// for tesing page not important
    app.get('/calculate', function (req, res) {
      res.render('calculate', { title: 'calculate'})
    });




    //Middleware function to log request protocol
    app.use('/things', function(req, res, next){
	   console.log("A request for things received at " + Date.now());
	   next();
   });

    app.get('/things/:name/:id([0-9]{5})', function(req, res){
        res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
    });





// for type wrong url
    app.get('*', function(req, res){
        res.send('Ooops Sorry, this is an invalid URL.');

    });

http.listen(9999, function () {
  console.log('Example app listening on port 9999!')
})
