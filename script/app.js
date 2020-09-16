const auth = ()=>{
    window.open("chat.html")
}

let chat = document.getElementById("chat")
let chats = document.getElementById("chats")
const sendChat = ()=>{
    console.log(chat.value)
    let textNode = document.createTextNode(chat.value)
    let chatp = document.createElement("p")
    chatp.appendChild(textNode)
    chats.appendChild(chatp)
    // chats.innerHTML = (chat.value)
    var a = firebase.database()
    console.log(a)
}

const getUsers = ()=>{
}


const getessage = ()=>{

}