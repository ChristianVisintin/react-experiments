# Veeso's Kitchen

Developed by Christian Visintin

- [Veeso's Kitchen](#veesos-kitchen)
  - [Introduction](#introduction)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Admin area](#admin-area)
  - [Gallery](#gallery)
  - [API](#api)
    - [Entities](#entities)
      - [Recipe](#recipe)
      - [Ingredient](#ingredient)
      - [RecipeIngredient](#recipeingredient)
      - [Category](#category)
      - [Tweet](#tweet)
    - [Requests](#requests)
      - [list categories](#list-categories)
      - [list recipes](#list-recipes)
      - [get recipe](#get-recipe)
      - [get tweets](#get-tweets)
  - [License](#license)

---

## Introduction

This project is just a React website which I use to improve my React/Django knowledge, to test libraries and for fun; and yeah, it's a recipe website which I've invented, since I like cooking.

## Requirements

for backend:

- python3
- pipenv

or

- json-server <https://github.com/typicode/json-server>. Used to gather data for recipes and tweets
  - Start with `json-server --watch data/server-data.json`

Json-server is no more supported, switch to `json-server` branch if you want to use it.

## Setup

1. Open a terminal and go to `recipes/`
2. Run `npm install && npm install`
3. Run `npm run build`
4. Run `pipenv shell`
5. Run `pipenv install`
6. Run `python manage.py runserver`

Website is now available at <http://localhost:8000/>

## Admin area

Credentials:

- veeso
- cvisintin97

---

## Gallery

> Home page

![Home](img/screen1.jpg)

> Recipes navigator

![Recipes](img/screen2.jpg)

> Recipe card

![Recipe](img/screen3.jpg)

> About

![About](img/screen4.jpg)

---

## API

### Entities

#### Recipe

Recipe is made up of the following properties:

- **id** (*string*): primary key UUIDv4
- **title** (*string*): recipe title
- **category** (*Array::Category*): recipe categories
- **date** (*string:ISO8601*): publication date
- **img** (*Array::string:URL*): array of associated images
- **body** (*string*): procedure
- **ingredients** (*Array::Ingredient*): recipe ingredients
- **persons** (*number*): persons the ingredients are for
- **tags** (*Array::string*): tags associated to recipe
- **likes** (*number*): recipe likes

#### Ingredient

Ingredient represents an ingredient which can be included in a recipe.
The relation between `Recipe` and `Ingredient` is `n-n`.

- **id** (*string*): primary key UUIDv4
- **name** (*string*): ingredient name

#### RecipeIngredient

RecipeIngredient represents an ingredient in a certain recipe. This entity is both used to break the `n-n` relation between `Recipe` and `Ingredient` and to define a quantity for the ingredient in the recipe.

- **id** (*number*): relation ID
- **recipe** (*string*): FK; associated recipe ID
- **ingredient** (*string*): FK; associated ingredient ID
- **quantity** (*number | null*): optional quantity for ingredient
- **measure** (*string | null*): optional measure to quantity the ingredient.

#### Category

Category represents a recipe category

- **id** (*number*): category id
- **name** (*string*): category name

#### Tweet

Tweet is made up of the following properties:

- **id** (*string*): primary key UUIDv4
- **username** (*string*): Twitter username
- **nickname** (*string*): Twitter nickname (long name)
- **date** (*string:ISO8601*): publication date
- **text** (*string*): tweet's text
- **url** (*string:URL*): tweet url
- **avatar** (*string:URL*): avatar url

### Requests

#### list categories

**GET** `/recipe-api/list-categories`

Get the list of all the available categories.

returns:

```json
[
  {
    "id": 0,
    "name": "lunch"
  },
  {
    "id": 1,
    "name": "breakfast"
  }
]
```

#### list recipes

**GET** `/recipe-api/list-recipes`

get an undetailed list of recipes:

with the following parameters:

- **limit**: maximum amount of records
- **offset**: start index in the search
- **sortBy**: sort by field
  - *name*
  - *category*
  - *date*
  - *tags*
  - *likes*

returns:

```json
[
  {
    "id": "a8fb4a0b-af17-4e99-96bb-cb8c7ec375d9",
    "title": "Pasta carbonara",
    "category": [
      1
    ],
    "date": "2019-05-28T12:30:40+0200",
    "img": [
      "/assets/images/contents/carbonara.jpg"
    ],
    "tags": [
      "italian",
      "pasta"
    ]
  }
]
```

#### get recipe

**GET** `/recipe-api/recipe`

get details for a recipe.

with the following parameters:

- **id**: recipe id to get

returns:

```json
{
  "id": "a8fb4a0b-af17-4e99-96bb-cb8c7ec375d9",
  "title": "Pizza Margherita",
  "likes": 24,
  "category": [
    "lunch",
    "dinner"
  ],
  "date": "2019-12-14T14:30:40+0200",
  "img": [
    "/assets/images/contents/pizza.jpg"
  ],
  "ingredients": [{
      "name": "flour",
      "quantity": 255,
      "measure": "g"
    },
    {
      "name": "water",
      "quantity": 150,
      "measure": "g"
    },
    {
      "name": "salt",
      "quantity": 5,
      "measure": "g"
    },
    {
      "name": "oliveOil",
      "quantity": 20,
      "measure": "g"
    },
    {
      "name": "yeast",
      "quantity": 2.5,
      "measure": "g"
    },
    {
      "name": "mozzarella",
      "quantity": 120,
      "measure": "g"
    },
    {
      "name": "basil"
    }
  ],
  "persons": 2,
  "body": "Lorem ipsum dolor sit amet, consectetur adipscing elit. Morbi malesuada mi non dignissim ornare. Nunc elementum gravida mi. Curabitur bibendum, dolor ac luctus dignissim, eros sapien imperdiet nisi, eget volutpat magna mauris ornare ipsum. Morbi maximus nibh laoreet felis porta, et viverra dui consectetur. Nulla consequat urna ac quam feugiat tincidunt. Vivamus at tempor tortor. Nullam non mi ut risus pretium tempor. Aenean congue et orci in bibendum. Nulla commodo urna blandit ipsum elementum, vitae facilisis sapien varius. Ut rutrum, ipsum faucibus consequat fermentum, lacus mi imperdiet sem, sit amet malesuada lacus orci cursus nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl dui, ornare vel congue ut, ullamcorper ac enim. Donec sit amet tellus aliquam ex fringilla fermentum. Vivamus vel lacinia purus. Quisque vel urna fringilla, pellentesque tortor eget, laoreet libero. Vivamus tristique vehicula enim facilisis condimentum. Sed cursus, massa pellentesque maximus cursus, urna lectus accumsan lectus, vel sagittis eros ligula non purus.Nunc viverra leo sed est iaculis sollicitudin. Nunc consequat sed felis finibus cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed euismod velit sed sem imperdiet dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed mattis ex eget nibh euismod viverra. Donec id nisi fermentum, placerat dui eu, commodo sapien. Fusce convallis ligula sed euismod pretium. Integer facilisis, lectus non bibendum mollis, ex tortor vehicula purus, eu scelerisque odio est sed risus. Aenean cursus dui tempus ultricies pulvinar. In egestas pulvinar arcu, a varius diam aliquam non. Nullam in.",
  "tags": [
    "italian",
    "pizza",
    "vegetarian"
  ]
}
```

#### get tweets

**GET** `/recipe-api/tweets`

- **limit**: maximum amount of records
- **offset**: start index in the search
- **sortBy**: sort by field
  - *date*
  - *username*

returns:

```json
[
  {
    "id": "c306cd77-d57c-4204-88fd-1bdb4697ee25",
    "username": "spegietasHD",
    "nickname": "Spegietas",
    "date": "2020-12-14T13:43:12Z",
    "text": "@veesoskitchen wait, is Sarah actually a cow?",
    "url": "https://twitter.com/"
  },
  {
    "id": "53e9ea9e-cc27-4ae2-838b-d358a7617876",
    "username": "akontyfatti",
    "nickname": "Konty",
    "date": "2021-01-01T04:31:35",
    "text": "Pizza pazzesca #veesoskitchen",
    "url": "https://twitter.com/"
  }
]
```

---

## License

View [LICENSE](LICENSE).

All images used in this website are royalty free.
