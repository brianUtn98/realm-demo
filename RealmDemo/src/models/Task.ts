import Realm from "realm";

class Task extends Realm.Object {
  public description!: string;
  public dueDate!: Date;
  public asignee!: string;
  public summary!: string;
  public isComplete!: boolean;
  public status!: string;
  public priority!: number;

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
