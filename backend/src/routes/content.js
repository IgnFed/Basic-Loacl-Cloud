import { Router  } from 'express'
import { opendir }  from 'fs/promises'
import path from 'path'
import { normalizePath } from '../lib/normalizePath.js'

const router = Router()

router.get('/:dir?', async (req,res, next)=>{

  const processedPath = normalizePath(req.params.dir)
  const data = {files: [] , directories: []}

  try{
    const dir = await opendir(path.join(processedPath.absolutePath))
    for await (const dirent of dir){
      if(dirent.isDirectory()) data.directories.push(dirent.name)
      else data.files.push(dirent.name)
    }
  }
  catch(e){
    if(e.code) return next(e)
    return res.json({
      success:false,
      message: 'Error'
    })
  }

  return res.json({
    success:true,
    data,
  })
})


export default router