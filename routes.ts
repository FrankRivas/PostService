import * as http from 'http'
import { getPosts, getPost, deletePost, updatePost, createPost } from './posts'
import { obtatainDataCode } from './errorCodes'

export async function routing(
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	let url = req.url as string
	if (/^\/posts$/.test(url)) {
		if (req.method === 'GET') {
			await getPosts(res)
		} else if (req.method === 'POST') {
			await createPost(req, res)
		} else {
			obtatainDataCode(res, 405)
		}
	} else if (url.match(/^\/post\/([0-9]+)/)) {
		let param = url.match(/^\/post\/([0-9]+)/)
		if (req.method === 'GET') {
			if (param !== null) {
				await getPost(res, param[1])
			}
		} else if (req.method === 'DELETE') {
			if (param !== null) {
				await deletePost(res, param[1])
			}
		} else if (req.method === 'PUT') {
			if (param !== null) {
				await updatePost(req, res, param[1])
			}
		} else {
			obtatainDataCode(res, 405)
		}
	}
}
