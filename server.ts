import { createRequire } from "module";

const require = createRequire(import.meta.url);

const jsonServer = require("json-server");
const cors = require("cors");

const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;
const rules = auth.rewriter({
  users: 660,
  userSetting: 660,
  accounts: 660,
});

app.use(rules);
app.use(cors());
app.use(auth);
app.use(router);

app.listen(4000, () => {
  console.log("JSON Server is running...");
});
