const nodemailer=require("nodemailer");

module.exports=async function sendMail(options){
    const  transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7eb041f47f729e",
          pass: "8b003fb06e1790"
        }
      });
     const mailOptions={
         from:options.from,
         to:options.to,
         subject:options.subject ,
         html:options.html
     } 
     await transport.sendMail(mailOptions);
}
// sendMail().then(function(){
//     console.log("Email");
// }).catch (function(err){
// console.log("error occured");
// })