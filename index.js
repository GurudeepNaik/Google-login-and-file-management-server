const express=require("express");
const fileupload=require("express-fileupload");
const cors=require("cors");
const mongoose=require("mongoose");
const route = require("./Routes/routes");
const register = require("./Routes/register");
const app = express();
const PORT=7000;

app.use(cors());
app.use(
    fileupload({
        createParentPath: true,
    }),
    );
    mongoose.connect('mongodb://localhost:27017/myapp',(err)=>{
        if(err) console.log(err);
        else console.log("database Connected");
    })
    
app.use(express.json());
app.use("/files", route);
app.use("/register", register);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/Files/:name", async (req, res) => {
    try {
      res.sendFile(__dirname + `/uploads/${req.params.name}`);
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: err.message,
      });
    }
  });

app.get('*',(req,res)=>{
    res.status(404).json({
        status:"Failed",
        message:"Page Not Found"
    })
})

app.listen(PORT,()=>{
    console.log("App is Listning At http://localhost:7000");
})