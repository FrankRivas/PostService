import { Singleton } from '../helpers/conection'
import { obtatainDataCode } from '../helpers/errorCodes'
import { ServerResponse, IncomingMessage } from 'http'
import { Client, QueryResult } from 'pg'

export async function insertRecord(
	req: IncomingMessage,
	id_post?: string
): Promise<QueryResult | void> {
	let body: string = ''
	let query: string
	try {
		await req.on('data', function(chunk) {
			body += chunk
		})
		let json = JSON.parse(body)
		let url = req.url as string
		if (/^\/posts$/.test(url)) {
			query = `INSERT INTO public.post(
                    title, content, id_user)
                    VALUES ('${json.title}', '${json.content}', ${json.id_user}) RETURNING *`
		} else {
			query = `INSERT INTO public.comment(
                    comment, user_id, id_post)
                    VALUES ('${json.comment}', ${json.user_id}, ${id_post}) RETURNING *`
		}
		let res = await doSQLCall(query)
		return res
	} catch {
		return undefined
	}
}

export async function doSQLCall(querie: string): Promise<QueryResult | void> {
	const client = Singleton.getInstance()
	try {
		let res = await client.query(querie)
		return res
	} catch {
		return undefined
	}
}

export async function updateRecord(
	req: IncomingMessage,
	param: string
): Promise<QueryResult | void> {
	let body: string = ''
	let query: string = ''
	try {
		await req.on('data', function(chunk) {
			body += chunk
		})
		let json = JSON.parse(body)

		let url = req.url as string
		if (url.match(/^\/post\/([0-9]+)$/)) {
			query = 'UPDATE public.post SET '
		} else {
			query = 'UPDATE public.comment SET '
		}

		if (json.title !== undefined) {
			query = query + `title='${json.title}'`
		}
		if (json.content !== undefined) {
			if (query.includes('title')) {
				query = query + ', '
			}
			query = query + `content='${json.content}'`
		}
		if (json.comment !== undefined) {
			query = query + `comment='${json.comment}'`
		}
		if (
			query.includes('content') ||
			query.includes('title') ||
			query.includes('comment')
		) {
			query = query + `, updated_at=now() WHERE id = ${param} RETURNING *`
			let res = await doSQLCall(query)
			return res
		} else {
			return undefined
		}
	} catch {
		return undefined
	}
}
