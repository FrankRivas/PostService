import * as http from 'http'
import { obtatainDataCode } from '../helpers/errorCodes'
import {
	getComments,
	createComment,
	getComment,
	deleteComment,
	updateComment
} from '../src/comments'
export async function routeComments(
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	let url = req.url as string
	if (url.match(/^\/post\/([0-9]+)\/comments/)) {
		let param = url.match(/^\/post\/([0-9]+)\/comments/)
		if (req.method === 'GET') {
			if (param !== null) {
				await getComments(res, param[1])
			}
		} else if (req.method === 'POST') {
			if (param !== null) {
				await createComment(req, res, param[1])
			}
		} else {
			obtatainDataCode(res, 405)
		}
	} else if (url.match(/^\/comment\/([0-9]+)$/)) {
		let param = url.match(/^\/comment\/([0-9]+)/)
		if (req.method === 'GET') {
			if (param !== null) {
				await getComment(res, param[1])
			}
		} else if (req.method === 'DELETE') {
			if (param !== null) {
				await deleteComment(res, param[1])
			}
		} else if (req.method === 'PUT') {
			if (param !== null) {
				await updateComment(req, res, param[1])
			}
		} else {
			obtatainDataCode(res, 405)
		}
	} else {
		obtatainDataCode(res, 405)
	}
}
