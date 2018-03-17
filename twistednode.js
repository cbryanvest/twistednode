var express = require('express')
, app = express()
, fs = require('fs')
, htmlheader = 'header.html'
, htmlfooter = 'footer.html'
, contentpath = '/parts/'
, encoding = 'utf8'
, serve_port = '4444'

app.use(express.static('static'))

console.log(__dirname+contentpath+htmlheader)

app.get('/', function (req, res) {
   console.log('connect')
   RenderHTML('main.html',encoding,res)
})


app.listen(serve_port, function () {
  console.log('Twistednode started on port '+serve_port);
});

function RenderHTML(content,encoding,res){
   fs.readFile(__dirname+contentpath+htmlheader, encoding, function(err,data) {
      res.write(data)
      fs.readFile(__dirname+contentpath+content, encoding, function(err,data){
         res.write(data)
         fs.readFile(__dirname+contentpath+htmlfooter, encoding, function(err,data){
            res.write(data)
            res.end()
         })
      })
   })
}