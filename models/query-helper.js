const db = require('../services/database');
/* 
COMMON QUERY
-SELECT [output] FROM [tablename] [options]
-CREATE INTO [tablename] ([columns]) VALUES ([values])
-UPDATE [tablename] SET [column-value] WHERE [condition]
-DELETE FROM [tablename] WHERE [condition]
*/

const getter = (tablename, output="*", options="") => 
    `SELECT ${output} FROM ${tablename} ${options}`;

const creater = (tablename, columns="", values) => 
    `CREATE INTO  ${tablename} (${columns}) VALUES (${values})`;

const updater = (tablename, column_value, condition) => 
    `UPDATE ${tablename} SET ${column_value} WHERE ${condition}`;

const deleter = (tablename, condition) =>
    `DELETE FROM ${tablename} WHERE ${condition}`;

const getNextID = (table) => new Promise((resolve,reject)=>{
    db.query(`SELECT AUTO_INCREMENT as id FROM information_schema.TABLES 
                WHERE TABLE_SCHEMA='angular_activity_one' 
                AND TABLE_NAME='${table}'`,(err,res)=>{
        if(err){
            console.error("ERROR: ",err);
            reject(err);
        }else{
            console.log("NOTE: ",res);
            resolve(res[0].id);
        }
    });
});

class QueryHelper {

    constructor(tablename){
        this.tablename = tablename;
        this.tablerows = [];
        this.condition = "";
        this.options = "";
        this.error = false;
        db.query(`SELECT * FROM ${tablename} LIMIT 1`, (err,res,fields)=>{
            if(err){
                this.error = true;
                console.error(err);
            }else{
                this.tablerows = fields.map((val)=>val.orgName);
            }
        });
    }

    initQuery = () =>{
        this.condition = "";
        this.options = "";
    }

}

module.exports = {
    getter,
    creater,
    updater,
    deleter,
    getNextID,
    QueryHelper,
}