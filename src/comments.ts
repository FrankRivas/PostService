import * as http from 'http'
import { Singleton } from '../helpers/conection'
import { obtatainDataCode } from '../helpers/errorCodes'
import { doSQLCall, insertRecord, updateRecord } from '../helpers/querieProcess'

export async function getComments(
	response: http.ServerResponse,
	id_post: string
) {
	const query: string = `SELECT *
	FROM public.comment where id_post = ${id_post}`
	let res = await doSQLCall(query)
	let statusCode = res ? 200 : 404
	let queryResult = res ? res.rows : undefined
	obtatainDataCode(response, statusCode, queryResult)
}

export async function createComment(
	req: http.IncomingMessage,
	res: http.ServerResponse,
	id_post: string
) {
	let resp = await insertRecord(req, id_post)
	let statusCode = resp ? 201 : 400
	let queryResult = resp ? resp.rows : undefined
	obtatainDataCode(res, statusCode, queryResult)
}

export async function getComment(response: http.ServerResponse, param: string) {
	const query: string = `SELECT * FROM public.comment where id = ${param}`
	let res = await doSQLCall(query)
	let statusCode = res ? (res.rows['length'] > 0 ? 200 : 404) : 500
	let queryResult = res
		? res.rows['length'] > 0
			? res.rows
			: undefined
		: undefined
	obtatainDataCode(response, statusCode, queryResult)
}

export async function deleteComment(
	response: http.ServerResponse,
	param: string
) {
	const query: string = `DELETE FROM public.comment where id = ${param}`
	let res = await doSQLCall(query)
	let statusCode = res ? (res.rowCount > 0 ? 200 : 404) : 500
	obtatainDataCode(response, statusCode)
}

export async function updateComment(
	req: http.IncomingMessage,
	res: http.ServerResponse,
	param: string
) {
	let resp = await updateRecord(req, param)
	let statusCode = resp ? 200 : 400
	let queryResult = resp ? resp.rows : undefined
	obtatainDataCode(res, statusCode, queryResult)
}
