import { Component } from '@angular/core';
import { Post } from '../post';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  id!: number;
  post!: Post;
  form!: FormGroup;

  isLoading: boolean = true;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    public service: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract id from route parameters
    this.id = +this.route.snapshot.params['id']; // Convert to number
    if (isNaN(this.id)) {
      this.errorMessage = 'Invalid Id';
      this.isLoading = false;
      return;
    }
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });

    this.getDetails(this.id);
  }

  getDetails(id: number): void {
    this.service.find(id).subscribe(
      (data: Post) => {
        this.post = data;
        // Now set the form values with the fetched data
        this.form.patchValue({
          title: this.post.title,
          body: this.post.body,
        });
        this.isLoading = false;
      },
      (err: any) => {
        this.errorMessage = 'Error fetching post: ' + err.message;
        this.isLoading = false;
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return; // Don't submit if form is invalid
    }
    this.isSubmitting = true; // Disable button and show loading
    this.isLoading = true;
    this.service.update(this.id, this.form.value).subscribe(
      (res: any) => {
        alert('Data Updated Successfull');
        this.router.navigateByUrl('/index');
        this.isSubmitting = false; // Re-enable the submit button
        this.isLoading = false; // Hide loading after successful submission
      },
      (err: any) => {
        this.errorMessage = 'Error updating Record: ' + err.message;
        this.isSubmitting = false;
        this.isLoading = false;
      }
    );
  }

  routeToBack() {
    this.router.navigate(['/index']); // Navigate to a specific route
  }
}
