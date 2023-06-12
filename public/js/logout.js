document.getElementById("logout").addEventListener("click",e=>{
    e.preventDefault();
    fetch("/api/users/logout",{
        method:"POST",
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})
document.getElementById("dashboard").addEventListener("click",e=>{
    e.preventDefault();
    fetch("/dashboard",{
        method:"GET",
    }).then(res=>{
        if(res.ok){
            location.assign("/dashboard")
        } else {
            alert("trumpet sound")
        }
    })
})
document.getElementById("home").addEventListener("click",e=>{
    e.preventDefault();
    fetch("/",{
        method:"GET",
    }).then(res=>{
        if(res.ok){
            location.assign("/")
        } else {
            alert("trumpet sound")
        }
    })
})