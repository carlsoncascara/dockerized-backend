const db = require('../services/database');
function Skill(skill){
    const { name } = skill;

    if(name){
        return name;
    }
    return false;
}

const getAllSkill = () => new Promise((resolve,reject)=>
    db.query("SELECT * FROM skill",[],(err,res)=>{
        if(err){
            console.error(err);
            reject("Internal error occurred!");
        }else{
            resolve(res);
        }    
    })
);

const getSkill = (id) => new Promise((resolve,reject)=>
    db.query("SELECT * FROM skill WHERE id=?",[id],(err,res)=>{
        if(err){
            console.error(err);
            reject("Internal error occurred!");
        }else{
            resolve(res);
        }
    })
);

const createSkill = (skill) => new Promise((resolve,reject)=>
    db.query("INSERT INTO skill (name) VALUES (?)",[skill],(err,res)=>{
        if(err){
            console.error(err);
            reject("Internal error occurred!");
        }else{
            resolve(`${res.insertId}`);
        }
    })
);

const updateSkill = (id,skill) => new Promise((resolve,reject)=>
    db.query("UPDATE skill SET name=? WHERE id=?",[skill,id],(err,res)=>{
        if(err){
            console.error(err);
            reject("Internal error occurred!");
        }else{
            resolve("Ok");
        }
    })
);

const deleteSkill = (id) => new Promise((resolve,reject)=>
    db.query("DELETE FROM skill WHERE id=?",[id],(err,res)=>{
        if(err){
            console.error(err);
            reject("Internal error occured!");
        }else{
            resolve("Ok");
        }
    })
);

module.exports = {
    Skill,
    getAllSkill,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill
}