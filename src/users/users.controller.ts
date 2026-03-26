import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from './auth/auth.guard';
import { AuthRolesGuard } from './auth/auth-roles.guard';
import { UserProfile } from './decorators/user-profile.decorator';
import type { JWTPayloadType } from '../utils/types';
import { Roles } from './decorators/user-role.decorator';
import { UserRole } from '../utils/enums';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/auth/register')
  public async createUser(@Body() userData: RegisterDto) {
    return await this.usersService.registerUser(userData);
  }

  @Post('/auth/login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() userData: LoginDto) {
    return await this.usersService.loginUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  public async getCurrentUser(@UserProfile() payload: JWTPayloadType) {
    return await this.usersService.getUserProfile(payload.id);
  }

  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  @Get()
  public async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Put('update-user/:id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.normalUser, UserRole.Admin)
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
    @UserProfile() jwtPayload: JWTPayloadType,
  ) {
    if (jwtPayload.role !== UserRole.Admin && jwtPayload.id !== id) {
      throw new ForbiddenException(
        'You are not authorized to update this user',
      );
    }
    return this.usersService.updateUser(id, userData, jwtPayload.role);
  }

  @Delete(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin, UserRole.normalUser)
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @UserProfile() payload: JWTPayloadType,
  ) {
    return this.usersService.deleteUser(id, payload);
  }
}
