export const err = (err, req,res,next)=>{
  res.status(err.status || 500).json({
    message: err.message,
    sucess: false
  })
}