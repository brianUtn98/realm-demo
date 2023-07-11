import app from "./app";

const server = app.listen(3000, "localhost", () => {
  console.log("Listening on port 3000");
});

export default server;
