const db = require('../services/database');
const formatDate = require('../helpers/dateparser');

function Employee(employee){
    const {firstName,lastName,birthdate,skills} = employee;
    console.log(employee);
    if(firstName && lastName && birthdate){   
        return [
            firstName,
            lastName,
            birthdate,
            skills,
        ];

    }
    return false;
}

const getAllEmployee = () => new Promise((resolve,reject)=> 
    db.query("SELECT * FROM employee", (err, res)=>{
        if(err){
            console.error("Error: " + err);
            reject(err);
        }else{
            const data = res.map((val)=>{
                return {
                    employeeID: val.id,
                    firstName: val.first_name,
                    lastName: val.last_name,
                    birthdate: formatDate.getDateYMDFormat(val.birthdate),
                    skills: val.skills != null ? String(val.skills).split(",") : []
                }
            });
            console.log("Note: ",data);
            resolve(data);
        }
    })
);

const getEmployee = (id) => new Promise((resolve, reject) =>
    db.query("SELECT * FROM employee WHERE id=?",[id], (err,res,fields) => {
        if(err){
            console.error("Error: ",err);
            reject(null);
        }else{
            if(res){
                data = {
                    employeeID : res[0].id,
                    firstName: res[0].first_name,
                    lastName: res[0].last_name,
                    birthdate: formatDate.getDateYMDFormat(res[0].birthdate),
                    skills: res[0].skills != null ? String(res[0].skills).split(",") : []
                };
                console.log("Note: ",res);
                resolve(data);
            }else{
                console.log("Note: Empty");
                reject({});
            }
        }
    })
);

const createEmployee = (employee) => new Promise((resolve,reject)=>
    db.query("INSERT INTO employee (first_name,last_name,birthdate,skills) VALUES (?,?,?,?)",[
        employee[0],employee[1],employee[2],employee[3],
    ],(err,res)=>{
        if(err){
            console.error("Error: ",err);
            reject("Internal error occurred!");
        }else{
            console.log("Note: ",res);
            resolve(res.insertId);
        }
    })
);

const updateEmployee = (id, employee) => new Promise((resolve,reject)=>
    db.query("UPDATE employee SET first_name=?,last_name=?,birthdate=?,skills=? WHERE id=?",[
        employee[0],employee[1],employee[2],employee[3],id
    ], (err,res)=>{
        if(err){
            console.error("Error: ",err);
            reject("Internal error occurred!")
        }else{
            console.log("Note: ",res);
            resolve("Ok");
        }
    })
)

const removeEmployee = (id) => new Promise((resolve,reject)=>
    db.query("DELETE FROM employee WHERE id=?",[id],(err,res)=>{
        if(err){
            console.error("Error: ",err);
            reject("Internal error occurred!");
        }else{
            console.log("Note: ",res);
            resolve("Ok");
        }
    })
)

module.exports = {
    Employee,
    getAllEmployee,
    getEmployee,
    createEmployee,
    updateEmployee,
    removeEmployee,
};