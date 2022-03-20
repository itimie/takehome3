import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentsService } from './comments.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    HttpClientModule
  ],
  providers: [CommentsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
