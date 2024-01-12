import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] | null = [];
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
            exercises => (this.exercises = exercises)
          );
    this.trainingService.fetchAvailableExercises();

    //  this.exercises = this.trainingService.getAvailableExercises();
    
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

}
