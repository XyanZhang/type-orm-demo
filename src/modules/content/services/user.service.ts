import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "../entities/user.entity"

// 帮我生成一个用户service
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // 帮我生成一个查询所有用户的方法
  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
}
