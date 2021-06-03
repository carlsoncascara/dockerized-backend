const express = require('express');
const router = express.Router();
const employee = require('../models/employee-db');

router.use(express.json());

router.get('/', (req,res) =>
    employee.getAllEmployee().then(
        (resolve)=>{
            res.status(200);
            res.json(resolve);
        },
        (reject)=>{
            res.status(500);
            res.send("Internal error occurred!")
        }
    )
);

router.get('/:id', (req, res) =>
    employee.getEmployee(req.params.id).then(
        (result)=>{
            console.log(result);
            res.status(200);
            res.json(result);
        },
        (reject)=>{
            res.status(500);
            res.send("Internal error occurred!");
        }
    )
);

router.post('/', (req, res) => {
    const response = employee.Employee(req.body);
    if(!response){
        res.status(400);
        res.send("Invalid input request!");
    }else{
        employee.createEmployee(response).then(
            (result)=>{
                res.status(200);
                res.send("New Employeee ID: " + result);
            },
            (reject)=>{
                res.status(500);
                res.send(reject);
            }
        );
    }

});

router.put('/:id', (req,res)=>{
    const { id } = req.params;
    const response = employee.Employee(req.body);

    if(!response){
        res.status(400);
        res.send("Invalid value(s) to update!")
    }else{
        employee.updateEmployee(id,response).then(
            (result) =>{
                res.status(200);
                res.send(result);
            },
            (reject)=>{
                res.status(500);
                res.send(reject);
            }
        )
    }
});

router.delete("/:id",(req,res)=>{
    const { id } = req.params;
    if(id){
        employee.removeEmployee(id).then(
            (result)=>{
                res.status(200);
                res.send(result);
            },
            (reject)=>{
                res.status(500);
                res.send(reject);
            }
        );
    }else{
        res.status(400);
        res.send("Invalid delete input!");
    }
});


module.exports = router;