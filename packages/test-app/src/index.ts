import './styles.scss';
import { bootstrapModule } from '@monster-js/core/module';
import { AppModule } from './app/app.module';
import { globalComponent } from '@monster-js/core';
import { ButtonComponent } from './app/button.component';

globalComponent(ButtonComponent);

bootstrapModule(AppModule);
