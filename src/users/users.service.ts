import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JWTPayloadType } from '../utils/types';
import { UserRole } from '../utils/enums';
import { AuthProvider } from './auth.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthProvider,
  ) {}

  public async registerUser(userData: RegisterDto) {
    return await this.authService.registerUser(userData);
  }

  public async loginUser(userData: LoginDto) {
    return this.authService.loginUser(userData);
  }

  public async getAllUsers(page = 1, limit = 10) {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: [
        'id',
        'username',
        'email',
        'firstName',
        'lastName',
        'avatar',
        'role',
      ],
    });

    return {
      data: users,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  public async getUserProfile(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  public async updateUser(
    id: number,
    userData: UpdateUserDto,
    requesterRole: UserRole,
  ) {
    const foundUser = await this.usersRepository.findOne({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    if (requesterRole !== UserRole.Admin) {
      const adminOnlyFields: (keyof UpdateUserDto)[] = [
        'role',
        'stats',
        'achievements',
      ];

      const filteredData = { ...userData };
      adminOnlyFields.forEach((field) => {
        delete filteredData[field];
      });
    }

    if (userData.username && userData.username !== foundUser.username) {
      const usernameExists = await this.usersRepository.exists({
        where: { username: userData.username },
      });
      if (usernameExists) {
        throw new BadRequestException({
          username: 'Username is already taken',
        });
      }
    }

    if (userData.password && userData.confirmPassword !== userData.password) {
      throw new BadRequestException({
        confirmPassword: 'Passwords do not match',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...updatePayload } = userData;
    if (updatePayload.password) {
      updatePayload.password = await this.authService.hashPassword(
        updatePayload.password,
      );
    }
    Object.assign(foundUser, updatePayload);
    const updatedUser = await this.usersRepository.save(foundUser);
    return { message: 'User updated successfully', user: updatedUser };
  }

  public async deleteUser(id: number, payload: JWTPayloadType) {
    if (payload.role !== UserRole.Admin && payload.id !== id) {
      throw new ForbiddenException('Not allowed to delete this user');
    }

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    await this.usersRepository.remove(user);

    return { message: 'User deleted successfully' };
  }
}
