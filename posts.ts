import * as http from 'http'
import { Singleton } from './conection'

export async function getPosts() {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(
			'SELECT * FROM public.post order by created_at desc'
		)
		return JSON.stringify(res.rows)
	} catch {
		return JSON.stringify({ error: 'Error' })
	}
}

export async function getPost(param: string) {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(
			`SELECT * FROM public.post where id = ${param}`
		)
		return JSON.stringify(res.rows)
	} catch {
		return JSON.stringify({ error: 'Error' })
	}
}

export async function deletePost(param: string) {
	const client = Singleton.getInstance()
	try {
		await client.query(`DELETE FROM public.post_tag where id_post = ${param}`)
		await client.query(`DELETE FROM public.comment where id_post = ${param}`)
		await client.query(`DELETE FROM public.post where id = ${param}`)
		let message = {
			code: 200,
			message: 'Success!'
		}
		return JSON.stringify(message)
	} catch {
		return JSON.stringify({ error: 'Error' })
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
			return JSON.stringify(resp.rows)
		} else {
			return JSON.stringify({ error: 'BAD Parameters' })
		}
	} catch (err) {
		return JSON.stringify({ error: 'error 500' })
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
		return JSON.stringify(resp.rows)
	} catch {
		return JSON.stringify({ error: 'error 500' })
	}
}
