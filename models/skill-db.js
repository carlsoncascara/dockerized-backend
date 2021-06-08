const { connect } = require('../services/database');
function Skill(skill){
    const { name } = skill;

    if(name){
        return { name:name };
    }
    return false;
}

const getAllSkill=()=> new Promise((resolve,reject)=>{
    connect.then(
        async res=>{
            result = await res.model('Skill').findAll();
            data = result.map(val=>{
                return {
                    id:val.dataValues.id,
                    name:val.dataValues.name
                }
            });
            console.log(data);
            
            resolve(data);
        }
    ).catch(
        err=>{
            console.error(err);
            reject("failed");
        }
    );
});

const getSkill=(id)=> new Promise((resolve, reject)=>{
    connect.then(
        async res=>{
            result = await res.model('Skill').findAll({where:{skill_id: id}})
            data = result.map(val=>{
                return {
                    id:val.dataValues.id,
                    name:val.dataValues.name
                }
            });
            resolve(data[0]);
        }
    ).catch(
        err=>{
            console.error(err);
            reject("failed");
        }
    );
});

const addSkill=(skill)=> new Promise((resolve,reject)=>{
    connect.then(
        async res=>{
            newSkill = await res.model('Skill').create(skill)
            resolve(newSkill.name);
        }
    ).catch(
        err=>{
            console.error(err);
            reject("failed");
        }
    );
});

const updateSkill=(id,skill)=>new Promise((resolve,reject)=>{
    connect.then(
        async res=>{
            updatedSkill = await res.model("Skill").update(skill,{
                where:{skill_id:id}
            });
            resolve(updatedSkill.name);
        }
    ).catch(
        err=>{
            console.error(err);
            reject("failed");
        }
    );
});

const removeSkill=(id)=>new Promise((resolve, reject)=>{
    connect.then(
        res=>{
            res.model("Skill").destroy({where:{skill_id:id}});
            resolve("Skill removed!");
        }
    ).catch(
        err=>{
            console.error(err);
            reject("failed");
        }
    )
});

module.exports = {
    Skill,
    getAllSkill,
    getSkill,
    addSkill,
    updateSkill,
    removeSkill
}



// const getAllSkill = () => new Promise((resolve,reject)=>
//     db.query("SELECT * FROM skill",[],(err,res)=>{
//         if(err){
//             console.error(err);
//             reject("Internal error occurred!");
//         }else{
//             resolve(res);
//         }    
//     })
// );

// const getSkill = (id) => new Promise((resolve,reject)=>
//     db.query("SELECT * FROM skill WHERE id=?",[id],(err,res)=>{
//         if(err){
//             console.error(err);
//             reject("Internal error occurred!");
//         }else{
//             resolve(res);
//         }
//     })
// );

// const createSkill = (skill) => new Promise((resolve,reject)=>
//     db.query("INSERT INTO skill (name) VALUES (?)",[skill],(err,res)=>{
//         if(err){
//             console.error(err);
//             reject("Internal error occurred!");
//         }else{
//             resolve(`${res.insertId}`);
//         }
//     })
// );

// const updateSkill = (id,skill) => new Promise((resolve,reject)=>
//     db.query("UPDATE skill SET name=? WHERE id=?",[skill,id],(err,res)=>{
//         if(err){
//             console.error(err);
//             reject("Internal error occurred!");
//         }else{
//             resolve("Ok");
//         }
//     })
// );

// const deleteSkill = (id) => new Promise((resolve,reject)=>
//     db.query("DELETE FROM skill WHERE id=?",[id],(err,res)=>{
//         if(err){
//             console.error(err);
//             reject("Internal error occured!");
//         }else{
//             resolve("Ok");
//         }
//     })
// );

// module.exports = {
//     Skill,
//     getAllSkill,
//     getSkill,
//     createSkill,
//     updateSkill,
//     deleteSkill
// }