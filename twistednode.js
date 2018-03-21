var express = require('express')
, app = express()
, fs = require('fs')
, contentpath = '/parts/'
, encoding = 'utf8'
, server_port = '4444'
, site_name = 'Twistednode'

var newdata = Object()
app.use(express.static('static'))

app.get('/', function(req,res){
  var thisheader = 'header.html'
  var thisfooter = 'footer.html'
  var thiscontent = 'content.html'
  RenderHTML(thisheader,thisfooter,thiscontent,encoding,function(rendered){
    newdata["servertime"] = new Date()
    newdata["anothervar"] = "Another Test Variable"
    newdata["clusterstat"] = "Testing the clusterstat Variable"
    console.log(newdata)
    DynamicData(rendered,newdata,function(dynamicdata){
      res.write(dynamicdata)
      res.end()
    })
  })
})

app.listen(server_port, function () {
  console.log(site_name+' started on port '+server_port);
});

function DynamicData(sendcontent,newdata,callback){
  var dynamiccontent
  dynamiccontent = sendcontent
  newdata["sitename"] = site_name
  console.log(typeof newdata)
  console.log(Object.keys(newdata).length)
  if(typeof newdata !== "object"){
    console.log("Sending back original")
    callback(dynamiccontent)
  }else{
    var keycounter=0;
    for(k in newdata){
      var usek = ':::'+k+':::'
      console.log("Replacing "+usek+" with "+newdata[k])
      dynamiccontent = dynamiccontent.replace(new RegExp(usek,'g'),newdata[k])
      keycounter += 1
      console.log(Object.keys(newdata).length - keycounter)
      if((Object.keys(newdata).length - keycounter) === 0){
        console.log("Counter Hit Returning dynamiccontent")
        callback(dynamiccontent)
      }
    }
  }
}


function RenderHTML(html_header,html_footer,html_part,encoding,callback){
  console.log(html_header)
  fs.readFile(__dirname+contentpath+''+html_header,encoding,function(err,data){
    var rendered_page = ""
    rendered_page += data
    fs.readFile(__dirname+contentpath+html_part,encoding,function(err,data){
      rendered_page += data
      fs.readFile(__dirname+contentpath+''+html_footer,encoding,function(err,data){
        rendered_page += data
        callback(rendered_page)
      })
    })
  })
}
