import { NavigationExtras } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { CadastroService } from './../service/cadastro.service';
import { TaskI } from './../models/task.interface';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  todos: TaskI[];

  constructor(private todoService: CadastroService, private navCtrl: NavController, private loadingController: LoadingController){}
  
  ngOnInit():void{
    this.loadTodo();

  }
  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    //await loading.present();

    this.todoService.getTodos().subscribe(todos => {
      loading.dismiss();
      this.todos = todos;
    });
  }
 async doRefresh(event) {
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
  onRemove(idTask:string){
    this.todoService.removeTodo(idTask);
    }
  
  voltarHome(){
    let navExtra: NavigationExtras = {
      state: this.todos
    }
    this.navCtrl.navigateForward('/');
    }

}