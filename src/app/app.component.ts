import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StackComponentsComponent } from "./components/stack-components/stack-components.component";
import { ProjectPreviewComponent } from "./components/project-preview/project-preview.component";
import { ProyectProvider } from './components/stack-components/projects.provider';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StackComponentsComponent, ProjectPreviewComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jccs-portfolio';
  projectProvider = inject(ProyectProvider)
  projects = this.projectProvider.projectList
  
}
