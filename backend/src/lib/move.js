import { join } from "path";
import { access } from "fs/promises";

export const moveFile = (file, path)=>{

  const filePath = join(path, file.name)

  return new Promise((resolve, reject)=>{
    access(filePath)
      .then(()=> reject(new Error(`File ${file.name} already exists.`)))
      .catch(()=>{
        file.mv(filePath, (err)=>{
          if(err) reject(err)
          else resolve();
        })
      })
  })
}