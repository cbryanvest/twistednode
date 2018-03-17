var express = require('express')
, app = express()
, fs = require('fs')
, htmlheader = 'header.html'
, htmlfooter = 'footer.html'
, contentpath = '/parts/'
, encoding = 'utf8'
, serve_port = '4444'
, site_name = 'Twistednode'

var pageArray = ["main.html"]


app.use(express.static('static'))

console.log(__dirname+contentpath+htmlheader)

app.get('/', function (req, res) {
   console.log('connect')
   RenderHTML('main.html',encoding,res)
})


app.listen(serve_port, function () {
  console.log(site_name+' started on port '+serve_port);
});

function DynamicData(){

   return;
}

function RenderHTML(content,encoding,res){
   fs.readFile(__dirname+contentpath+htmlheader, encoding, function(err,data) {
      var send_header = data.replace(/:::sitename:::/g, site_name)
      res.write(send_header)
      fs.readFile(__dirname+contentpath+content, encoding, function(err,data){
         res.write(data)
         fs.readFile(__dirname+contentpath+htmlfooter, encoding, function(err,data){
            var send_footer = data.replace(/:::sitename:::/g, site_name)
            res.write(send_footer)
            res.end()
         })
      })
   })
}

function contains(a,obj){
   for (var i = 0; i < a.length; i++){
      if(a[i] == obj) {
         return true
      }
   }
   return false;
}