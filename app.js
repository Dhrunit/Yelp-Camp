const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const Campground = require('./models/campground')
mongoose.connect(process.env.MONGODB_CON, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', () => {
	console.log('Database connected')
})

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
	res.render('home')
})

app.get('/makecampground', async (req, res) => {
	const camp = new Campground({
		title: 'Camp',
		description: 'lorem ipsum doler asdjas',
	})
	await camp.save()
	res.send(camp)
})

app.listen(3000, () => {
	console.log('running')
})
