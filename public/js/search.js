
const search=()=>{
    let btn =document.querySelector("#Btn-Search");
    let inputValue=document.querySelector("#inputValue");
    btn.addEventListener("click",(e)=>{
     e.preventDefault()
     let inputSearch =inputValue.value.toUpperCase();
     if(dbURL.location === inputSearch){ 
       console.log(dbURL.location)
     }
     console.log(inputSearch)
     console.log("btn cliked for searching on listings")
    })
    }
    search()