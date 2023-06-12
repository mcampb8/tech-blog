const commentbtn = document.getElementById("comment")

for (let i = 0; i < commentbtn.length; i++) {
    const e = commentbtn[i];
    e.addEventListener("click",async (e)=>{
       blogID = e.getAttribute('data-blogID')
       const userObj = {
        text:document.querySelector("#comment-input").value,
        blog_id:blogID
    }
    console.log(userObj)
      const comment = await fetch("/api/comments",{
           method:"POST",
           body:JSON.stringify(userObj),
           headers:{
               "Content-Type":"application/json"
           }
       })
       location.reload()
   })
   
}