function updatePlan(req,res){
    const planId=req.params.planId;
    const tobeUpdated=req.body;
    res.status(200).JSON({
    status:"plan updated"
    });
    }
    function getPlan(req,res){
        let planId=req.params.planId;
        const plan=plans[planId-1];
        res.status(200).json({
            Status:`result for planId ${planId}`,
            plan
        })
    }
function createPlan(req,res){
    let plan=req.body;
    plan.id=plans.length +1;
    plans.push(plan);
    fs.writeFileSync("./data/plan.json",JSON.stringify(plans));
    res.status(201).json({Status:"New plan created"});
}
function getAllPlans(res,req){
    res.status(200).json({
      Status:"Request Received",
      plans
    });
}

function removePlan(req,res){
    res.JSON({
        data:"plan deleted"
    })
}

module.exports.getAllPlans=getAllPlans;
module.exports.createPlan=createPlan;
module.exports.getPlan=getPlan;
module.exports.updatePlan=updatePlan;
module.exports.removePlan=removePlan;

