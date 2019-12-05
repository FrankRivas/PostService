import * as http from 'http'
import { routePosts } from './postRoutes'
import { obtatainDataCode } from './errorCodes'
import { routeComments } from './commentRoutes'

export async function routing(
	req: http.IncomingMessage,
	res: http.ServerResponse
) {
	let url = req.url as string
	if (/^\/posts$/.test(url) || url.match(/^\/post\/([0-9]+)$/)) {
		await routePosts(req, res)
	} else if (
		url.match(/^\/post\/([0-9]+)\/comments/) ||
		url.match(/^\/comment\/([0-9]+)$/)
	) {
		await routeComments(req, res)
	} else {
		obtatainDataCode(res, 405)
	}
}
