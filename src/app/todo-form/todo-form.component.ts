import {Component, OnInit} from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { interval, Subscription } from 'rxjs';
import {Todo, TodosService} from '../shared/todos.service';

// @NgModule({
//   imports: [MatSliderModule]
// })
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  cronografoReloj: number = 0;
  cronografoMinutos: number = 0;
  cronografoSegundos: number = 0;
  cronografoMiliSegundos: number = 0;
  cronografoOnrbth: string;
  temporizador: number = 301;

  subscription: Subscription;
  temp : Subscription;

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.cronografoOnrbth = 'Start'
  }

  cronografoStart() {

    this.cronografoOnrbth == 'Start' ? this.cronografoOnrbth = 'Stop' : this.cronografoOnrbth = 'Start'

    this.cronografoOnrbth != 'Start' ? this.timeGo() : this.timeStopReset()

  }

  timeGo() {
    this.subscription= interval(10).subscribe(() => {
      this.cronografoMiliSegundos++;
      if(this.cronografoMiliSegundos > 100) {
        this.cronografoMiliSegundos = 0
        this.cronografoSegundos++

        if(this.cronografoSegundos > 60) {
          this.cronografoSegundos = 0
          this.cronografoMinutos++

          if(this.cronografoMinutos > 60) {
            this.cronografoMinutos = 0
            this.cronografoReloj++

            this.cronografoReloj > 24 && this.subscription.unsubscribe(); // End)
          }
        }
      }
    });
  }

  timeStopReset() {

    this.subscription && this.subscription.unsubscribe();

    this.cronografoMiliSegundos = 0
    this.cronografoSegundos = 0
    this.cronografoMinutos = 0
    this.cronografoReloj = 0

  }

  cronografoPause() {

    if(this.temporizador > 300) {

      this.temporizador = 0

    } else {

      this.cronografoOnrbth = 'Start'
      this.subscription && this.subscription.unsubscribe();
      this.temporizador = 0
      this.temp.unsubscribe();

    }

    this.temp = interval(10).subscribe(() => {
      this.temporizador++
      this.temporizador > 301 && this.temp.unsubscribe();
    });

  }

  cronografoFinish() {
    this.cronografoOnrbth = 'Stop'
    this.subscription && this.subscription.unsubscribe();

    this.cronografoMiliSegundos = 0
    this.cronografoSegundos = 0
    this.cronografoMinutos = 0
    this.cronografoReloj = 0

    this.timeGo()

  }

}
