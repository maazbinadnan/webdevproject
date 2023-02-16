var sql = require('mssql');
var config = {
    server:'HP-PAVILION-15',
    user:'maazadnan',
    password:'123',
    database:'node',
    port:1433,
    options:{
        encrypt:false,
        trustServerCertificate:true,
        //trustedConnection:true, //use this for windows authentication
    },
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:30000        
    }
};



let pool; 
getPool = () => {
    try {
        if (!pool) {
        pool = new sql.ConnectionPool(config);
        console.log("New connection pool created");
        return pool;    
        }else{
            console.log("Connection pool already exists");
            return pool;
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = getPool;






