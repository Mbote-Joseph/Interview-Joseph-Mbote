import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { Alert, AlertType } from '../_alert/alert.model';
import { AlertService } from '../_alert/alert.service';
import { EditComponent } from '../edit/edit.component';
import { Router } from '@angular/router';

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
    private alertService: AlertService,
    private router: Router
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
    const alert = new Alert();
    alert.id = 'delete-course';
    alert.type = AlertType.Warning;
    alert.autoClose = false;
    alert.message = 'Do you want to delete' + Course.title;

    this.alertService.alert(alert);
    this.alertService.info("You have deleted that field")
  }
  edit(course: Course) {
    // console.log(course);
    this.router.navigate(['/CourseList/edit', { course: JSON.stringify(course) }])
  }
  addCourse() {
    this.router.navigate(['/CourseList/add'])
  }

}

