import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService, Post } from '../post.service';




@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  posts: Post[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  // Fetch all posts
  getPosts(): void {
    this.service.getAll().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = `Error loading records: ${error}`;
        this.isLoading = false;
        console.error(error); // Log the error to the console for debugging
      },
    });
  }

  // Delete a post
  deletePost(id: number): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== id);
        alert('Record Deleted Successfully!!!');
      },
      error: (error) => {
        alert('Error Deleting Record!');
        console.error(error); // Log error for debugging
      },
    });
  }

}
