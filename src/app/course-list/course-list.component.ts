import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  Courses: Course[];
  title: String;
  duration: Number;
  durationUnit: String;
  description: String;
  checkoutForm: any;
  action: String;
  course: Course;

  constructor(private CourseService: CourseService,
  ) {
    this.action = "add course";
    // this.checkoutForm = this.formBuilder.group({
    //   title: '',
    //   duration: '',
    //   ['duration-unit']: '',
    //   description: ''
    // });
  }

  ngOnInit() {
    return this.CourseService.getCourse()
      .subscribe(Course => this.Courses = Course);
  }

  selectCourse(Course) {

  }

  delete(Course: Course): void {
    this.Courses = this.Courses.filter(h => h !== Course);
    this.CourseService.deleteCourse(Course).subscribe();
  }

  add(course: any): void {
    course.title = course.title.trim();
    if (!course.title) { return; }
    course['duration-unit'] = course.durationUnit;
    delete course.durationUnit;
    this.CourseService.addCourse(course)
      .subscribe(Course => {
        this.Courses.push(Course);
      });
  }

  onSubmit(courseData: NgForm): void {
    // console.log(courseData.value);

    if (this.action === 'update') {
      courseData.value.id = this.course.id;
      this.update(courseData.value);
      return;
    }
    // save course data to db here 
    this.add(courseData.value)
    // this.checkoutForm.reset();

    console.warn('Your order has been submitted', courseData);
  }
  edit(course: Course) {
    this.action = "update"
    // console.log(course);
    this.course = course;
    this.title = course.title;
    this.duration = course.duration;
    this.durationUnit = course['duration-unit'];
    this.description = course.description;

  }

  update(course: any) {

    console.log(course);
    course['duration-unit'] = course.durationUnit;
    delete course.durationUnit;

    this.CourseService.updateCourse(course)
      .subscribe(Course => {
        const index = this.Courses.findIndex((cos) => Course.id === cos.id);
        this.Courses[index] = Course;
        this.action = "add course"
        // console.log(course);
        this.course = null;
        this.title = '';
        this.duration = null;
        this.durationUnit = '';
        this.description = '';
      });
  }

}
