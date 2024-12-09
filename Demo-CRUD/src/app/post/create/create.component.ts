import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { title } from 'process';
import {  RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
form!:FormGroup;

constructor(public service:PostService, private router:Router){}

ngOnInit():void{
this.form=new FormGroup({
title:new FormControl('',[Validators.required]),
body:new FormControl('',Validators.required)
})
}

get f(){
 return this.form.controls;
}

submit(){
  console.log(this.form.value);
  this.service.create(this.form.value).subscribe((res:any)=>{
    alert('Post Creates Successfully!!!!!!!!');
    this.router.navigateByUrl('Post/index');

  })

}
}
