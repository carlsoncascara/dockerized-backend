const express = require('express');
const router = express.Router();
const skill = require('../models/skill-db');
const queryHelper = require('../models/query-helper');

router.use(express.json());

router.get('/next_id', (req,res)=>{
    queryHelper.getNextID('skill').then(
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

router.get('/',(req, res)=>
    skill.getAllSkill().then(
    (result)=>{
        res.status(200);
        res.json(result);
    }
    ).catch(
        (reject)=>{
            res.status(500);
            res.send(reject);
        }
    )
);            
            
router.get('/:id',(req,res)=>
    skill.getSkill(req.params.id).then(
        (result)=>{
            res.status(200);
            res.json(result);
        }
    ).catch(
        (reject)=>{
            res.status(500);
            res.send(reject);
        }
    )
);

router.post('/',(req,res)=>{
    
    const skillBody = skill.Skill(req.body);
    if(!skillBody){
        res.status(400);
        res.send("Invalid input request!");
    }else{
        skill.createSkill(skillBody).then(
            (result)=>{
                res.status(200);
                res.send(result);
            }
        ).catch(
            (reject)=>{
                res.status(500);
                res.send(reject);
            }
        );
    }
});

router.put('/:id',(req,res)=>{
    const { id } = req.params;
    const skillBody = skill.Skill(req.body);
    if(!skillBody){
        res.status(400);
        res.send("Invalid input request!");
    }else{
        skill.updateSkill(id, skillBody).then(
            (result)=>{
                res.status(200);
                res.json(result);
            }
            ).catch(
            (reject)=>{
                res.status(500);
                res.send(reject);
            }
        );
    }
});

router.delete('/:id',(req,res)=>{
    const { id } = req.params;
    if(id){
        skill.deleteSkill(id).then(
            (result)=>{
                res.status(200);
                res.json(result);
            }
        ).catch(
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