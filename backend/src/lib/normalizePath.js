import { join } from "path"
import { storage } from "../storage.js"

export const normalizePath = (path)=>{
  const slashType = process.platform === 'win32'? '\\' : '/'
  const relativePath = path ? path.replace(/--/g, slashType) : slashType
  const absolutePath = join(storage, relativePath)
  return {relativePath, absolutePath}
}