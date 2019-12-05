import { ServerResponse } from 'http'

enum codes {
	'OK' = 200,
	'Created' = 201,
	'No Content' = 204,
	'Bad Request' = 400,
	'Unauthorized' = 401,
	'Forbidden' = 403,
	'Not Found' = 404,
	'Method Not Allowed' = 405,
	'Conflict' = 409,
	'Internal Server Error' = 500,
	'Service Unavailable' = 503
}

export function obtatainDataCode(
	res: ServerResponse,
	code: number,
	jsonData?: any
): void {
	res.writeHead(code, { 'Content-type': 'application/json' })
	if (jsonData !== undefined) {
		res.write(JSON.stringify(jsonData))
	} else {
		res.write(JSON.stringify({ code: code, msg: `${codes[code]}` }))
	}
}
