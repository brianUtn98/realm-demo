import path from "path";

import Task from "../models/Task";
import User from "../models/User";

const init = async () => {
  const app = new Realm.App({
    id: "nosql-demo-oeyra",
    baseFilePath: path.join(__dirname, "../../myrealm"),
  });

  const credentials = Realm.Credentials.emailPassword(
    "brian.gmonroy98@gmail.com",
    "!xr!QAEKi8K4ya!"
  );

  await app.logIn(credentials);

  const realm = await Realm.open({
    schema: [Task, User],
    sync: {
      user: app.currentUser!,
      flexible: true,
      // initialSubscriptions: {
      //   update(subs, realm) {
      //     subs.add(realm.objects(Task));
      //     subs.add(realm.objects(User));
      //   },
      // },
      onError: console.log,
    },
  });

  const users = realm.objects(User);

  const tasks = realm.objects(Task);

  await realm.subscriptions.update((subs) => {
    subs.add(tasks);
  });

  await realm.subscriptions.update((subs) => {
    subs.add(users);
  });

  // realm.addListener("change", (sender) => {
  //   const objects = sender.objects(Task);

  //   console.log("Change detected");

  //   console.log(objects.map((task) => task.toJSON()));
  // });

  return realm;
};

export default init;
