import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserRole } from '../utils/enums';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadType } from '../utils/types';

@Injectable()
export class AuthProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async generateJWT(payload: JWTPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async registerUser(userData: RegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, username, password, confirmPassword, ...rest } = userData;

    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });

    const errors: Record<string, string> = {};

    if (existingUser?.email) {
      errors.email = 'Email is already registered';
    }

    if (existingUser?.username) {
      errors.username = 'Username is already taken';
    }

    if (Object.keys(errors).length > 0) {
      throw new BadRequestException(errors);
    }

    // hash password
    const hashedPassword = await this.hashPassword(password);

    // create new user
    const newUser = this.usersRepository.create({
      ...rest,
      email,
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    const token = await this.generateJWT({
      id: newUser.id,
      role: newUser.role,
    });

    return {
      message: 'User created successfully',
      user: newUser,
      token,
    };
  }

  public async loginUser(userData: LoginDto) {
    const { identifier, password } = userData;

    const user = await this.usersRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      throw new BadRequestException({
        message: 'Invalid email/username or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException({
        message: 'Invalid email/username or password',
      });
    }

    const token = await this.generateJWT({ id: user.id, role: user.role });
    return {
      message: 'Login successful',
      user: user,
      token,
    };
  }
}
