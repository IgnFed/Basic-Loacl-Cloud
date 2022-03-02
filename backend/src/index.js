import express from 'express'
import cors from 'cors'
import fileupload from 'express-fileupload'
import { err } from './middlewares/err.js'
import uploadRouter from './routes/upload.js'
import contentRouter from './routes/content.js'
import downloadRouter from './routes/download.js'

const app = express()

app.use(cors())
app.use(fileupload())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/content', contentRouter)
app.use('/upload', uploadRouter)
app.use('/download', downloadRouter)

app.use(err)

app.listen(process.env.PORT || 4000, ()=>{
  console.log(`Listening on http://localhost:${process.env.PORT || 4000}`)
})