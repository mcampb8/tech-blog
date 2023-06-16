const commentbtns = document.querySelectorAll(".comment-btn");

for (let i = 0; i < commentbtns.length; i++) {
    const comment = commentbtns[i];
    comment.addEventListener("click", async (e) => {
        e.preventDefault();
        const blogID = e.target.getAttribute('data-blogID')
        const commenter = document.getElementById('auth-user').value
        const userObj = {
            commenter,
            text: document.querySelector(`#comment-input-${blogID}`).value,
            blog_id: blogID,
        }
        console.log(userObj)
        const comment = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        location.reload()
    })

}