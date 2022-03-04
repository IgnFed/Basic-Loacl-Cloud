import { useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver'

export default function useApi() {
  const API = axios.create({ baseURL: process.env.API_URL })
  const [apiData, setApiData] = useState({success:false, data:{directories: [], files: []} })
  const [isLoading, setIsLoading] = useState(false)

  async function call(request) {
    try {
      setIsLoading(true)
      return (await request()).data
    } catch (e) {
      console.log(e)
    }
  }

  function getContent(path) {
    return call(() => API.get(`/content/${path}`))
      .then((data = {}) => {
        setApiData(data)
        setIsLoading(false)
      })
  }
  function uploadContent(path, files) {
    return call(() => API.post(`/upload/${path}`, files))
      .then((data = {}) => {
        setApiData(data)
        setIsLoading(false)
      })
  }
  function uploadDir(path, name) {
    return call(() => API.post(`/dir/${path}`, { name }))
      .then((data = {}) => {
        setApiData(data)
        setIsLoading(false)
      })
  }
  function downloadContent(path, file) {
    const apiPath = process.env.API_URL
    return saveAs(`${apiPath}/download/${path}`, file)
  }

  return ({
    apiData,
    isLoading,
    getContent,
    uploadContent,
    uploadDir,
    downloadContent
  })
}