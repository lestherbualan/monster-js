import { Service } from "@monster-js/core";

export class HttpService {
    public url = 'http://localhost:4000';
}

@Service()
export class AuthService {
    public username = 'helloworld';

    constructor(private http: HttpService) { }
}