import { Model, ModelObject } from "objection";
import knexInstance from "../../../config/postgresql";
import { User, UserEntity } from "./user";

export class CarEntity extends Model {
  id?: number;
  car_name!: string;
  car_rentperday!: number;
  car_size!: string;
  car_img?: string;
  created_by?: User;
  updated_by?: User;
  deleted_by?: User;
  create_by?: number;
  update_by?: number;
  delete_by?: number;
  create_at?: Date;
  update_at?: Date;
  delete_at?: Date;

  static get tableName() {
    return "cars";
  }
  static get relationMappings() {
    return {
      created_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.create_by",
          to: "users.id",
        },
      },
      updated_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.update_by",
          to: "users.id",
        },
      },
      deleted_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.delete_by",
          to: "users.id",
        },
      },
    };
  }
}

Model.knex(knexInstance);

export type Car = ModelObject<CarEntity>;
