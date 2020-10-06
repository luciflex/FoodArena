function updateUser(req,res){
    const userId=req.params.userId;
    const tobeUpdated=req.body;
    res.status(200).JSON({
    status:"user updated"
    });
    }
    function getUser(req,res){
        let userId=req.params.userId;
        const user=users[userId-1];
        res.status(200).json({
            Status:`result for userId ${userId}`,
            user
        })
    }
function createUser(req,res){
    let user=req.body;
    user.id=users.length +1;
    users.push(user);
    fs.writeFileSync("./data/user.json",JSON.stringify(users));
    res.status(201).json({Status:"New user created"});
}
function getAllUsers(res,req){
    res.status(200).json({
      Status:"Request Received",
      users
    });
}

function removeUser(req,res){
    res.JSON({
        data:"user deleted"
    })
}

module.exports.getAllUsers=getAllUsers;
module.exports.createUser=createUser;
module.exports.getUser=getUser;
module.exports.updateUser=updateUser;
module.exports.removeUser=removeUser;

