import express from "express"
import { config } from "./database/config"
const app = express()
const port = `${config.port}`

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
export default app;