import uaParser from 'ua-parser-js'

export default function requestHeaderParser (req, res) {
  const parsedUA = uaParser(req.headers['user-agent'])
  const software = `${parsedUA.os.name} ${parsedUA.os.version}`

  res.json({
    'ipaddress': req.ip,
    'language': req.acceptsLanguages()[0],
    'software': software
  })
}
