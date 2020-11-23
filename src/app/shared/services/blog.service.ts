import { Injectable } from '@angular/core';
import { IBlog } from '../interfaces/blog.interface';
import { IUser } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs: Array<IBlog> = [
    {
      id: 1,
      topic: 'First post',
      postedBy: 'admin',
      date: new Date(2020, 11, 15, 10, 0),
      message: 'Sign up to create your account and start to use Angular Blog'
    },
  ]
  users: Array<IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin'
    }
  ]
  getBlogs(): Array<IBlog> {
    return this.blogs;
  }

  setBlogs(newB: IBlog): void {
    this.blogs.push(newB);
  }

  deleteBlog(id: number | string): void {
    const index = this.blogs.findIndex(b => b.id === id);
    this.blogs.splice(index, 1);
  }

  updateBlog(blog: IBlog): void {
    const index = this.blogs.findIndex(b => b.id === blog.id)
    this.blogs.splice(index, 1, blog);
  }

  getUsers(): Array<IUser> {
    return this.users;
  }

  setUsers(newUser: IUser): void {
    this.users.push(newUser);
  }
  constructor() { }
}
