import 'dotenv/config'

const storage = process.env.DIR_STORAGE
if(!storage){
  console.error(
    'Storage path is not defined, ',
    'set a DIR_STORAGE enviroment variable.'
  )
  process.exit(1)
}

export { storage }