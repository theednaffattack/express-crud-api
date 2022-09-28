import { TodosCollection as Todos } from "./todos.model";

async function todosFindScript() {
  const result = Todos.find();
  const todos = await result.toArray();
  console.log("VIEW TODOS", { todos });
}

todosFindScript()
  .then()
  .catch((err) => {
    console.error("TODOS SCRIPT ERROR", err);
  });
