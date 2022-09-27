import './styles.scss';
import '@monster-js/core/reflection';
import { bootstrap, globalService } from '@monster-js/core';
import { AppModule } from './app/app.module';
import { StoreService } from './app/modules/store/store.service';

globalService(StoreService);

bootstrap(AppModule);
