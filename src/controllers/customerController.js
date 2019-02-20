const controller = {}

controller.list = (req, res) => {
	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM customer', (err, customers) => {
			if (err){
				next(err)
			} 
			res.render('customers' , {
				data: customers
			})
		})
	})
}

controller.save = (req, res) => {
	const data = req.body
	req.getConnection((err, conn) => {
		conn.query('INSERT INTO customer SET ?', [data], (err, customer) => {
			res.redirect('/')

		})
	})
}


controller.edit = (req, res) => {
	const { id }  = req.params
	req.getConnection((err, conn) => {
		conn.query('select * from customer where id = ?', [id], (err, customer) => {
			res.render('customer_edit', {

				data: customer[0]
			})
		})
	})

}


controller.update = (req, res) => {
	const { id }  = req.params
	const newCustomer = req.body

	req.getConnection((err, conn) =>{
		conn.query(' update customer set ? where id = ?', [newCustomer, id], (err, rows) => {
			res.redirect('/')
		})
	})
}


controller.delete = (req, res) => {
	const { id }  = req.params
	req.getConnection((err, conn) => {
		conn.query('delete from customer where id = ?', [id], (err, rows) => {
			res.redirect('/')
		})
	}) 
	
}

module.exports = controller