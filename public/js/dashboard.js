document.querySelector("form").addEventListener("submit",e=>{
    e.preventDefault();
    const blogObj = {
        title:document.querySelector("#title").value,
        body:document.querySelector("#body").value,
    }
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/"
        } else {
            alert("trumpet sound")
        }
    })
})

const allDelBtns = document.querySelectorAll(".del-btn");
allDelBtns.forEach(button=>{
    button.addEventListener("click",()=>{
        const idToDel = button.getAttribute("blog-id");
        fetch(`/api/blogs/${idToDel}`,{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
                location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
})
const allUpdateBtns = document.querySelectorAll(".update-btn");
allUpdateBtns.forEach(button=>{
    button.addEventListener("click",()=>{
        const idToUpdate = button.getAttribute("blog-id");
        console.log("idToUpdate",idToUpdate);
        const taskObj ={
            body: document.querySelector("#blog").value,
        }
        fetch(`/api/blogs/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(taskObj),
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then(res=>{
            if(res.ok){
                location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
})
