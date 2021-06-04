const express = require('express');
const router = express.Router();

const queryHelper = require('../models/query-helper')
const employee = require('../models/employee-db');

router.use(express.json());

router.get('/next_id', (req,res)=>{
    queryHelper.getNextID('employee').then(
        resolve=>{
            console.log(resolve);
            res.status(200);
            res.json(resolve);
        }
    ).catch(
        reject=>{
            console.log(err)
            res.status(500);
            res.json(reject);
        }
    );
});

router.get('/', (req,res) =>
    employee.getAllEmployee().then(
        (resolve)=>{
            res.status(200);
            res.json(resolve);
        },
        (reject)=>{
            res.status(500);
            res.json("Internal error occurred!")
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
            res.json("Internal error occurred!");
        }
    )
);

router.post('/', (req, res) => {
    const response = employee.Employee(req.body);
    if(!response){
        res.status(400);
        res.json("Invalid input request!");
    }else{
        employee.createEmployee(response).then(
            (result)=>{
                res.status(200);
                res.json("New Employeee ID: " + result);
            },
            (reject)=>{
                res.status(500);
                res.json(reject);
            }
        );
    }

});

router.put('/:id', (req,res)=>{
    const { id } = req.params;
    const response = employee.Employee(req.body);

    if(!response){
        res.status(400);
        res.json("Invalid value(s) to update!")
    }else{
        employee.updateEmployee(id,response).then(
            (result) =>{
                res.status(200);
                res.json(result);
            },
            (reject)=>{
                res.status(500);
                res.json(reject);
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
                res.json(result);
            },
            (reject)=>{
                res.status(500);
                res.json(reject);
            }
        );
    }else{
        res.status(400);
        res.json("Invalid delete input!");
    }
});


module.exports = router;