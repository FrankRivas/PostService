import * as http from 'http'
import { Singleton } from './conection'
import { obtatainDataCode } from './errorCodes'

export async function getPosts(response: http.ServerResponse) {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(
			'SELECT * FROM public.post order by created_at desc'
		)
		obtatainDataCode(response, 200, res.rows)
	} catch {
		obtatainDataCode(response, 500)
	}
}

export async function getPost(response: http.ServerResponse, param: string) {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(
			`SELECT * FROM public.post where id = ${param}`
		)
		if (res.rows['length'] > 0) {
			obtatainDataCode(response, 200, res.rows)
		} else {
			obtatainDataCode(response, 404)
		}
	} catch {
		obtatainDataCode(response, 500)
	}
}

export async function deletePost(response: http.ServerResponse, param: string) {
	const client = Singleton.getInstance()
	try {
		await client.query(`DELETE FROM public.post_tag where id_post = ${param}`)
		await client.query(`DELETE FROM public.comment where id_post = ${param}`)
		let erased = await client.query(
			`DELETE FROM public.post where id = ${param}`
		)
		if (erased.rowCount > 0) {
			obtatainDataCode(response, 200)
		} else {
			obtatainDataCode(response, 404)
		}
	} catch {
		obtatainDataCode(response, 500)
	}
}

export async function updatePost(
	req: http.IncomingMessage,
	res: http.ServerResponse,
	param: string
) {
	const client = Singleton.getInstance()
	let body: string = ''
	let query: string = 'UPDATE public.post SET '
	try {
		await req.on('data', function(chunk) {
			body += chunk
		})
		let json = JSON.parse(body)
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
			let resp = await client.query(
				query + `, updated_at=now() WHERE id = ${param} RETURNING *`
			)
			if (resp.rowCount === 0) {
				obtatainDataCode(res, 404)
			} else {
				obtatainDataCode(res, 200, resp.rows)
			}
		} else {
			obtatainDataCode(res, 400)
		}
	} catch {
		obtatainDataCode(res, 500)
	}
}

export async function createPost(
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	const client = Singleton.getInstance()
	let body: string = ''
	try {
		await req.on('data', function(chunk) {
			body += chunk
		})
		let json = JSON.parse(body)
		let resp = await client.query(
			`INSERT INTO public.post(
				title, content, id_user)
				VALUES ('${json.title}', '${json.content}', ${json.id_user}) RETURNING *`
		)
		obtatainDataCode(res, 201, resp.rows)
	} catch {
		obtatainDataCode(res, 500)
	}
}
