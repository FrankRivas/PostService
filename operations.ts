import { Singleton } from './conection'

export function selectUsers() {
	const client = Singleton.getInstance()

	client.connect()
	client.query('SELECT * FROM public.user', (err: any, res: any) => {
		console.log(JSON.stringify(res.rows))
		client.end()
	})
}
