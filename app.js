const express = require('express')
const mustachExpress = require('mustache-express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const app = express()


const connect = "postgres://localhost:5432/blogdb"
const db = pgp(connect)

app.use(bodyParser.urlencoded({extended: false}))

app.engine('mustache',mustachExpress())
app.use('/css',express.static('styles'))

const models = require('./models')

app.set('view engine', 'mustache')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

//Create Post
app.post('/add-new-post',(req,res) => {
    let posts = models.posts.build({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category       
    })
    posts.save().then(() => {
        res.redirect('/view-all-post')
    })
})

app.get('/view-all-post',(req,res) => {
    models.posts.findAll().then(function(posts){
         res.render('view-all-post',{posts:posts})
         console.log(posts)
        })
    })


app.post('/delete-post',(req,res) => {
    models.posts.destroy({
        where: {
          id: req.body.postId
        }
      })
      res.redirect('/view-all-post')
    })


app.post('/filter-category',(req,res) => {
    models.posts.findAll({
        where: {
           category: req.body.category
        }
    }).then((categories) => {
        res.render('view-all-post',{posts:categories})

    })
    })


//app.get('/filter-category',(req,res) => {
//   res.render('filter-category')
//})


app.get('/add-new-post',(req,res) => {
    res.render('add-new-post')
})

app.listen(3000,() => {
    console.log("Express Server running port 3000...")
})