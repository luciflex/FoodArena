const planModel=require("../model/planModel");
const {getAllElements,createElement,getElement,updateElement,removeElement}=require("../utility/factory")


module.exports.getAllPlans=getAllElements(planModel);
module.exports.createPlan=createElement(planModel);
module.exports.getPlan=getElement(planModel);
module.exports.updatePlan=updateElement(planModel);
module.exports.removePlan=removeElement(planModel);

