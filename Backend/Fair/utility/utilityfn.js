class QueryHelper{
    constructor(initialfindp,queryObj){
        this.query=initialfindp;
        this.queryObj=queryObj;
    }
    filter(){
        let myQuery={...this.queryObj};
        let excludeFields=["sort","select","page","limit"];
        for(let i=0;i<excludeFields.length;i++){
            delete myQuery[excludeFields[i]];
        }
        this.query=this.query.find(myQuery);
        return this
    }
    sort(){
        if(this.queryOnj.sort){

            allPlans=allPlans.sort(req.query.sort);
        }
        return this;

    }
    select(){
        if(this.queryObj.select){
            let selector=req.query.select.split("%").join(" ");
            allPlans = allPlans.select(selector);
        }
        return this

    }
    paginate(){
        let page=Number(this.queryObj.page)||1;
        let limit=Number(this.queryObj.limit)||5;
        const toSkip=limit*(page-1);
        allPlans = allPlans.skip(toSkip).limit(limit);
        return ;
    }
}





        

        
        

        