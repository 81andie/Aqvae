import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { StoryComponent } from './components/story/story.component';


export const routes: Routes = [

  { path: '', component: MapComponent },
  { path: 'story', component: StoryComponent }


];
