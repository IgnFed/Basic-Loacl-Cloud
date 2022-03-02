import { Router } from "express";
import { normalizePath } from "../lib/normalizePath.js";
import mime from 'mime-types'
const router = Router()

router.get('/:path', (req, res, next)=>{
  try{
    const file= normalizePath(req.params.path).absolutePath
    const mimetype = mime.lookup(file)
    res.setHeader('Content-Disposition', `attachment; filename=${file}`)
    res.setHeader('Content-Type', mimetype)
    res.download(file)
  }catch(e){
    return next(e)
  }
})

export default router