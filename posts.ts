import * as http from 'http'
import { Singleton } from './conection'

export async function getPosts(
	request: http.IncomingMessage,
	response: http.ServerResponse
) {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(
			'SELECT * FROM public.post order by created_at desc'
		)
		response.writeHead(200, { 'Content-type': 'application/json' })
		response.write(JSON.stringify(res.rows))
		//return JSON.stringify(res.rows)
	} catch {
		response.writeHead(500, { 'Content-type': 'application/json' })
		response.write(JSON.stringify({ code: 500, msg: 'Internal Server Error' }))
		//return JSON.stringify({ error: 'Error' })
	}
}

export async function getPost(
	request: http.IncomingMessage,
	response: http.ServerResponse,
	param: string
) {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(
			`SELECT * FROM public.post where id = ${param}`
		)
		if (res.rows['length'] > 0) {
			response.writeHead(200, { 'Content-type': 'application/json' })
			response.write(JSON.stringify(res.rows))
		} else {
			response.writeHead(404, { 'Content-type': 'application/json' })
			response.write(JSON.stringify({ code: 404, msg: 'Not Found' }))
		}

		//return JSON.stringify(res.rows)
	} catch {
		response.writeHead(500, { 'Content-Type': 'application/json' })
		response.write(JSON.stringify({ code: 500, msg: 'Internal Server Error' }))
		//return JSON.stringify({ error: 'Error' })
	}
}

export async function deletePost(
	request: http.IncomingMessage,
	response: http.ServerResponse,
	param: string
) {
	const client = Singleton.getInstance()
	try {
		await client.query(`DELETE FROM public.post_tag where id_post = ${param}`)
		await client.query(`DELETE FROM public.comment where id_post = ${param}`)
		let erased = await client.query(
			`DELETE FROM public.post where id = ${param}`
		)
		let message = {
			code: 200,
			msg: 'Success!'
		}
		console.log(erased.rows['length'])
		console.log(erased.rowCount)
		if (erased.rowCount > 0) {
			response.writeHead(200, { 'Content-Type': 'application/json' })
			response.write(JSON.stringify(message))
		} else {
			response.writeHead(404, { 'Content-Type': 'application/json' })
			response.write(JSON.stringify({ code: 404, msg: 'Not Found' }))
		}
		//return JSON.stringify(message)
	} catch {
		//return JSON.stringify({ error: 'Error' })
		response.writeHead(500, { 'Content-Type': 'application/json' })
		response.write(JSON.stringify({ code: 500, msg: 'Internal Server Error' }))
	}
}

export async function updatePost(
	req: http.IncomingMessage,
	res: http.ServerResponse,
	param: string
) {
	const client = Singleton.getInstance()
	let body: string = ''
	let json: any
	let query: string = 'UPDATE public.post SET '
	try {
		await req.on('data', function(chunk) {
			body += chunk
		})
		json = JSON.parse(body)
		if (json.title !== undefined) {
			query = query + `title='${json.title}'`
		}
		if (json.content !== undefined) {
			if (query.includes('title')) {
				query = query + ', '
			}
			query = query + `content='${json.content}'`
		}
		if (query.includes('content') || query.includes('title')) {
			let resp = await client.query(query + `WHERE id = ${param} RETURNING *`)
			console.log(resp.rowCount)
			if (resp.rowCount === 0) {
				res.writeHead(404, { 'Content-type': 'application/json' })
				res.write(JSON.stringify({ code: 404, msg: 'Not Found' }))
			} else {
				res.writeHead(200, { 'Content-type': 'application/json' })
				res.write(JSON.stringify(resp.rows))
			}
			//return JSON.stringify(resp.rows)
		} else {
			res.writeHead(400, { 'Content-Type': 'application/json' })
			res.write(JSON.stringify({ code: 400, msg: 'Bad Request' }))
			//eturn JSON.stringify({ error: 'BAD Parameters' })
		}
	} catch (err) {
		res.writeHead(500, { 'Content-Type': 'application/json' })
		res.write(JSON.stringify({ code: 500, msg: 'Internal Server Error' }))
		//return JSON.stringify({ error: 'error 500' })
	}
}

export async function createPost(
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	const client = Singleton.getInstance()
	let body: string = ''
	let json: any
	try {
		await req.on('data', function(chunk) {
			body += chunk
		})
		json = JSON.parse(body)
		let resp = await client.query(
			`INSERT INTO public.post(
				title, content, id_user)
				VALUES ('${json.title}', '${json.content}', ${json.id_user}) RETURNING *`
		)
		res.writeHead(201, { 'Content-Type': 'application/json' })
		res.write(JSON.stringify(resp.rows))
		//return JSON.stringify(resp.rows)
	} catch {
		res.writeHead(500, { 'Content-Type': 'application/json' })
		res.write(JSON.stringify({ code: 500, msg: 'Internal Server Error' }))
		//return JSON.stringify({ error: 'error 500' })
	}
}
