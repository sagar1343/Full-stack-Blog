// format date string
function FormateDate(DateAndTime) {
  const date =
    DateAndTime.slice(8, 10) +
    "/" +
    DateAndTime.slice(5, 7) +
    "/" +
    DateAndTime.slice(2, 4);

  const fulltime = DateAndTime.slice(11, 16);

  const formatedDate = fulltime + " " + date;
  return formatedDate;
}

// getting blog
async function getBlog() {
  const content = await fetch("http://127.0.0.1:8000/blog/content/");
  const blogContent = await content.json();
  return blogContent;
}

async function settingUpCards() {
  blogList = await getBlog();
  console.log(blogList);
  //setting up cards
  const card_holder = document.getElementById("card_holder");
  blogList.forEach((blog) => {
    const div = document.createElement("div");
    div.classList = "mycard";
    const blog_id = blog.id;

    div.innerHTML = `
      <div id="${blog.id}"
        class=" card h-100 d-flex "
        style="width: 18rem;">
        <div class="card-body ">
        <div class = "main_content h-100 " >
          <img  src="${blog.image}" class="card-img-top"></img>
          <h5 class="card-title">${blog.title}</h5>
          <div class="badge rounded-pill text-bg-primary mb-1">${blog.tag}</div>
          <div class="card_subhead">
            <p class="card-text">${blog.author_name}</p>
            <p class="card-text">${FormateDate(blog.date)}</p>
          </div>
          <p class="card-text description">${blog.blog_description}</p>
          <div class="usablebtn">
          <button class= "Readbtn btn btn-sm btn-dark">Read more</button>
          <div>
            <button class= "editbtn btn btn-sm btn-primary">Edit</button>
            <button class= "delbtn  btn btn-sm btn-danger">Delete</button></div>
          </div>
        </div>
        <div class ="d-flex h-100 flex-column justify-content-between d-none blog_card_content ">
          <p>${blog.blog_content}</p>
          <button class ="btn btn-dark back_btn">Back</button></div>
        </div>
      </div>`;
    card_holder.appendChild(div);
    //read Content
    const readFeature = document.getElementById("readFeature");
    const readSection = document.createElement("div");
    readSection.innerHTML = `<div class="readMoreContent d-none my-5" id="readid${blog.id}">
          <div class="readmain">
            <div class="d-flex justify-content-between">
              <div>${blog.author_name}</div>
              <div class="crossbtn" id="cross${blog.id}">
                <span class="material-symbols-outlined"> close </span>
              </div>
            </div>
            <h3 class="my-5 text-center">${blog.title}</h3>
            <div>
              <p class="readPara">
                ${blog.blog_content}
              </p>
            </div>
          </div>
        </div>`;
    readFeature.appendChild(readSection);
    const read_more = div.querySelector(".Readbtn");
    const itemtoread = document.getElementById(`readid${blog.id}`);
    read_more.addEventListener("click", () => {
      itemtoread.classList.toggle("d-none");
      card_holder.classList.toggle("d-none");
    });
    const crossbtn = document.getElementById(`cross${blog.id}`);
    crossbtn.addEventListener("click", () => {
      itemtoread.classList.toggle("d-none");
      card_holder.classList.toggle("d-none");
    });
    // delete btn
    const deleteButton = div.querySelector(".delbtn");
    deleteButton.addEventListener("click", () => {
      const del_item = document.getElementById(blog_id);
      del_item.remove();
      const del_url = blog.url;
      fetch(del_url, {
        method: "DELETE",
      });
    });

    //Edit
    const blogShowcase = document.getElementById("blogShowcase");
    const editbtn = div.querySelector(".editbtn");

    editbtn.addEventListener("click", handleEdit);
    const editAuthor = document.getElementById("Author-name");
    const editTitle = document.getElementById("title");
    const editTags = document.getElementById("tag");
    const editDescription = document.getElementById("description");
    const editfullContent = document.getElementById("fullContent");

    async function handleEdit() {
      const url = blog.url;
      const edit_blog = await fetch(url);
      edit_blog_json = await edit_blog.json();
      console.log(edit_blog_json);
      editAuthor.value = edit_blog_json.author_name;
      editTitle.value = edit_blog_json.title;
      editTags.value = edit_blog_json.tag;
      editDescription.value = edit_blog_json.blog_description;
      editfullContent.value = edit_blog_json.blog_content;
      // display
      blogShowcase.classList.toggle("d-none");
      featureEdit.classList.toggle("d-none");

      //setting updatebtn
      const updateBtn = document.getElementById("updateBtn");
      updateBtn.innerHTML = `<button id="update${blog.id}" class="btn btn-lg btn-primary">Update</button>`;

      const updatedItem = document.getElementById(`update${blog.id}`);
      updatedItem.addEventListener("click", () => {
        const updated_data = {
          title: editTitle.value,
          author_name: editAuthor.value,
          blog_description: editDescription.value,
          blog_content: editfullContent.value,
          tag: editTags.value,
        };

        console.log(updated_data);
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updated_data),
        });
      });
    }
  });
}
settingUpCards();
