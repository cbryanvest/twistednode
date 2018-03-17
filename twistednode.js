var express = require('express')
, app = express()
, fs = require('fs')
, html_header = 'header.html'
, html_footer = 'footer.html'
, contentpath = '/parts/'
, encoding = 'utf8'
, server_port = '4444'
, site_name = 'Twistednode'

app.use(express.static('static'))

console.log(__dirname+contentpath+html_header)

app.get('/', function (req, res) {
   console.log('connect')
   RenderHTML("content.html",encoding,res)
})

app.listen(server_port, function () {
  console.log(site_name+' started on port '+server_port);
});

function DynamicData(){

   return;
}

function RenderHTML(html_part,encoding,res){
   //Foreach the LoadHTMLArray Here compresses code
   console.log(html_part)
   fs.readFile(__dirname+contentpath+''+html_header,encoding,function(err,data){
      var send_page = data.replace(/:::sitename:::/g, site_name)
      console.log(send_page)
      res.write(send_page)
      fs.readFile(__dirname+contentpath+html_part,encoding,function(err,data){
         var send_page = data.replace(/:::sitename:::/g, site_name)
         console.log(send_page)
         res.write(send_page)
         fs.readFile(__dirname+contentpath+''+html_header,encoding,function(err,data){
            var send_page = data.replace(/:::sitename:::/g, site_name)
            console.log(send_page)
            res.write(send_page)
            res.end()
         })
      })
   })
   return;
}
