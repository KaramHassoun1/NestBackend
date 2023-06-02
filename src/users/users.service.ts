import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async findAll() {
    return await User.find();
  }

  async create(createUserDto: CreateUserDto) {

    let user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    await user.save();
    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);
    delete user.password;
    return user;
  }

  async findById(id: number): Promise<User> {
    return await User.findOne({ where: { id } });

  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    user.bio = updateUserDto.bio;
    user.city = updateUserDto.city;
    user.country = updateUserDto.country;
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    await user.save();
    delete user.password;
    return user;
  }

  async remove(id: number) {
    const user = await this.findById(id);
    await user.remove();
    delete user.password;
    return user;
  }
}
