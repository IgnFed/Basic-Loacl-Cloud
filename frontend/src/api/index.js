import axios from 'axios'

export default new class Api{
  constructor(){
    this.api = axios.create({
      baseURL: process.env.API_URL
    })
  }

  async #call(request){
    try{
      return (await request()).data
    }catch(e){
      console.log(e)
    }
  }

  getContent(path){
    return this.#call(()=>this.api.get(`/content/${path}`))
  }
  uploadContent(path, files){
    return this.#call(()=>this.api.post(`/upload/${path}`,files))
  }
}