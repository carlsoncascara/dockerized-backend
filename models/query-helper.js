const { QueryTypes } = require('sequelize');
const { connect } = require('../services/database');

const getNextID = (table) => new Promise((resolve,reject)=>{
    connect.then(
        async db=>{
            try{
                const nextid = await db.query(
                    `SELECT AUTO_INCREMENT as id 
                    FROM information_schema.TABLES 
                    WHERE TABLE_SCHEMA='angular_express' 
                    AND TABLE_NAME='${table}'`,{
                        type: QueryTypes.SELECT
                    });
                console.log(nextid);
                resolve(nextid[0].id);
            }catch(err){
                console.error(err);
                reject("failed");
            }
        }
    ).catch(
        err=>{
            console.error(err);
            reject("failed");
        }
    );
});

module.exports = { getNextID }