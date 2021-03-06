import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { UploadFileComponent } from './components/upload-file/upload-file.component';


const routes: Routes = [
{path:'upload', component:UploadFileComponent},
{path:'', component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
