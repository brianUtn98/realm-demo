import Realm from "realm";

import util from "util";

import path from "path";

class Task extends Realm.Object {
  static schema = {
    name: "Task",
    properties: {
      _id: {
        type: "objectId",
        indexed: true,
        default: () => new Realm.BSON.ObjectId(),
      },
      description: "string",
      dueDate: "date",
      asignee: "string",
      summary: "string",
      isComplete: "bool",
      status: "string",
      priority: "int",
    },
    primaryKey: "_id",
  };
}

(async function () {
  const app = new Realm.App({
    id: "nosql-demo-oeyra",
    baseFilePath: path.join(__dirname, "../myrealm"),
  });

  console.log("Default path: ", Realm.defaultPath);

  const credentials = Realm.Credentials.emailPassword(
    "brian.gmonroy98@gmail.com",
    "!xr!QAEKi8K4ya!"
  );

  const user = await app.logIn(credentials);

  console.log("User: ", user);

  const realm = await Realm.open({
    schema: [Task],
    sync: {
      user: app.currentUser!,
      flexible: true,
      initialSubscriptions: {
        update(subs, realm) {
          subs.add(realm.objects(Task));
        },
      },
      onError: console.log,
    },
  });

  const tasks = realm.objects(Task);

  tasks.addListener((tasks, changes) => {
    changes.insertions.forEach((index) => {
      console.log("------------Inserted a new object------------");
      console.log("Inserted: ", tasks[index].toJSON());
    });
  });
})();

console.log("End of file");
