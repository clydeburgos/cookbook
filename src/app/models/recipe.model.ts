export class RecipeModel {
    Id: string = '00000000-0000-0000-0000-000000000000';
    UserId: string = '';
    Name: string = '';
    Instructions: string = '';
    Ingredients?: any;
    PhotoUrl: string = '';
}

export class IngredientsModel {
    Id: number = 0;
    Name: string = '';
}