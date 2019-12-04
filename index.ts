import * as http from 'http'
import { routing } from './routes'
//create a server object:
http
	.createServer(async function(req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' }) // http header
		await routing(req, res)
		res.end() //end the response
	})
	.listen(3000, function() {
		console.log('server start at port 3000') //the server object listens on port 3000
	})
