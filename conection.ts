export let Singleton = (function() {
	let instance: any

	function createInstance() {
		const { Client } = require('pg')

		const client = new Client({
			user: 'frank',
			host: 'localhost',
			database: 'posts',
			password: 'applaudostudio',
			port: 5432
		})

		return client
	}

	return {
		getInstance: function() {
			if (!instance) {
				instance = createInstance()
			}
			return instance
		}
	}
})()
