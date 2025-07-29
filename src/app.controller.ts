import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Get('/user')
  getUser() {
    return { name: 'John Doe', age: 30 };
  }

  @Post('')
  createUser(@Body() body: { name: string }) {
    return { user: body };
  }

  @Put()
  updateUser(@Body() body: { name: string }) {
    return { user: body };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return { id };
  }
}
