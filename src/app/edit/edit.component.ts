import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { NgForm } from '@angular/forms';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  Courses: Course[];
  title: String;
  duration: Number;
  durationUnit: String;
  description: String;
  checkoutForm: any;
  action: String;
  course: Course;


  constructor(private CourseService: CourseService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const course = JSON.parse(this.route.snapshot.paramMap.get('course'));
    this.course = course;
    this.edit(course);
  }

  edit(course: Course) {
    this.course = course;
    this.title = course.title;
    this.duration = course.duration;
    this.durationUnit = course['duration-unit'];
    this.description = course.description;
  }

  onSubmit(courseData: NgForm): void {
    // console.log(courseData.value);


    // save course data to db here 
    this.update(courseData.value)
    // this.checkoutForm.reset();

    console.warn('Your order has been submitted', courseData.value);
  }

  update(course: any) {



    course['duration-unit'] = this.durationUnit;
    delete course.durationUnit;
    course.id = this.course.id;
    // console.log(course['duration-unit']);
    this.CourseService.updateCourse(course)
      .subscribe(Course => {
        // console.log(course);
        this.course = null;
        this.title = '';
        this.duration = null;
        this.durationUnit = '';
        this.description = '';
        this.router.navigate(['/CourseList'])
      });
  }
}
