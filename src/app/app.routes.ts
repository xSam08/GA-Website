import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MusicComponent } from './components/music/music.component';
import { BooksComponent } from './components/books/books.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'music', component: MusicComponent },
    { path: 'books', component: BooksComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
