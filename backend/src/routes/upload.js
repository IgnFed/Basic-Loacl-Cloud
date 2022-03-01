import { Router } from "express";
import { moveFile } from '../lib/move.js'
import { normalizePath } from '../lib/normalizePath.js'

const router = Router();

router.post('/:path?', async (req,res, next)=>{  
  console.log(req.files)
  if(!req.files){
    return res.status(400).json({
      success: false,
      message:'No files were uploaded.'
    })
  }

  const processedPath = normalizePath(req.params.path);
  let files = req.files.file;
  if (!Array.isArray(files)) {
    files = [files];
  }

  try{
    for (const file of files){
      await moveFile(file, processedPath.absolutePath)
    }
  }catch(err){
    if(err.code) return next(err)
    return res.status(400).json({
      success:false,
      message: err.message,
      path: processedPath.relativePath
    })
  }

  return res.json({
    success:true,
    message: 'Files successfully uploaded',
    path: processedPath.relativePath
  })

});

export default router