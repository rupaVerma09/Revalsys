import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
feedbackData:any=[];
feedbackForm: FormGroup;
  submitted: boolean;

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject:['', Validators.required]
   });
  }

  submitFeedback(feedbackData){
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      return;
  }
    let newFeedback = localStorage.getItem('feedbackData') ? JSON.parse(localStorage.getItem('feedbackData')) :[] ;
    newFeedback.push(this.feedbackForm.value);
    localStorage.setItem('feedbackData', JSON.stringify(newFeedback));
    this.feedbackForm.controls.firstName.setValue("");
    this.feedbackForm.controls.lastName.setValue("");
    this.feedbackForm.controls.email.setValue("");
    this.feedbackForm.controls.subject.setValue("");
    this.toastr.success('successfully Sumitted');
    this.submitted = false;;
    
  }
  
}
