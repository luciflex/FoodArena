let loginForm=document.querySelector(".login-form");
let signupForm=document.querySelector(".signup-form")
let forgetPass=document.querySelector(".fp-form");
let logout=document.querySelector(".logout")
let planCreate=document.querySelector(".create-plan");
let updateProfile=document.querySelector(".updateProfile");

async function loginHelper(email,password){
    const response = await axios.post("/api/user/login",{email,password});
    console.log(response.data);
    if(response.data.status=="successfull"){
        alert("Login successful");
        window.location.href="/profile";
    }
    else{
        alert("Please try again");
    }
}

async function logoutHelper(){
    let response = await axios.get("/api/user/logout");
    if (response.data.status === "logged Out") {
      location.assign("/");
    } else {
      alert("some error ocurred");
    }
      
}

async function signupHelper(email,name,password,confirmPassword,role){
    const response=await axios.post("/api/user",{email,name,password,confirmPassword,role});
    console.log(response.data);
    if(response.data.err){
        alert(`User already exists`);
    }
    else if(response.data.status=="New user created") {
        alert("New user created");
    }
}

async function fpHelper(email){
    const response=await axios.post("/api/user/forgetPassword",{email});
    console.log(response.data);
    if(response.data.message){
        alert(`Email sent to ${email}`);
    }
    else{
        alert("Please try again");
    }
}

async function createPlanHelper(name,description,ratingsAverage,price,discount){
    const response= await axios.post("/api/plan",{name,description,ratingsAverage,price,discount});
    console.log(response.data);
    if(response.data.status=="New plan created"){
        alert("New Plan created successfully");
    }
    else{
        alert("Error Encountered");
    }
}



if(loginForm){
loginForm.addEventListener("submit",function(e){
    e.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    loginHelper(email,password);
    
})
}

if(signupForm){
    signupForm.addEventListener("submit",function(e){
      e.preventDefault();
      const email=document.getElementById("email").value;
      const name=document.getElementById("name").value;
      const password=document.getElementById("password").value;
      const confirmPassword=document.getElementById("confirmPassword").value;
      const role=document.getElementById("role").value;
      signupHelper(email,name,password,confirmPassword,role);
    })
}

if(forgetPass){
    forgetPass.addEventListener("submit",function(e){
        e.preventDefault();
        const email=document.getElementById("email").value;
        fpHelper(email);
    })
}

if(logout){
    logout.addEventListener("click",function(e){
        e.preventDefault();
        logoutHelper();
    })
}

if(planCreate){
    planCreate.addEventListener("submit",function(e){
        e.preventDefault();
        const name=document.getElementById("name").value;
        const description=document.getElementById("description").value;
        const ratingsAverage=document.getElementById("ratingsAverage").value;
        const price=document.getElementById("price").value;
        const discount=document.getElementById("discount").value;
        createPlanHelper(name,description,ratingsAverage,price,discount);
    })
}

if(updateProfile){
    updateProfile.addEventListener("click",function(e){
        e.preventDefault();
        const formData=new formData;
        
    })
}