const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

function actionToDo(action){
    switch(Number(action)){
        case 1: 
             return axios.get('http://localhost:8000/books')
            .then( (res) => {
                console.log(res.data);
                loopFun()
            })
            .catch(err => console.log(err))

        case 2:
            readline.question(`Add book name to add = `, (name) => {
                let body = {};
                body["id"]=uuidv4();
                body["book_name"] = name;
                readline.question(`Author name = `, (author) => {
                    body["author"] = author
                    return axios.post('http://localhost:8000/books', body)
                    .then( (res) => {
                        console.log(res.data)
                        loopFun()
                    })
                    .catch(err => console.log(err))
                })
                
            })

    }
}

const loopFun = () => {
    readline.question(`Press 1 => Display all Books
                Press 2 => Add new Book
                Press 3 => Quit?`, (action) => {
            if(action == 3){
                readline.close();
            }
            else if(action == 1 || action == 2){
                actionToDo(Number(action))
            }
            else{
                console.log("Enter valid Input");
                loopFun()
            }
        })
            
} 

loopFun();

