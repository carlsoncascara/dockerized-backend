const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2');

const database = 'angular_express';

const connect = new Promise((resolve,reject)=>{
    try{
        conn = mysql.createConnection({
            host: 'employee-db',
            port: 3306,
            user: 'root',
            password: 'carlson-lanex',
        });
        conn.connect((err)=>{
            if(err) {
                console.log("Unable to connect to mysql: ",err);
                reject(false);
            }else{
                conn.query(`CREATE DATABASE IF NOT EXISTS ${database}`,async (err,res)=>{
                    if(err) {
                        console.log("Unable to create database: ", err);
                        reject(false);
                    }else{
                        if(res.affectedRows) console.log('Databases created!');
                        else console.log('Database already exists!');
                        console.log("Creating sequelize data...");
                        conn.end();
                        try{
                            const sequelize = await new Sequelize(
                                database,'root','carlson-lanex',
                            {
                                host: 'employee-db',
                                port: 3306,
                                dialect:'mysql',
                                dialectModule: require('mysql2'),
                                logging: false
                            });
                            createEmployeeTable(sequelize);
                            createSkillTable(sequelize);
                            sequelize.sync();
                            resolve(sequelize); 
                        }catch(err){
                            console.error(err);
                            reject(false);
                        }
                    }
                });
            }
        });
    }catch(err){
        console.error(err);
    }
});

function createEmployeeTable(sequelize){
    sequelize.define('Employee',{
        id:{
            field: 'employee_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fname:{
            field: 'first_name',
            type: DataTypes.STRING,
            allowNull: false,
        },
        lname: {
            field: 'last_name',
            type: DataTypes.STRING,
            allowNull: false  
        },
        bdate: {
            field: 'birthdate',
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        skills: {
            field: 'skills',
            type: DataTypes.STRING,
            
        }
    },{tableName: 'employee'});
}

function createSkillTable(sequelize){
    sequelize.define('Skill',{
        id:{
            field: 'skill_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            field: 'skill_name',
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{tableName: 'skill'});
}

module.exports = {
    connect
}