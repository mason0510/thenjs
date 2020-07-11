var Thenjs = require("thenjs");
Thenjs(function (cont) {
  cont(null, result);
})
  .then(function (cont) {
    cont(new Error('error!'), 123);
  })
  .fin(function (cont, error, result) {
    console.log(error, result);
    cont();
  })
  .each([0, 1, 2], function (cont, value) {
    //do sth with value
    cont(null);  // 并行执行队列任务，把队列 list 中的每一个值输入到 task 中运行
  })
  .then(function (cont, result) {
    console.log(result);
    cont();
  })
  .series([ // 串行执行队列任务
    function (cont) { task(88, cont); }, // 队列第一个是异步任务
    function (cont) { cont(null, 99); } // 第二个是同步任务
  ])
  .then(function (cont, result) {
    console.log(result);
    cont(new Error('error!!'));
  })
  .fail(function (cont, error) { // 通常应该在链的最后放置一个 `fail` 方法收集异常
    console.log(error);
    console.log('DEMO END!');
  });
