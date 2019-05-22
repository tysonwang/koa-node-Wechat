const mysql2 = require('mysql2');
const {SQLserver} = require('../assets/config');
const pool = mysql2.createPool({
  host:SQLserver.host,//IP地址
    user:SQLserver.username,//用户名
    password:SQLserver.password,//密码
    database: SQLserver.database, //配置数据库名称
    charset:'utf8',
    //以下选项均为默认值（如果不需要变动可省略）
// acquireTimeout:10000, //获取连接的毫秒
waitForConnections: true, //为true时，连接排队等待可用连接。为false将立即抛出错误
connectionLimit: 10, //单次可创建最大连接数
queueLimit: 0 //连接池的最大请求数，从getConnection方法前依次排队。设置为0将
})
let promisePool= pool.promise();  
exports.promisePool = promisePool
// const [rows,fields] = await promisePool.query("SELECT 1");


  //TODO:1====> mysql-start
  // var connection = mysql.createConnection({
  //   host: '127.0.0.1',
  //   user: 'root',
  //   password: '123456',
  //   database: 'koawx',
  //   charset: 'utf8'
  // })
  // connection.connect();
  // connection.query('select * from user', function (err, results, fields) {
  //   console.log(err);
  //   console.log(results); //行
  //   console.log("fields",fields);//列
  // })

  // connection.end();
  //mysql-end


  //TODO:2====> mysql2-start
  // let  connection = mysql2.createConnection({
  //   host: '127.0.0.1',
  //   user: 'root',
  //   password:'123456',
  //   database: 'koawx',
  //   charset:'utf8',
  // });
  // connection.query(
  //   'select * from contents',
  //   function(err, results, fields) {
  //     console.log('results',results); // results contains rows returned by server
  //     console.log('fields',fields); // fields contains extra meta data about results, if available
  //   }
  // );
  //mysql2-end
  
  //
  // const mysql = require('mysql2/promise');
  // create the connection
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
  // query database
  // const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);