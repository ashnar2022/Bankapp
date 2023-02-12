//server Creation

//1.Import express
const express =require('express')

//import jsonwebtoken
const jwt = require('jsonwebtoken');

//import cors
const cors =require('cors')

const dataService = require('./services/dataServices')

//2. Create an app using the express

const app= express()
app.use(express.json())

//give command to share data via cors 
app.use(cors({
    origin:['http://localhost:4200','http://192.168.0.177:8080',
    'http://127.0.0.1:8080']
}))

//3. create a port number

app.listen(3000,() =>{
    console.log('listen on the port 3000');
})

//application Specific  middleware
const  appMiddleware = (req,res,next)=>{
    console.log('application Specific  middleware');
    next();
}

app.use(appMiddleware)

//router specific middleware

const jwtRouterMiddleware = (req,res,next)=>{
    try{
    console.log('Router specific middleware');
    const token=req.headers['x-access-token'];
    console.log(token);
    const data=jwt.verify(token,'superkey2023')
    console.log(data);
    next();
}
catch{
    //422 -unprocessable entity
    res.status(422).json({
         statuscode:422,
         status:false,
         message:'please login first'
    })
}
}

//4.Resolving http requests
// app.get('/',(req,res)=>{
//     res.send('Get http request')
// })
// app.post('/',(req,res)=>{
//     res.send('Post http request')
// })
// app.put('/',(req,res)=>{
//     res.send('Put http request')
// })
// app.patch('/',(req,res)=>{
//     res.send('Patch http request')
// })
// app.delete('/',(req,res)=>{
//     res.send('delete http request')
// })

//Api calls
// 4. Register request
app.post('/register',(req,res)=>{
dataService.register(req.body.acno,req.body.username,req.body.password).then(//(1000,anoop,1000 (given by user))
result=>{
res.status(result.statusCode).json(result)
}
)


// if(result){                                           /
//     res.send('Register successful')                   /
//     console.log(req.body);                            /
// }                                                     /        instead of this status and message given in dataservice
// else{                                                 /
//     res.send('register failed')                       /
// }                                                     /
   
})

//5.login request
app.post('/log',(req,res)=>{
    dataService.log(req.body.acno,req.body.password).then(//(1000,anoop,1000 (given by user))
    result=>{
    res.status(result.statusCode).json(result)
})
})

//5.Deposit request
app.post('/deposit', jwtRouterMiddleware,(req,res)=>{
    dataService.deposit(req.body.acno,req.body.password,req.body.amount).then(//(1000,anoop,1000 (given by user))
   result=>{
    res.status(result.statusCode).json(result)
})
})

//6. withdraw request
app.post('/withdraw',jwtRouterMiddleware,(req,res)=>{
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount).then(//(1000,anoop,1000 (given by user))
    result=>{
    res.status(result.statusCode).json(result)
})
})

//6.transation  request
app.post('/transaction',jwtRouterMiddleware,(req,res)=>{
    dataService.getTransaction(req.body.acno).then(//(1000,anoop,1000 (given by user))
    result=>{
    res.status(result.statusCode).json(result)
})
})


//7. Delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
 dataService.deleteAcc(req.params.acno).then(
    result=>{
        res.status(result.statusCode).json(result)
    }
 )
})
