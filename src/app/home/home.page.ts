import { NavController } from '@ionic/angular';
import { EventosService } from './../service/eventos.service';
import { TaskI } from './../models/task.interface';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos: TaskI[];

  constructor(private todoService: EventosService, private navCtrl: NavController, private router: Router) {

  }
  go(){
    // let navExtra: NavigationExtras = {
    //   state: this.todos
    // }
    // this.navCtrl.navigateForward('/eventos', navExtra)
    
  }
  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) =>{
      console.log('todos', todos);
      this.todos = todos;
    });
    
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.todoService.getTodos().subscribe((todos) =>{
      console.log('todos', todos);
      this.todos = todos;
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  goEventos(){
    let navExtra: NavigationExtras = {
      state: this.todos
    }
    this.navCtrl.navigateForward('/eventos', navExtra)
  }


}
