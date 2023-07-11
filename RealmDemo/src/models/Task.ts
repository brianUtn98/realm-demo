import Realm from "realm";

class Task extends Realm.Object {
  static schema = {
    name: "Task",
    asymmetric: false,
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

export default Task;
