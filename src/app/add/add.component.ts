import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { AlertService } from '../_alert/alert.service'



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  title: String;
  duration: Number;
  durationUnit: String;
  description: String;

  constructor(private CourseService: CourseService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  add(course: any): void {
    course.title = course.title.trim();
    if (!course.title) { return; }
    course['duration-unit'] = course.durationUnit;
    delete course.durationUnit;
    this.CourseService.addCourse(course)
      .subscribe(Course => {
        // this.Courses.push(Course);
      });
    this.alertService.success("You have added a new field")
  }

  onSubmit(courseData: NgForm): void {
    // console.log(courseData.value);


    // save course data to db here 
    this.add(courseData.value)
    // this.checkoutForm.reset();

    console.warn('Your order has been submitted', courseData);
  }

}
