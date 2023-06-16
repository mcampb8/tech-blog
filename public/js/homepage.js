const addCommentbtns = document.querySelectorAll(".comment-btn");

for (let i = 0; i < addCommentbtns.length; i++) {
    const comment = addCommentbtns[i];
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
const updatebtns= document.querySelectorAll(".update-btn")
for (let i = 0; i < updatebtns.length; i++) {
    const comment = updatebtns[i];
    comment.addEventListener("click", async (e) => {
        e.preventDefault();
        const commentID = e.target.getAttribute('data-commentID')
        const commenter = document.getElementById('auth-user').value
        const userObj = {
            commenter,
            text: document.querySelector(`#comment-input-${blogID}`).value,
            id: commentID,
        }
        console.log("userOBJ:",userObj)
        const comment = await fetch("/api/comments", {
            method: "PUT",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        location.reload()
    })
}