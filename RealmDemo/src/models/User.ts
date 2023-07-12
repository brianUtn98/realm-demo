import Realm from "realm";
import Task from "./Task";

class User extends Realm.Object {
  public name!: string;
  public birthDate!: Date;
  public role!: string;
  public tasks!: Task[];
  static schema = {
    name: "User",
    asymmetric: false,
    properties: {
      _id: {
        type: "objectId",
        indexed: true,
        default: () => new Realm.BSON.ObjectId(),
      },
      name: "string",
      birthDate: "date",
      role: "string",
      tasks: "Task[]",
    },
    primaryKey: "_id",
  };
}

export default User;
