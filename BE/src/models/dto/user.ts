interface UserRequest {
  name: string;
  email: string;
  profile_picture_file?: Express.Multer.File;
  password: string;
  role?: string;
}
interface UserResponse {
  id: number;
  name: string;
  email: string;
  profile_picture_file?: string;
  password: string;
  role?: string;
}

export { UserRequest, UserResponse };
