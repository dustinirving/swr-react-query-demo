import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

const serverDelay = 600;

let todos = [
  {
    id: "0",
    content: "Walk dog",
  },
  {
    id: "1",
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

server.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  setTimeout(() => {
    const targetTodo = todos.find((todo) => todo.id === id);
    res.status(200).jsonp(targetTodo);
  }, serverDelay);
});

server.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  setTimeout(() => {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content: newName };
      }

      return todo;
    });
    
    const targetTodo = todos.find((todo) => todo.id === id);

    console.log('target todo: ', targetTodo)
    if (!targetTodo) {
      res.status(404).send();
      return;
    }

    res.status(200).jsonp(todos.find((todo) => todo.id === id));
  }, serverDelay);
});

server.post("/todos", (req, res) => {
  setTimeout(() => {
    if (Math.random() > 0.05) {
      todos.push({
        id: todos.length,
        content: req.body.content,
      });
      res.status(200).jsonp(todos[todos.length - 1]);
    } else {
      res.status(500).jsonp("internal server error");
    }
  }, serverDelay);
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
