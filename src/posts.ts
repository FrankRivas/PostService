import * as http from 'http'
import { Singleton } from '../helpers/conection'
import { obtatainDataCode } from '../helpers/errorCodes'
import { doSQLCall, insertRecord, updateRecord } from '../helpers/querieProcess'

export async function getPosts(response: http.ServerResponse) {
	const query: string = 'SELECT * FROM public.post order by created_at desc'
	let res = await doSQLCall(query)
	let statusCode = res ? 200 : 404
	let queryResult = res ? res.rows : undefined
	obtatainDataCode(response, statusCode, queryResult)
}

export async function getPost(response: http.ServerResponse, param: string) {
	const query: string = `SELECT * FROM public.post where id = ${param}`
	let res = await doSQLCall(query)
	let statusCode = res ? (res.rows['length'] > 0 ? 200 : 404) : 500
	let queryResult = res
		? res.rows['length'] > 0
			? res.rows
			: undefined
		: undefined
	obtatainDataCode(response, statusCode, queryResult)
}

export async function deletePost(response: http.ServerResponse, param: string) {
	const query: string = `DELETE FROM public.post where id = ${param}`
	let res = await doSQLCall(query)
	let statusCode = res ? (res.rowCount > 0 ? 200 : 404) : 500
	obtatainDataCode(response, statusCode)
}

export async function updatePost(
	req: http.IncomingMessage,
	res: http.ServerResponse,
	param: string
) {
	let resp = await updateRecord(req, param)
	let statusCode = resp ? 200 : 400
	let queryResult = resp ? resp.rows : undefined
	obtatainDataCode(res, statusCode, queryResult)
}

export async function createPost(
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	let resp = await insertRecord(req)
	let statusCode = resp ? 201 : 400
	let queryResult = resp ? resp.rows : undefined
	obtatainDataCode(res, statusCode, queryResult)
}
