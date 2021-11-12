const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const  { RecipeModel } = require("../models");
const Recipe = require("../models/recipe");

router.post('/post', async (req, res) => {
    res.send('this is a recipe test')
});

router.post('/create' , validateSession, function (req, res) {
    
    RecipeModel.create({
            nameOfDessert: req.body.recipe.nameOfDessert,
            recipe : req.body.recipe.recipe,
            directions: req.body.recipe.directions,
            timeToBake: req.body.recipe.timeToBake,
            servings: req.body.recipe.servings,
            photo: req.body.recipe.photo,
            userId: req.user.id
        })
        .then((recipe) => res.status(200).json(recipe))
        .catch((err)=> res.status(500).json({error: err}))
});

router.get('/get', validateSession, function (req, res) {
  
    Recipe.findAll()
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({error: err}))
})

// /*UPDATE*/
// router.put("/update/:id", validateSession, function (req, res) {
    
//     let query;
//      if (req.user.role == "admin"){
//         query = { where: {id: req.params.id}};
//     } else {
//     query = {where: {id: req.params.id, owner: user.id }}

// }    const updatedRecipe = {
//         nameOfDessert: req.body.recipe.nameOfDessert,
//         recipe: req.body.recipe.recipe,
//         directions: req.body.recipe.directions,
//         timeToBake: req.body.recipe.timeToBake,
//         servings: req.body.recipe.servings,
//         photo: req.body.recipe.photo
//         // userId: req.user.id
//     };
//     try {
//         const update = RecipeModel.update(updatedRecipe, query);
//              res.status(200).json({message: "Recipe updated"});
//              } catch (err) {
//                  res.status(500).json({error: err.message})
//              }

// })

/* DELETE */
router.delete("/delete/:id", validateSession, function (req, res) {
    let query;
    if (req.user.role == "admin") {
      query = {where: {id: req.params.id}};
    } else {
        query = {where: {id: req.params.id, owner: user.id}}
    }
    Recipe.destroy(query)
      .then((recipe) => res.status(200).json({message: "Recipe Removed"}))
      .catch((err) => res.status(500).json({error: err}));
  });
  
 
/*Update Recipe*/
router.put("/update/:id", validateSession, async (req, res) => {
    
    const updatedRecipe = {
        nameOfDessert: req.body.recipe.nameOfDessert,
        recipe: req.body.recipe.recipe,
        directions: req.body.recipe.directions,
        timeToBake: req.body.recipe.timeToBake,
        servings: req.body.recipe.servings,
        photo: req.body.recipe.photo
    };
    const query = { where: { id: req.params.id, owner: req.user.id }};


        Recipe.update(updatedRecipe, query)
        .then((recipes) => res.status(200).json({message: "Recipe Updated"}))
        .catch((err) => res.status(500).json({error: err}));
        
    
})

// // /*Delete */
// router.delete("/delete/:id", validateSession, function (req, res) {
        
//     let query: 

//     // if(req.user.role == "admin"){
//     //     query ={where: { id: req.params.id } }
//     //    } else {
//     //        query = 
//     //        {where: {id: req.params.id, owner: user.id }}
//     //    }
//         if(req.user.role == "admin") {
//             query = {where: {id: req.params.id}}
//         }
//        Recipe.destroy(query)
//        .then((recipe) => {
//            if(recipe) {
//                res.status(200).json({message: 'Recipe Removed' })
//            } else {
//                res.status(200).json({message: 'Recipe not deleted'})
//            }
//        })
//        .catch((err) => res.status(500).json({error: err }))
         
//   })


module.exports = router;