const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "assets/views");

app.use("/assets", express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Blogs = [];

// Routing
app.get("/", (req, res) => {
  res.render("index", {
    data: "ini data dari backend/server",
  });
});

app.get("/Blog", renderBlog);
app.post("/Blog", addBlog);
app.get("/contac", renderContac);
app.get("/testimonal", renderTestimonal);
app.get("/blog-detail/:Blog_id", renderBlogDetail);
app.get("/edit-blog/:Blog_id", renderEditBlog);
app.post("/edit-blog/:Blog_id", editBlog);
app.get("/delete-blog/:Blog_id", deleteBlog);

function renderContac(req, res) {
  res.render("contac");
}

function renderBlog(req, res) {
  res.render("Blog", {
    data: [...Blogs],
  });
}

function addBlog(req, res) {
  const newBlog = {
    id: Blogs.length + 1,
    title: req.body.title,
    content: req.body.content,
    createAt: new Date(),
    author: "ande",
  };

  Blogs.push(newBlog);

  res.redirect("/Blog");
}

function renderTestimonal(req, res) {
  res.render("testimonal");
}

function renderBlogDetail(req, res) {
  const id = req.params.Blog_id;

  const Blog = Blogs.find((Blog) => Blog.id == id);

  res.render("blog-detail", {
    data: Blog,
  });
}
function renderEditBlog(req, res) {
  const id = req.params.Blog_id;

  const Blog = Blogs.find((Blog) => Blog.id == id);

  res.render("edit-blog", {
    data: Blog,
  });
}

function editBlog(req, res) {
  const id = req.params.Blog_id;

  const newBlog = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    createAt: new Date(),
    author: "ande",
  };

  const index = Blogs.findIndex((Blog) => Blog.id == id);

  Blogs[index] = newBlog;

  res.redirect("/Blog");
}

function deleteBlog(req, res) {
  const id = req.params.Blog_id;

  const index = Blogs.findIndex((Blog) => Blog.id == id);

  Blogs.splice(index, 1);

  res.redirect("/Blog");
}

// Akhir route

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
