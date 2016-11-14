import express from 'express'
import uaParser from 'ua-parser-js'

const app = express()

app.get('*', (req, res) => {
  const parsedUA = uaParser(req.headers['user-agent'])
  const software = `${parsedUA.os.name} ${parsedUA.os.version}`

  res.json({
    "ipaddress": req.ip,
    "language": req.acceptsLanguages()[0],
    "software": software
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
