import {bootstrap}    from '@angular/platform-browser-dynamic';
// TODO (meta data): import { Title } from '@angular/platform-browser';
// TODO (meta data): import { MetaService } from 'ng2-meta';
import {AppComponent} from './app.component';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {provide, PLATFORM_DIRECTIVES} from '@angular/core';

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	APP_ROUTER_PROVIDERS,
	// Title,
	// MetaService,
	provide(
		AuthConfig, { useValue: new AuthConfig()}
	),

	provide(AuthHttp, {
		useFactory: (http: Http) => {
			return new AuthHttp(new AuthConfig({
				tokenName: 'jwt'
			}), http);
		},
		deps: [Http]
    })
]);


