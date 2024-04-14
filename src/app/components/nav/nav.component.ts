/*
Project: Blade Brigade - Final Project
    Miles Purvis & Stefan Kobetich

    Revision History:
      Created 2024-03-31
*/
import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import "bootstrap/dist/js/bootstrap.esm.js"

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  title = 'Blade Brigade';
}

