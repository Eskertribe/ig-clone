import { UserDto } from "../user/dto/user.dto"
import { CreatePostDto } from "./dto/post.dto"

export type CreatePostRequest = {
  file: Express.Multer.File,
  post: CreatePostDto,
  user: UserDto
}
