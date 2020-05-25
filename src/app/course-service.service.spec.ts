import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';

describe('CourseServiceService', () => {
  let service: CourseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
