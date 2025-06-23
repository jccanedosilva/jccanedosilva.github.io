import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from '../stack-components/projects.provider';

@Component({
  selector: 'app-project-preview',
  imports: [CommonModule],
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.scss'
})
export class ProjectPreviewComponent {

  @Input() project!: Project
}
