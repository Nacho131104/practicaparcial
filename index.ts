
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

// Obtener todos los equipos
app.get("/equipos", (req, res) => {
    res.json(equipos)
})

// Obtener equipos por ciudad
app.get("/equipos/city/:city", (req, res) => {
    const city = req.params.city
    if (!city) {
        return res.status(404).send("Error: se necesita una ciudad")
    }

    const eqs = equipos.filter((e) => e.city.toLowerCase() === city.toLowerCase())
    res.status(200).json(eqs)
})

// Obtener equipo por ID
app.get("/equipo/:id", (req, res) => { // se pde usar query y no pones el /:id
    const id = parseInt(req.params.id)
    const equipo = equipos.find((e) => e.id === id)

    if (!equipo) {
        return res.status(404).send("Equipo no encontrado")
    }

    res.status(200).json(equipo)
})


app.post("/equipo",(req,res)=>{

    const id = equipos.length +1

    const name = req.body.name
    const city = req.body.city
    const titles = parseInt(req.body.titles)

    if(!name || !city || !titles)return  res.status(400).send("Parametros incompletos")

    const equipoEncontrado = equipos.find(e => e.name.toLowerCase() === name.toLowerCase())
    if(equipoEncontrado) return res.status(400).send("Este equipo ya esta")

    const equipo = {
        id:id,
        ...req.body
    }

    equipos.push(equipo)
    res.status(200).json(equipo)

})


app.put("/equipo", (req, res) => {
    const { id, name, city, titles } = req.body

    const idNum = parseInt(id)
    if (!idNum) return res.status(400).send("Se necesita un ID válido")

    if (!name && !city && titles === undefined) {
        return res.status(400).send("Se necesita al menos un campo para actualizar")
    }

    const equipoIndex = equipos.findIndex(e => e.id === idNum)
    const equipo = equipos[equipoIndex]

    if (name) equipo!.name = name
    if (city) equipo!.city = city
    if (titles !== undefined) equipo!.titles = titles
    res.status(200).json(equipos[equipoIndex])
})


app.listen(puerto, () => {
    console.log("Server started at port " + puerto)
})
