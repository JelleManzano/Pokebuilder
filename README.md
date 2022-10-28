# POKEBUILDER
 
 
## [See the App](https://pokebuilder.cyclic.app/)
 
# Description
 
A pokemon fan made app/web, that allows you to see the whole pokedex with the pokemon details for the first 151 pokemons ever created. You can also create a custom pokemon, define all the details however you want to and also lets you see all the community profiles, with a personalized community pokedex that allows you to see every pokemon created by our users.

# Main Functionalities
- Auth procedures
- See all the first 151 pokemon with the pokedex details
- Create a custom pokemon.
- See all the community members.
- See all the pokemons created by the community.

 
 
# Backlog Functionalities

- A video of the first pokemon openin plays when you open the page.

 
# Proyect Structure
 
 
### Models for user and pokemon
 
 - ```const pokeSchema = new Schema({```
  ```pokemon: String,```
  ```name: String,```
  ```types: [String],```
  ```habitat: String,```
 `````` description: String,```
  ```baseStats: [Object],```
  ```photo: String,```
  ```profPhoto: String,```
  ```trainer: {```
    ```type: mongoose.Schema.Types.ObjectId,```
    ```ref: "Trainer"```
 ``` }```
```});```

- ```const trainerSchema = new Schema(```
  ```{```
    ```username: {```
   ```   type: String,```
   ```   trim: true,```
   ```   required: false,```
  ```    unique: true,```
  ```    lowercase: true```
   ``` },```
  ```  email: {```
  ```    type: String,```
  ```    required: true,```
  ```    unique: true,```
   ```   lowercase: true,```
  ```    trim: true```
  ```  },```
 ```   password1: {```
  ```    type: String,```
  ```    required: true```
  ```  },```
  ``` password2: {```
  ```  type: String,```
  ``` },```
  ``` avatar: {```
 ```   type: String,```
  ``` },```
  ``` badges: {```
  ```  type: [String],```
  ``` },```
  ``` village: {```
  ```  type: String,```
  ``` },```
 ``` },```
 ``` {```
  ```  // this second object adds extra properties: `createdAt` and ``` ````updatedAt`    
  ```  timestamps: true```
  ```}```
```);```

 ### routes
- get and post routes with various calls for an API with axios.

 
### views
 
- Different views for each of the views needed for community, pokemon, pokedex, etc.
 
 
# States and Transitions
 
- Home
- LogIn/SignUp
- Pokedex
- Community
- Community Pokedex
- Create a Pokemon
- Profile
- LogOut
