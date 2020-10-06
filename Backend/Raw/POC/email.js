const nodemailer=require("nodemailer");

async function sendMail(){
    const  transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7eb041f47f729e",
          pass: "8b003fb06e1790"
        }
      });
     const mailOptions={
         from:"gaba",
         to:"abc@abc.com",
         subject:"First mail",
         html:"<h1>First mail through Nodejs</h1>"
     } 
     await transport.sendMail(mailOptions);
}
sendMail().then(function(){
    console.log("Email");
}).catch (function(err){
console.log("sasasas");
})