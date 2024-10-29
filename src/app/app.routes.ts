import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { DamStatsComponent } from './components/dam-stats/dam-stats.component';


export const routes: Routes = [

  {path: '', component: MapComponent},
  { path: 'damstats', component:DamStatsComponent}


];
