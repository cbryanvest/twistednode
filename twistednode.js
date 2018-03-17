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

function DynamicData(send_content){
   var send_content = send_content.replace(/:::sitename:::/g, site_name)
       send_content = send_content.replace(/:::anothervar:::/g, "This is Another Variable Test")
       send_content = send_content.replace(/:::servertime:::/g,new Date())
   return send_content;
}

function RenderHTML(html_part,encoding,res){
   console.log(html_part)
   fs.readFile(__dirname+contentpath+''+html_header,encoding,function(err,data){
      var send_header = data.replace(/:::sitename:::/g, site_name)
      console.log(send_header)
      res.write(send_header)
      fs.readFile(__dirname+contentpath+html_part,encoding,function(err,data){
         send_content = DynamicData(data)
         console.log(send_content)
         res.write(send_content)
         fs.readFile(__dirname+contentpath+''+html_footer,encoding,function(err,data){
            var send_footer = data.replace(/:::sitename:::/g, site_name)
            console.log(send_footer)
            res.write(send_footer)
            res.end()
         })
      })
   })
   return;
}
