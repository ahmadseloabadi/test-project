import { raw } from "objection";
import { User, UserEntity } from "../models/entity/user";

class UsersRepository {
  static async getUsersByName(queryName: string): Promise<User[]> {
    let listUser: User[] = [];

    if (queryName) {
      listUser = await UserEntity.query().where(
        raw('lower("name")'),
        "like",
        `%${queryName}%`
      );
    } else {
      listUser = await UserEntity.query();
    }

    return listUser;
  }

  static async getUsersById(queryId: number): Promise<User[]> {
    const listUser = await UserEntity.query().where("id", queryId);
    return listUser;
  }

  static async createUser(user: User): Promise<User> {
    const createdUser = await UserEntity.query().insert({
      email: user.email,
      name: user.name,
      profile_picture_url: user.profile_picture_url,
      password: user.password,
      role: user.role,
    });

    return createdUser;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserEntity.query()
      .where(raw('lower("email")'), "=", email)
      .first();

    if (user === undefined) {
      return null;
    }

    return user;
  }
  static async deleteUserById(queryId: number): Promise<User | null> {
    const deletedUser = await UserEntity.query().findById(queryId);

    if (deletedUser) {
      await UserEntity.query().findById(queryId).delete();
      return deletedUser;
    } else {
      return null; // user tidak ditemukan
    }
  }

  static async updateUserById(
    queryId: number,
    user: User
  ): Promise<User | null> {
    const updateUser = await UserEntity.query().findById(queryId);

    if (updateUser) {
      await UserEntity.query().findById(queryId).patch({
        email: user.email,
        name: user.name,
        profile_picture_url: user.profile_picture_url,
        password: user.password,
        role: user.role,
      });
      return updateUser;
    } else {
      return null;
    }
  }
}

export default UsersRepository;
