import * as http from 'http'
import { Singleton } from './conection'
import { obtatainDataCode } from './errorCodes'

export async function getComments(
	response: http.ServerResponse,
	id_post: string
) {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(
			`SELECT *
            FROM public.comment where id_post = ${id_post}`
		)
		obtatainDataCode(response, 200, res.rows)
	} catch {
		obtatainDataCode(response, 500)
	}
}

export async function createComment(
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
		console.log(json)
		let resp = await client.query(
			`INSERT INTO public.comment(
                comment, user_id, id_post)
                VALUES ('${json.comment}', ${json.user_id}, ${json.id_post}) RETURNING *`
		)
		obtatainDataCode(res, 201, resp.rows)
	} catch {
		obtatainDataCode(res, 500)
	}
}

export async function getComment(response: http.ServerResponse, param: string) {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(
			`SELECT * FROM public.comment where id = ${param}`
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

export async function deleteComment(
	response: http.ServerResponse,
	param: string
) {
	const client = Singleton.getInstance()
	try {
		let erased = await client.query(
			`DELETE FROM public.comment where id = ${param}`
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

export async function updateComment(
	req: http.IncomingMessage,
	res: http.ServerResponse,
	param: string
) {
	const client = Singleton.getInstance()
	let body: string = ''
	let query: string = 'UPDATE public.comment SET '
	try {
		await req.on('data', function(chunk) {
			body += chunk
		})
		let json = JSON.parse(body)
		if (json.comment !== undefined) {
			query = query + `comment='${json.comment}'`
		}
		if (query.includes('comment')) {
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
