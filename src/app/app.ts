import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./login/login";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
