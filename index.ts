import axios from "axios"
import cors from "cors"
import express from "express"


const app = express()
const puerto = 300

type Team = {
    id: number,
    name: string,
    city: string,
    titles: number
}

const equipos: Team[] = [
    {id:1,name:"Atleti",city:"Madrid",titles:22},
    {id:2,name:"Rayo Vallecano",city:"Madrid",titles:21},
    {id:3,name:"Real Madrid",city:"Madrid",titles:67},
    {id:4,name:"FC Barcelona",city:"Barcelona",titles:56},
]


app.use(cors())
app.use(express.json())


app.get("/equipos",(req,res)=>{
    res.json(equipos)
})

app.listen(puerto, ()=>{console.log("Server started at port"+puerto)})
