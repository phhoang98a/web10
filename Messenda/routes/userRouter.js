const express = require('express');
const Router = express.Router();
const cookie = require('cookie');
const cookieParser = require('cookie-parser');

const userSchema=require('../models/userModel');
const userController = require('../controller/userController');
const isAuthen = userController.isAuthen;

const init = (io, app, sessionStore) => {

    Router.get('/', (req, res) => {
        res.redirect('/login');
    });

    Router.get('/login', (req, res) => {
        res.render('login');
    });

    Router.get('/checkSession', (req, res) => res.send(req.session.user.user._id));

    var userid = "";
    var currentUsername = "";
    var emailUser;

    Router.get('/api/login/:id', (req, res) => {

        emailUser=req.params.id;
        
        userSchema.findOne({email:emailUser},(err,data)=>{
            if (err){
                console.log(err);
            }else{
                req.session.regenerate(() => {
                    userid = data._id;
                    currentUsername = data.username;
                    req.session.user = data;
                    res.redirect('/api/chat');
                });
            }
        })

    });



    Router.get('/api/user/:id', isAuthen, (req, res) => {
        userController.getById(req.params.id, (err, data) => {
            if (err) console.error(err);
            res.json(data);
        });
    });

    Router.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.send('destroyed');
        });
    });

    Router.get('/api/user', isAuthen, (req, res) => {
        userController.getAll((err, data) => {
            if (err) console.error(err);
            if (data) {
                res.send(data);
            }
        });
    });

    Router.post('/api/createuser', (req, res) => {
        userController.create(req.body, (err, data) => {
            if (err) console.error(err);
            if (data) {
                res.send(data);
            }
        });
    });

    Router.get('/api/chat/', (req, res) => {
        res.render('index');
    });

    Router.post('/api/chat/', (req, res) => {
        var words_seach=[];
        var listSearch={
            "stringSearch":req.body.search,
            "del":[],
            "listName":[],
            "listID":[]
        };
        var list={
            "stringSearch":req.body.search,
            "del":[],
            "listName":[],
            "listID":[]
        };
        var word="";
        var string_search=req.body.search+' ';

        for (let i=0; i<string_search.length;i++)
        if (string_search[i]==' ')
        {
            words_seach.push(word);
            word="";
        }else{
            word=word+string_search[i];
        }

        userController.getAll((err,data)=>{
            if (err){
                console.log(err);
            }else{
                data.forEach(function(user){
                    listSearch.del.push('0');
                    listSearch.listName.push(user.usernameLowerCase);
                    listSearch.listID.push(user._id);
                })


                for (let i=0; i<words_seach.length;i++)
                for (let j=0; j<listSearch.listName.length;j++)
                if (listSearch.del[j]=="0"){
                    if (listSearch.listName[j].search(words_seach[i])==-1){
                        listSearch.del[j]="1";
                    }
                }
                 
                for (var i=0; i<listSearch.listName.length;i++)
                if (listSearch.del[i]=="0")
                {
                    list.del.push("0");
                    list.listName.push(listSearch.listName[i]);
                    list.listID.push(listSearch.listID[i]);
                }
                
                res.json(list);
            }
        })

    });
    var users = {};
    
    Router.get('/api/chat/:id', (req, res) => {
        var searchUserId ='';
        searchUserId = req.params.id;
        users[req.session.user._id] = searchUserId; 
        res.render('index', {
            userId: req.params.id
        });
    });

    var clients = {};

    io.use(function (socket, next) {
        if (socket.request.headers.cookie) {
            socket.request.cookie = cookie.parse(cookieParser.signedCookie(socket.request.headers.cookie, 'secret'));

            // console.log('cookie header ( %s )', JSON.stringify(socket.request.headers.cookie));
            var cookies = cookie.parse(socket.request.headers.cookie);
            // console.log('cookies parsed ( %s )', JSON.stringify(cookies));
            if (!cookies['cookiename']) {
                return next(new Error('Missing cookie ' + 'cookiename'));
            }
            var sid = cookieParser.signedCookie(cookies['cookiename'], 'duyanhv');
            if (!sid) {
                return next(new Error('Cookie signature is not valid'));
            }
            // console.log('session ID ( %s )', sid);
            socket.request.sid = sid;
            sessionStore.get(sid, function (err, session) {
                if (err) return next(err);
                if (!session) return next(new Error('session not found'));
                socket.request.session = session;
                next();
            });
        }
        else next();
    });

    io.on('connection', (socket) => {
      

        if(typeof socket.request.session.user.username !== 'undefined'){
            socket.emit('username', socket.request.session.user.username);
        }

        socket.on('url', (data) => {
            if (data) {
                if (typeof socket.request.session.user._id !== 'undefined') {
                    clients[socket.request.session.user._id] = socket.id;
                }

                // console.log(`api/chat: ${socket.id}`);
            }
        });
        socket.on('send message', (data) => {

            if (typeof socket.request.session !== 'undefined' &&
                typeof users !== 'undefined') {
                io.sockets.connected[clients[users[socket.request.session.user._id]]].emit('private chat', {
                    user: socket.request.session.user.username,
                    message: data.message
                });
                io.sockets.connected[socket.id].emit('private chat', {
                    user: socket.request.session.user.username,
                    message: data.message
                });

            }
        });

        socket.on('typing', (typing) => {
            socket.broadcast.emit('typing', typing);
        });

        socket.on('disconnect', ()=>{
            delete clients[socket.request.session.user._id];
        });
    });


    return Router;
}



module.exports = init;

