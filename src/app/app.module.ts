import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { FeaturesComponent } from './Components/features/features.component';
import { ProjectsComponent } from './Components/projects/projects.component';
import { ResumeComponent } from './Components/resume/resume.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentfulService } from './Services/contentful.service';
import { ProjectDetailsComponent } from './Components/projects/project-details/project-details.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material/material.module';
import { LoadingCardComponent } from './Shared/Components/loading-card/loading-card.component';
import { ProjectLoadingComponent } from './Shared/Components/project-loading/project-loading.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeaturesComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    ProjectDetailsComponent,
    MainPageComponent,
    LoadingCardComponent,
    ProjectLoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [ContentfulService],
  bootstrap: [AppComponent],
})
export class AppModule {}
