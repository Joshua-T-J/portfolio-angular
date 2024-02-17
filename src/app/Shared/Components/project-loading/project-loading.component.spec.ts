import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLoadingComponent } from './project-loading.component';

describe('ProjectLoadingComponent', () => {
  let component: ProjectLoadingComponent;
  let fixture: ComponentFixture<ProjectLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ProjectLoadingComponent]
});
    fixture = TestBed.createComponent(ProjectLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
