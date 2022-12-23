const express = require('express')
const app = express()
const port = 3000

const toDoLists = ["안녕"]

app.set('view engine','ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req, res) => {
    res.render('index', {toDoListTitle: '오늘의 할일: ' + toDoLists.length, toDoLists: toDoLists})
})
//add_list에 대한 요청에 대해서 처리
app.post('/add_list', (req,res)=>{
    const newContent = req.body.content
    console.log(newContent + '추가')
    toDoLists.push(newContent)
    res.redirect('/')

})

// 실행되면 connected 
app.listen(port, () => {
    console.log('connected!')
})