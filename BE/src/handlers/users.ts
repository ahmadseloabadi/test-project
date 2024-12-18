import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { User } from "../models/entity/user";
import { UserRequest } from "../models/dto/user";
import UsersServices from "../services/users";

class UsersHandler {
  async getUsersByName(req: Request, res: Response) {
    const queryName: string = req.query.name as string;

    const usersList: User[] = await UsersServices.getUsersByName(queryName);

    if (usersList.length === 0) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "User not found",
        data: null,
      };
      return res.status(404).send(Response);
    }
    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        users: usersList,
      },
    };

    res.status(200).send(response);
  }

  async getUsersById(req: Request, res: Response) {
    const queryId: number = parseInt(req.params.id);

    const usersList: User[] = await UsersServices.getUsersById(queryId);

    if (usersList.length === 0) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "User not found",
        data: null,
      };
      return res.status(404).send(Response);
    }
    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        users: usersList,
      },
    };
    res.status(200).send(response);
  }

  async createUser(req: Request, res: Response) {
    const payload: UserRequest = req.body;
    payload.profile_picture_file = req.file;
    if (payload.role === "superadmin") {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "cant create superadmin",
        data: {
          created_user: null,
        },
      };

      return res.status(400).send(response);
    }
    if (
      !(
        payload.name &&
        payload.email &&
        payload.profile_picture_file &&
        payload.password
      )
    ) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "fields cannot be empty",
        data: {
          created_user: null,
        },
      };

      return res.status(400).send(response);
    }

    const createdUser: User = await UsersServices.createUser(payload);

    const response: DefaultResponse = {
      status: "CREATED",
      message: "User succesfully created",
      data: {
        created_user: createdUser,
      },
    };

    res.status(201).send(response);
  }

  async deleteUserById(req: Request, res: Response) {
    const queryId: number = parseInt(req.params.id);
    const deletedUser: User | null = await UsersServices.deleteUserById(
      queryId
    );

    if (!deletedUser) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "User not found",
        data: null,
      };
      return res.status(404).send(Response);
    }

    const response: DefaultResponse = {
      status: "DELETED",
      message: "User successfully deleted",
      data: {
        deleted_user: deletedUser,
      },
    };

    res.status(200).send(response);
  }

  async updateUserById(req: Request, res: Response) {
    const queryId: number = parseInt(req.params.id);
    const payload: UserRequest = req.body;
    payload.profile_picture_file = req.file;

    if (payload.role === "superadmin") {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "cant create superadmin",
        data: {
          created_user: null,
        },
      };

      return res.status(400).send(response);
    }

    // Payload validation
    if (
      !(
        payload.name &&
        payload.email &&
        payload.profile_picture_file &&
        payload.password
      )
    ) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "fiedls cannot be empty",
        data: {
          updated_user: null,
        },
      };
      res.status(400).send(response);
    }
    const updatedUser: User | null = await UsersServices.updateUserById(
      queryId,
      payload
    );

    const payloadUser = {
      name: payload.name,
      email: payload.email,
      profile_picture_file: updatedUser?.profile_picture_url,
      password: payload.password,
      role: payload.role,
    };

    if (!updatedUser) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "User not found",
        data: null,
      };
      return res.status(404).send(Response);
    }

    const response: DefaultResponse = {
      status: "UPDATED",
      message: "User successfully updated",
      data: {
        old_data: updatedUser,
        new_data: payloadUser,
      },
    };
    res.status(200).send(response);
  }
}

export default UsersHandler;
