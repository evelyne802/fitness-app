import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'log-in', 
        pathMatch: 'full'
    }, 
    { 
        path: 'log-in', 
        component: LoginComponent 
    },
    { 
        path: 'sign-up', 
        component: SignupComponent 
    },
    { 
        path: 'confirmation', 
        component: ConfirmationComponent 
    },
    { 
        path: 'home-page', 
        component: HomePageComponent 
    }
];