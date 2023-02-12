// import jsonwebtoken

const jwt = require('jsonwebtoken');

//import db.js
const db=require('./db')

// userDetails={
//     1000:{acno:1000,username:"Aash", password:1000,balance:2000,transaction:[]},
//     1001:{acno:1001,username:"Arun", password:1001,balance:2000,transaction:[]},
//     1002:{acno:1002,username:"Akshay", password:1002,balance:2000,transaction:[]},
//    }

  const register=(acno,username,password)=>{
return db.User.findOne({acno}).then(//asynchronous call
user=>{
  if(user){
    return{
      status:false,
      statusCode:401,
      message:"User already registered"
    }
  }
  else{
    const newUser= new db.User({
      acno:acno,
      username:username,
      password:password,
      balance:0,
      transaction:[]
    })
    newUser.save()// to save new data to mongodb
    return{
      status:true,
      statusCode:200,
      message:"Register Successful"
    }
  }
}
)}





    // if(acno in userDetails){
    //   return {
    //     status:false,
    //     statusCode:401,
    //     message:"user already exists"
    //   }
    // }
    // else{
    //   userDetails[acno]={
    //     acno:acno,
    //     username:username,
    //     password:password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   return {
    //     status:true,
    //     statusCode:200,
    //     messaage:"Register successful"
    //   }
    //   }
    


   const log =(acno,password) =>{
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          currentUser=user.username;
        currentAcno=acno
        //token generation
        const token=jwt.sign({currentAcno:acno},'superkey2023')
        //superkey2023 will generate a number eg:;dmndsjdsdsje893hjh
      
         return {
          status:true,
          statusCode:200,
          message:"Login successful",
          token:token,
          currentUser:user.username,
          currentAcno:acno
         }
       }
       else{
        return{
          status:false,
          statusCode:401,
          message:"Invalid userdetails"
        }
       }
     })
    }
    //  else{
    //   return{
    //     status:false,
    //     statusCode:401,
    //     message:"invalid Userdetails"
    //   }
   
    //  }
    // }
 










    //  if(acno in userDetails){
    //    if(pswd==userDetails[acno]['password']){
    //     currentUser=userDetails[acno]['username'];
    //     currentAcno=acno
    //     //token generation
    //     const token=jwt.sign({currentAcno:acno},'superkey2023')
    //     //superkey2023 will generate a number eg:;dmndsjdsdsje893hjh
      
    //      return {
    //       status:true,
    //       statusCode:200,
    //       message:"Login successful",
    //       token:token
    //      }
    //    }
    //    else{
    //     return{
    //       status:false,
    //       statusCode:401,
    //       message:"Invalid Password"
    //     }
    //    }
    //  }
    //  else{
    //   return{
    //     status:false,
    //     statusCode:401,
    //     message:"invalid Userdetails"
    //   }
   
    //  }
    




   const deposit=(acno,password,amt)=>{
      var amount=parseInt(amt)
   return db.User.findOne({acno,password}).then(
    user=>{
    if(user){
        if(password==user.password){
       user.balance+=amount;
        user.transaction.push({
          type:'Credit',
          amount
        })
       user.save();  // save to mongodb
        return  {
          status:true,
          statusCode:200,
          message:`${amount} is credited and balance is ${user.balance}`
         }
      }
      
      
        return {
          status:false,
          statusCode:401,
          message:"Invalid Password"

        }
      }
       
       return{
        status:false,
        statusCode:401,
        message:"invalid Userdetails"
      }
       }
   )}


  // const deposit=(acno,pswd,amt)=>{
  //     var amount=parseInt(amt)
  //     if(acno in userDetails){
  //       if(pswd==userDetails[acno]['password']){
  //       userDetails[acno]['balance']+=amount;
  //       userDetails[acno]['transaction'].push({
  //         type:'Credit',
  //         amount
  //       })
       
  //       return  {
  //         status:true,
  //         statusCode:200,
  //         message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`
  //        }
  //     }
  //     else{
      
  //       return {
  //         status:false,
  //         statusCode:401,
  //         message:"Invalid Password"

  //       }
  //     }
  //      }
  //      return{
  //       status:false,
  //       statusCode:401,
  //       message:"invalid Userdetails"
  //     }
  //      }


      const withdraw=(acno,password,amt)=>{
        var amount=parseInt(amt)
        return db.User.findOne({acno,password}).then(
          user=>{
          if(user){
        
            if(password==user.password){
            user.balance-=amount;
            user.transaction.push({
              type:'debit',
              amount
            })
          user.save();  //save to mongodb
            return  {
              status:true,
              statusCode:200,
              message:`${amount} is Debited and balance is ${user.balance}`
             }
          
          }
        
        
        else{
          return {
            status:false,
            statusCode:401,
            message:"Invalid Password"
  
          }
        }
         }
         return{
          status:false,
          statusCode:401,
          message:"invalid Userdetails"
        }
      }
  )}
        
    
      

        // const withdraw=(acno,pswd,amt)=>{
        // var amount=parseInt(amt)
        // if(acno in userDetails){
        //   if(pswd==userDetails[acno]['password']){
        //   if(userDetails[acno]['balance']> amount){
        //     userDetails[acno]['balance']-=amount;
        //     userDetails[acno]['transaction'].push({
        //       type:'debit',
        //       amount
        //     })
          
        //     return  {
        //       status:true,
        //       statusCode:200,
        //       message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
        //      }
          
        //   }
        
        // }
        // else{
        //   return {
        //     status:false,
        //     statusCode:401,
        //     message:"Invalid Password"
  
        //   }
        // }
        //  }
        //  return{
        //   status:false,
        //   statusCode:401,
        //   message:"invalid Userdetails"
        // }
        // }

        const getTransaction=(acno)=>{
        return db.User.findOne({acno}).then(
        user=>{
          if(user){
          return{
            status:true,
            statusCode:200,
           transaction:user.transaction
          }
        }
        else{
          return{
            status:false,
            statusCode:401,
           message:"user not found"
          }
        }
        //this.saveDetails()
      
      }
        )}
      
        // const getTransaction=(acno)=>{
        //   return{
        //     status:true,
        //     statusCode:200,
        //    transaction:userDetails[acno]['transaction']
        //   }
        // }


        //delete account

        const deleteAcc=(acno)=>{
          return db.User.deleteOne({acno}).then(
            user=>{
              if(user){
                return {
                  status:true,
                  statusCode:200,
                  message:"user deleted"
                }
              }
              else{
                return{
                  status:false,
                  statusCode:401,
                  message:"User not found"
                }
              }
            }
          )
        }

      module.exports={
        register,
        log,
        deposit,
        withdraw,
        getTransaction,
        deleteAcc
      }
    