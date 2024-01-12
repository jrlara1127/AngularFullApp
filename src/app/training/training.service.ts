import { Inject, Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { CollectionReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore'; 
import { CLOSED_EXCERCISE, EXCERCISE_CATALOG } from '../../Constants';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  
  private fbSubs: Subscription[] = [];

  private availableExercises!: Exercise[];

  /*private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];*/
  private runningExercise: any;
  private exercises: Exercise[] = [];
   

  constructor(private firestore: Firestore){}

  getAvailableExercises() { 
    return this.availableExercises.slice();
  }
 
  items$!: Observable<any>; 

  fetchAvailableExercises() { 
    const itemColection = collection(this.firestore, EXCERCISE_CATALOG);
    this.fbSubs.push(collectionData(itemColection).subscribe(
        (excercises) => {
          this.availableExercises = excercises as Exercise[];
          this.exercisesChanged.next([...this.availableExercises]);
        }
    )
    ); 
  }
  
  
  fetchCompletedOrCancelledExercises() {
      const itemColection = collection(this.firestore, CLOSED_EXCERCISE);
      this.fbSubs.push(collectionData(itemColection).subscribe(
        (exercises) => {
        console.log(exercises);
        const ex : Exercise[] = exercises as Exercise[]
        console.log(ex);
        this.finishedExercisesChanged.next(ex);
      }
      ));
  }


  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
    });

    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });


    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        state: 'cancelled'
    });


    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

    getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  } 
  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private datacollection:CollectionReference = collection(this.firestore,CLOSED_EXCERCISE);
  private addDataToDatabase(exercise: Exercise) {
    console.log('aaaaaaaaa');
    addDoc(this.datacollection, exercise);
  }


}
