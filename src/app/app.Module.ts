import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { provideFirebaseApp, getApp, initializeApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MaterialModule } from "./material/material.module";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TrainingComponent } from "./training/training.component";
import { NewTrainingComponent } from "./training/new-training/new-training.component";
import { PastTrainingsComponent } from "./training/past-trainings/past-trainings.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { StopTrainingComponent } from "./training/current-training/stop-training.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CurrentTrainingComponent } from "./training/current-training/current-training.component";
import { environment } from "../environments/environment";


@NgModule({
    declarations:[
        AppComponent,
        SignupComponent,
        LoginComponent,
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent,
        StopTrainingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore (() => getFirestore())
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}