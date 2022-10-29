export interface RenderReturnInterface<T> {
    queryAll(query: string): NodeListOf<HTMLElement>;
    query<TT = HTMLElement>(query: string): TT;
    host: HTMLElement;
    element: HTMLElement;
    component: T;
    detectChanges: () => any;
}
