const express = require ( 'express' );
const pg = require ( 'pg' );
const app = express();
const bodyParser = require ( 'body-parser' );
const query = require ( '../query_db' );



app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.get('/', function(req, res){
	res.render('index');
});

app.post('/postMessage', function(req, res){

	query("insert into messages (title,body) "+
"values ('"+req.body.title+"','"+req.body.body+"')");
  res.send('<a href="/submitted">Go to MessageBoard</a>');
});


app.get('/submitted', function(req, res){ 
	
		query('select * from messages', function (err, result){
			var allMessages = result.rows;
				if (err){
					console.log('something went wrong ' + err)
						}
				else	{
					
					res.render('submitted', {
						messages : allMessages
					});

					}
				})


				});
		

app.listen(3000, function() {
	console.log( ' Bulletin board App listening on port 3000! ' )
}); 
