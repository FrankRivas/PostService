import * as http from 'http'
import { getPosts, getPost, deletePost, updatePost, createPost } from './posts'

export async function routing(
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	let url = req.url as string
	if (/^\/posts$/.test(url)) {
		if (req.method === 'GET') {
			await getPosts(req, res)
			//let json = await getPosts(req, res)
			//res.write(json)
		} else {
			await createPost(req, res)
			//let json = await createPost(req, res)
			//res.write(json)
		}
	} else if (url.match(/^\/post\/([0-9]+)/)) {
		let param = url.match(/^\/post\/([0-9]+)/)
		if (req.method === 'GET') {
			if (param !== null) {
				await getPost(req, res, param[1])
				//let json = await getPost(req, res, param[1])
				//res.write(json)
			}
		} else if (req.method === 'DELETE') {
			if (param !== null) {
				await deletePost(req, res, param[1])
				//let json = await deletePost(req, res, param[1])
				//res.write(json)
			}
		} else {
			if (param !== null) {
				await updatePost(req, res, param[1])
				//let json = await updatePost(req, res, param[1])
				//res.write(json)
			}
		}
	}
}
