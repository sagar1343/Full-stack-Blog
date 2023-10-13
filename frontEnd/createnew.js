const contentURL = "http://127.0.0.1:8000/blog/content/";

async function postBlog(data) {
  try {
    const blog_content = await fetch(contentURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("BAD REQUEST ", error);
  }
}

const author_name = document.getElementById("Author-name");
const title = document.getElementById("title");
const description = document.getElementById("description");
const fullContent = document.getElementById("fullContent");
const tag = document.getElementById("tag");
const createBtn = document.getElementById("createBtn");
createBtn.addEventListener("click", () => {
  const data = {
    title: title.value,
    author_name: author_name.value,
    blog_description: description.value,
    blog_content: fullContent.value,
    tag: tag.value,
  };
  console.log(data);
  postBlog(data).then(() => {
    author_name.value = "";
    title.value = "";
    description.value = "";
    fullContent.value = "";
    tag.value = "";
  });
});
