import { Router } from "express";
import fs from 'fs/promises'
import { normalizePath } from "../lib/normalizePath.js";

const router = Router()

router.post('/:path?', async (req,res, next)=>{
  const processedPath = normalizePath(req.params.path) 
  try{
    const path = processedPath.absolutePath
    await fs.mkdir(`${path}/${req.body.name}`)
  }catch(e){
    return next(e)
  }

  return res.json({
    success:true,
    message: 'Directory Created',
    path: processedPath.relativePath
  })
})

export default router