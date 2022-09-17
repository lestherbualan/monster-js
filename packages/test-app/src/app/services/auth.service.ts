export class HttpService {
    public url = 'http://localhost:4000';
}

@Service()
export class AuthService {
    public username = 'helloworld';

    constructor(private http: HttpService) { }
}

function Service(config?: any) {
    return function(target: any) {}
}