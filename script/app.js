let chat = document.getElementById("chat")
let chats = document.getElementById("chats")
var email = document.getElementById("email")
var pass = document.getElementById("pass")
var name1 = document.getElementById("name1")
var onlineusers = document.getElementById("onlineusers")
var mainuser;

const auth = () => {
    window.open("chat.html")
}




const sendChat = () => {
    

    // console.log(chat.value)
    
    // chats.innerHTML = (chat.value)
    let database = firebase.database()
    database.ref("database/chat").push({
        message: (`${mainuser} says: ${chat.value}`)
   })
    // console.log(a)
}




const getUsers = () => {
}


const getessage = () => {

}

const signup = () => {

    firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
        .then(function (value) {
            alert("Signup successful please login")
            // console.log(typeof(name1.value))
            addUserDB(name1.value, email.value)
            // console.log(name1.value,email.value,"this is result")
            email.value = ""
            pass.value = ""
        })

        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert("=Something went wrong, user alraeady exists or password doesn't match policy requirement or please fill email and password fields for signing up ")
        });

}


const addUserDB = (name12, email12) => {
    let database = firebase.database();
    let databasekey = database.ref("database/users").push().key
    database.ref("database/users").child(databasekey).set({
        key1: databasekey,
        username1: name12,
        email1: email12
    })
        .then(function (value) {
            console.log("user added in database")
        })
        .catch(function (error) {
            console.log("something went wrong in database")
        })
    // console.log(email.value)
}
// addUserDB("asif","asifahmed1us@hotmail.com")







const signin = () => {
    // console.log(typeof(name1.value))
    firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
        .then(function (value) {
            // console.log("signin successful")            
            let database = firebase.database();
            let databasekey = database.ref("database/users").push().key
            database.ref("database/activestatus").child(databasekey).set({
                email: email.value,
                status: "Online"
            })
                .then(function (value) {
                    console.log("login successful")
                    window.open("chat.html?name="+email.value)
                })
                .catch(function (error) {
                    console.log("something went wrong in database")
                })
        })

        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert("user doesn't exists or password / email is incorrect")
        });
}


let onlineChk = () => {
    
    let database = firebase.database();
    database.ref("database/users").on("child_added",function (data){
        // var key123 = data.key
        // let userlist = document.createTextNode(data.val().username1)
        let userlistp = document.createElement("option")
        userlistp.innerHTML += data.val().username1
        // userlistp.appendChild(userlist)
        onlineusers.appendChild(userlistp)         
        const params = new URLSearchParams(window.location.search)
        mainuser = params.get("name")
        console.log(mainuser)
        
    })


    // let database = firebase.database();
    database.ref("database/chat").on("child_added",function (data){
        let textNode = document.createTextNode(data.val().message)
        let chatp = document.createElement("p")
        chatp.appendChild(textNode)
        chats.appendChild(chatp)       
    })



}