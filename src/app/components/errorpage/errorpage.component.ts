/*
Project: Blade Brigade - Final Project
    Miles Purvis & Stefan Kobetich

    Revision History:
      Created 2024-03-31
*/
import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-errorpage',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './errorpage.component.html',
  styleUrl: './errorpage.component.css'
})
export class ErrorpageComponent {

}
