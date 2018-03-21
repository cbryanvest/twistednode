# twistednode
Twistednode is an ever evolving nodejs and express based http app engine.

There are other packages available to do what I am doing here but I know
my specific needs so decided to go this route and just use and write what I need.

Over time this will grow to add new features while also trying to keep it open
and explain what I am doing as I go.

Using this is not too difficult

If you download the repo it should contain all of the files needed to start this right up.


Checkout twistednode wherever you store your sites

git checkout https://github.com/cbryanvest/twistednode.git

Modify the port that twistednode.js will listen on by editing twistednode.js and changing this line

server_port = '4444'

to whatever port you want to use.

Run the server with 

node twistednode.js 

or your favorite package manager.

The general usage is to edit the files in the parts folder. This folder must contain the files header.html, footer.html, and whatever pages you are going to call from the server.

The header.html and footer.html can contain whatever you want but they have to contain the page head and page end.


Page Head should contain at least these elements
```html
<!DOCTYPE html>
   <html>
      <head>
      </head>
      <body>
```
        

Page End could contain at least these elements
```html
</body>
</html>
```
Other than these requirements you can have whatever you need in the header.html and footer.html files.

Creating new Pages

To create a new page there are two steps. 

First step is to create the html page in the parts/ folder. In this example we will use foo.html

From the site folder type
```shell
touch parts/foo.html
echo "This is the foo test">>parts/foo.html
```

Then edit twistednode.js adding the javascript below. This contains everything to run this new page.

```javascript
app.get('/foo', function(req,res){
  RenderHTML("foo.html",encoding,function(rendered){
    console.log(newdata)
    DynamicData(rendered,newdata,function(dynamicdata){
      res.write(dynamicdata)
      res.end()
    })
  })
})
```

Restart twistednode.js and you should now be able to go to http://YOURIP:server_port/foo and see the message

This is the foo test 

If you want to add variables to your page you just have to add them to the page and to the variable object.

```shell
touch parts/foowithvar.html
echo "This is the foo test but with a variable :::variable:::">>parts/foo.html
```

Then we will add the same app.get that we did above but assign the variable.


```javascript
app.get('/foowithvar', function(req,res){
  RenderHTML("foowithvar.html",encoding,function(rendered){
    console.log(newdata)
    newdata['variable'] = 'This is the test Variable That we Added'
    DynamicData(rendered,newdata,function(dynamicdata){
      res.write(dynamicdata)
      res.end()
    })
  })
})

Restart twistednode and go to http://YOURIP:server_port/foowithvar and you should see

This is the foo test but with a variable This is the test Variable That we Added
```
