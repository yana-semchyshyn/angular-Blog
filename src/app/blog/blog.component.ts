import { Component, OnInit, TemplateRef } from '@angular/core';
import { IBlog } from '../shared/interfaces/blog.interface';
import { IUser } from '../shared/interfaces/user.inteface';
import { BlogService } from '../shared/services/blog.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../shared/classes/user.modal';
import { Blog } from '../shared/classes/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  userName: string;
  userEmail: string;
  userPassword: string;
  newUserName: string;
  newUserEmail: string;
  newUserPassword: string;
  blogID: string | number;
  title: string;
  text: string;
  isSignIn = true;
  isEdited = false;
  userStatus = false;
  adminStatus = false;
  modalRef: BsModalRef;
  blogs: Array<IBlog> = [];
  users: Array<IUser> = [];
  checkModel: any = { left: false, middle: true, right: false };
  constructor(private blogService: BlogService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getBlogs();
    this.getUsers();
  }

  getBlogs(): void {
    this.blogs = this.blogService.getBlogs();
  }

  getUsers(): void {
    this.users = this.blogService.getUsers();
  }

  checkUser(): void {
    if (this.userName == 'admin') {
      this.adminStatus = true;
      this.userStatus = true;
    }
    else if (this.userName != 'admin' && this.userName != '') {
      this.userStatus = true;
      this.adminStatus = false;
    }
    else if (this.userName == '') {
      this.adminStatus = false;
      this.userStatus = false;
    }
  }

  SignIn(): void {
    this.users.forEach(element => {
      if (element.email == this.userEmail && element.password == this.userPassword) {
        this.userName = element.username;
        this.checkUser();
        this.isSignIn = !this.isSignIn;
        this.modalRef.hide();
        this.resetForm();
      }
    });
  }

  SignOut(): void {
    this.isSignIn = !this.isSignIn;
    this.userName = '';
    this.checkUser();
  }

  addNewUser(): void {
    let check = true;
    this.users.forEach(element => {
      if (element.username == this.newUserName || element.email == this.newUserEmail) check = false;
    });
    if (check) {
      const newUser = new User(this.users.length + 1, this.newUserName, this.newUserEmail, this.newUserPassword);
      if (this.users.length > 1) newUser.id = +this.users.slice(-1)[0].id + 1;
      this.userName = newUser.username;
      this.blogService.setUsers(newUser);
      this.isSignIn = !this.isSignIn;
      this.checkUser();
      this.resetForm();
      this.modalRef.hide();
    }
  }

  post(): void {
    if (this.title != '' && this.text != '') {
      const post = {
        id: this.blogs.length + 1,
        topic: this.title,
        postedBy: this.userName,
        date: new Date(),
        message: this.text
      }
      this.blogs.push(post);
      this.checkUser();
      this.resetForm();
      this.modalRef.hide();
    }
  }

  hideEditModal(): void {
    this.resetForm();
    if (this.isEdited) this.isEdited = false;
  }

  edit(blog: IBlog): void {
    this.blogID = blog.id;
    this.isEdited = true;
    this.title = blog.topic;
    this.text = blog.message;
  }

  updatePost(): void {
    if (this.title != '' && this.text != '') {
      const updPost = new Blog(this.blogID, this.userName, this.title, new Date(), this.text)
      this.blogService.updateBlog(updPost);
      this.isEdited = false;
      this.resetForm();
      this.modalRef.hide();
    }
  }

  deletePost(blog: IBlog): void {
    this.blogService.deleteBlog(blog.id);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  resetForm(): void {
    this.userEmail = '';
    this.userPassword = '';
    this.newUserName = '';
    this.newUserEmail = '';
    this.newUserPassword = '';
    this.title = '';
    this.text = '';
  }
}