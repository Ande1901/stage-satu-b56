const express = require("express");
const app = express();
const port = 3000;
const db = require("./src/db");
const { QueryTypes } = require("sequelize");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/uploadImage/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

app.set("view engine", "hbs");
app.set("views", "assets/views");
app.set("trust proxy", 1);

app.use("/assets", express.static("assets"));
app.use("/uploadImage", express.static("uploadImage"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "alexa",
    cookie: { maxAge: 3600000, secure: false, httpOnly: true },
    saveUninitialized: true,
    resave: false,
    store: new session.MemoryStore(),
  })
);

app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin || false;
  res.locals.user = req.session.user || {};
  next();
});

// Routing
app.get("/", (req, res) => {
  const isLogin = req.session.isLogin;
  const userId = req.session.userId;
  if (!isLogin || !userId) {
    res.redirect("/login");
    return;
  }

  res.render("index", {
    data: "ini data dari backend/server",
    isLogin: isLogin,
  });
});

app.get("/Blog", renderBlog);
app.post("/Blog", upload.single("image"), addBlog);
app.get("/contac", renderContac);
app.get("/testimonal", renderTestimonal);
app.get("/blog-detail/:Blog_id", renderBlogDetail);
app.get("/edit-blog/:Blog_id", renderEditBlog);
app.post("/edit-blog/:Blog_id", upload.single("image"), editBlog);
app.get("/delete-blog/:Blog_id", deleteBlog);
app.get("/register", renderRegister);
app.get("/login", renderLogin);
app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);

function renderContac(req, res) {
  res.render("contac");
}

async function renderBlog(req, res) {
  const Blogs = await db.query("select * from public.project", {
    type: QueryTypes.SELECT,
  });
  console.log(Blogs);
  res.render("Blog", {
    data: [...Blogs],
  });
}

async function addBlog(req, res) {
  const newProject = `INSERT INTO public.project(
    title, description, star_date, end_date, image, "createAt")
    VALUES ($1, $2, $3, $4, $5, now());`;

  const values = [
    req.body.title,
    req.body.content,
    req.body.startDate,
    req.body.endDate,
    req?.file?.filename,
  ];
  console.log(values);
  await db.query(newProject, {
    type: QueryTypes.INSERT,
    bind: values,
  });

  res.redirect("/Blog");
}

function renderTestimonal(req, res) {
  res.render("testimonal");
}

async function renderBlogDetail(req, res) {
  const id = req.params.Blog_id;

  const blog = await db.query(`SELECT * FROM project WHERE id = $1`, {
    type: QueryTypes.SELECT,
    bind: [id],
  });

  res.render("blog-detail", {
    data: blog[0],
    user: req.session.user,
  });
}

async function renderEditBlog(req, res) {
  const id = req.params.Blog_id;
  console.log(id);
  const blog = await db.query(`SELECT * FROM project WHERE id = ${id}`, {
    type: QueryTypes.SELECT,
  });

  res.render("edit-blog", {
    data: blog[0],
  });
}

async function editBlog(req, res) {
  try {
    const id = req.params.Blog_id;

    const query = `
      UPDATE public.project
	SET  title=$1, description=$2, star_date=$3, end_date=$4, image=$5
	WHERE id=$6;`;
    const values = [
      req.body.title,
      req.body.content,
      req.body.startDate,
      req.body.endDate,
      req?.file?.filename,
      id,
    ];

    await db.query(query, {
      type: QueryTypes.UPDATE,
      bind: values,
    });

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
}

async function deleteBlog(req, res) {
  const id = req.params.Blog_id;

  const query = `DELETE FROM project WHERE id = ${id}`;
  await db.query(query);

  res.redirect("/blog");
}

async function renderRegister(req, res) {
  const isLogin = req.session.isLogin;
  res.render("register", {
    isLogin: isLogin,
    user: req.session.user,
  });
}

async function renderLogin(req, res) {
  const isLogin = req.session.isLogin;
  res.render("login", {
    isLogin: isLogin,
    user: req.session.user,
  });
}

async function register(req, res) {
  const userExist = `SELECT id, email, password, username
	FROM public."user" WHERE email = $1;`;
  const checkUser = await db.query(userExist, {
    type: QueryTypes.SELECT,
    bind: [req.body.email],
  });

  if (checkUser.length > 0) {
    return res.redirect("/register");
  } else {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const userRegister = `
    INSERT INTO public."user"(
	email, password, username)
	VALUES ($1, $2, $3) RETURNING id;`;
    const values = [req.body.email, passwordHash, req.body.name];
    const result = await db.query(userRegister, {
      type: QueryTypes.INSERT,
      bind: values,
      returning: true,
    });

    const newUser = result[0][0];

    req.session.user = {
      id: newUser.id,
      name: req.body,
      email: req.body.email,
    };
    (req.session.isLogin = true),
      req.session.save((err) => {
        if (err) {
          req.flash(
            "danger",
            "Your account failed to created! please fill in your account corectly!!"
          );
          return res.redirect("/register");
        }
        req.flash(
          "succes",
          "your account has been succesfully created! pleas log in to your account!"
        );
        res.redirect("/login");
      });
  }
}

async function login(req, res) {
  const userLogin = `SELECT *
	FROM public."user" WHERE email=$1;`;

  const user = await db.query(userLogin, {
    type: QueryTypes.SELECT,
    bind: [req.body.email],
  });

  if (user.length === 0) {
    req.flash("danger", "This email does not exist!");
    return res.redirect("/login");
  }

  const users = user[0];

  const checkPassword = await bcrypt.compare(req.body.password, users.password);

  if (!checkPassword) {
    return res.redirect("/login");
  }

  req.session.user = user[0];
  req.session.isLogin = true;
  req.session.userId = user[0].id;
  req.session.save((err) => {
    if (err) {
      console.log(err);

      return res.redirect("/login");
    }

    return res.redirect("/");
  });
}

async function logout(req, res) {
  req.session.destroy(() => {
    return res.redirect("/login");
  });
}

// Akhir route
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
