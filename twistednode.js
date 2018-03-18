var express = require('express')
, app = express()
, fs = require('fs')
, html_header = 'header.html'
, html_footer = 'footer.html'
, contentpath = '/parts/'
, encoding = 'utf8'
, server_port = '4444'
, site_name = 'Twistednode'
, esclient = require('./esconnection.js')

app.use(express.static('static'))

console.log(__dirname+contentpath+html_header)

app.get('/', function (req, res) {
   console.log('connect')
   esclient.cluster.health({}, function(eserr,esresp,esstatus){
      console.log(esresp)
      RenderHTML("content.html",encoding,res,esresp)
   })
})

app.listen(server_port, function () {
  console.log(site_name+' started on port '+server_port);
});

function DynamicData(send_content,extradata){
   var send_content = send_content.replace(/:::sitename:::/g, site_name)
       send_content = send_content.replace(/:::anothervar:::/g, "This is Another Variable Test")
       send_content = send_content.replace(/:::servertime:::/g,new Date())
       send_content = send_content.replace(/:::clusterstat:::/g, extradata.status)
   return send_content;
}

function RenderHTML(html_part,encoding,res,extradata){
   fs.readFile(__dirname+contentpath+''+html_header,encoding,function(err,data){
      res.write(DynamicData(data,extradata))
      fs.readFile(__dirname+contentpath+html_part,encoding,function(err,data){
         res.write(DynamicData(data,extradata))
         fs.readFile(__dirname+contentpath+''+html_footer,encoding,function(err,data){
            res.write(DynamicData(data,extradata))
            res.end()
         })
      })
   })
   return;
}
