import { Component, getDebugNode } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  id!: number;
  post!: Post;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    public service: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract id from route parameters
    this.id = +this.route.snapshot.params['id']; // Convert to number
    if (isNaN(this.id)) {
      this.errorMessage = 'Invalid Record Id';
      this.isLoading = false;
      return;
    }

    this.getDetails(this.id);
  }

  getDetails(id: number): void {
    this.service.find(id).subscribe(
      (data: Post) => {
        this.post = data;
        this.isLoading = false;
      },
      (err: any) => {
        this.errorMessage = 'Error fetching post: ' + err.message;
        this.isLoading = false;
      }
    );
  }

  routeToBack() {
    this.router.navigate(['/index']); // Navigate to a specific route
  }
}
