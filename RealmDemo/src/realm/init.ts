import path from "path";

import Task from "../models/Task";

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

  realm.addListener("change", (sender) => {
    const objects = sender.objects(Task);

    console.log("Change detected");

    console.log(objects.map((task) => task.toJSON()));
  });

  return realm;
};

export default init;
