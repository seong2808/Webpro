const express = require('express');
const app = express();

const fs = require('fs');  // 파일 처리를 위한 모듈
// const fetch = require('node-fetch'); 

const xmlconv = require('xml-js');

// POST DATA를 파싱하고 JSON 으로 변경하는 부분
app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(express.static('public')); 
app.use(express.static('main_back')); 



let todo_router = require('./router/todoAPI')(app, fs, xmlconv);


app.listen(8080, function() {
    console.log('Server 실행중');
});

