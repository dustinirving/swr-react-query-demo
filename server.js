import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

const serverDelay = 1000;

const todos = [
  {
    id: 0,
    content: "Walk dog",
  },
  {
    id: 1,
    content: "Feed squirrel",
  },
//   { id: 3, content: "test" },
];

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/todos", (req, res) => {
  setTimeout(() => {
    res.status(200).jsonp(todos);
  }, serverDelay);
});

server.post("/todos", (req, res) => {
  todos.push({
    id: todos.length,
    content: req.body.content,
  });

  setTimeout(() => {
    console.log("todos: ", todos);
    res.status(200).jsonp(todos[todos.length - 1]);
  }, serverDelay);
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
