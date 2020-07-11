let fetch =require ('node-fetch');
let bodyParser=require('body-parser')
let thenjs =require('thenjs') ;
let request =require ("request");
let fs =require('fs') ;
const api = 'http://rapapi.org/mockjsdata/18728/fetchtest';
let requests = [];
for(let i = 0; i < 10; ++i){
  let obj = {};
  obj.url = api;
  obj.count = i + 1;
  requests.push(obj);
}

//并行 取其中一个
//串行 thenjs.each
const batchRequst = (urls) => {
  thenjs.each(urls, (defer, obj) => {
    fetch(obj.url)
      .then(res => res.json())
      .then(res => {
        console.log(JSON.stringify(res) + ' ' + obj.count);
        defer(null, res);
      })
      .catch(err =>console.log(err));
  }).then((defer, result) => {
    console.log(result);
    console.log('Done...')
  }).fail((defer, err) => {
    console.log(err);
  })
}

batchRequst(requests);
// console.log('Start fetching..)
