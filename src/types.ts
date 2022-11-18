export interface Breed {
    name: string;
    children: Array<string>;
}

export interface SubBreedQuery {
    parent: string;
    child: string;
}
