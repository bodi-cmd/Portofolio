var express = require('express');
var app = express();
var io = require('socket.io').listen(server);
var nodemailer = require('nodemailer');
var path = require('path')
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

users = [];
connections = [];
var num_users=0;

const fs = require('fs');
const https = require('https');
const http = require('http');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/bogdanbarbu.com/privkey.pem','utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/bogdanbarbu.com/cert.pem','utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/bogdanbarbu.com/fullchain.pem','utf8');


const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

var serverhttps = https.createServer(credentials,app);
var server = http.createServer(app);



var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'bogdan.barbu01@yahoo.com',
        pass: 'awpasiimov'
    }
});

server.listen(82);
serverhttps.listen(443);
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'BodisDB',
	database : 'nodelogin'
});
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/diary', function(request, response) {
	response.sendFile('/client/indexup.html', { root: __dirname });
});
app.get('/nr', function(request, response) {
	response.json({ user_count: num_users });

});
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND passwords = ?', [username, password], function(error, results, fields) {
			console.log(results);
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

/**app.post('/register', function(request, response) {
	var usname = request.body.username;
    var pass = request.body.password;
    var mail = request.body.email;
    var date = request.body.birth;
    
    const employee = { username: usname, password:pass,email:mail,birth:date};
        connection.query('INSERT INTO accounts SET ?', employee, (err, res) => {
              if(err) throw err;
              response.send('Succsesfully registered !');
              console.log('Last insert ID:', res.insertId);
            });

});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username.happiness + '!');
        //response.sendFile('/client/diarypage.html', { root: __dirname })
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});**/
app.get('/projects', function (req, res) {
    res.sendFile('/client/projects.html', { root: __dirname })
})
app.get('/contact', function (req, res) {
    res.sendFile('/client/contact.html', { root: __dirname })
})
app.get('/diary', function (req, res) {
    res.sendFile('/client/indexup.html', { root: __dirname })
})


app.get('/projects/wallbreaker', function (req, res) {
    res.sendFile('/client/projects/wallbreaker.html', { root: __dirname })
})
app.get('/projects/chainup', function (req, res) {
    res.sendFile('/client/projects/chainup.html', { root: __dirname })
})
app.get('/projects/thehuntermaster', function (req, res) {
    res.sendFile('/client/projects/thehuntermaster.html', { root: __dirname })
})
app.get('/projects/probpm', function (req, res) {
    res.sendFile('/client/projects/probpm.html', { root: __dirname })
})
app.get('/projects/autochess', function (req, res) {
    res.sendFile('/client/projects/autochess.html', { root: __dirname })
})
app.get('/projects/healthyc', function (req, res) {
    res.sendFile('/client/projects/healthyc.html', { root: __dirname })
})


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

console.log("A pornit serveru mosule!")

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('connected: %s sockets connected' + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds, connections.length);
    num_users++;
    const fs = require('fs');
	

    socket.on('disconnect', function (data) {
        console.log('disconnected: %s sockets connected' + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds, connections.length);
       
    });
    //send mesage

    //new user
    socket.on('new user', function (data, callback) {
        while (data.id.charAt(0) === ' ') {
            data = data.substr(1);
        }
        if (data.id.length > 3) {
            callback(true);
            socket.username = data;
            fs.appendFile("./test.txt", data.id + "\n", function (err) {
                console.log("new user: " + data.id);
                if (err) {
                    return console.log(err);
                }
                
            });
            
           
        }
        else console.log("prea mic");
    });
    
    
    //new mail
    socket.on('new mail', function (data, callback) {
        while (data.name.charAt(0) === ' ') {
            data = data.substr(1);
        }
        if (data.name.length > 3 && data.email.indexOf('@') > -1) {
            callback(true);
            socket.username = data;

            var mailOptions = {
                from: 'bogdan.barbu01@yahoo.com',
                to: 'bogdan.barbu.dev@gmail.com',
                subject: data.subject,
                text: data.message
            };
            console.log('email sent');
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        else console.log("prea mic");
    });
});

