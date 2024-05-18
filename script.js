const searchbox=document.querySelector('.searchbox');
const searchBtn=document.querySelector('.searchBtn');
const recipeconatiner=document.querySelector('.recipecontainer');
const recipeDetailsContent =document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');


const fetchrecipes= async(query)=>{
    recipeconatiner.innerHTML="<h2>Fetching Recipes......</h2>";
    try{
        
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response= await data.json();

    recipeconatiner.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src ="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish </p>
        <p>Belongs to the <span>${meal.strCategory}</span> category </p>
        `

        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        //adding eventlistener to the recipe button

        button.addEventListener('click',(e)=>{
                openRecipePopup(meal);
        });
        recipeconatiner.appendChild(recipeDiv);
    });
}
catch(error){
    recipeconatiner.innerHTML=`<h2> Error in fetching the recipe.</h2>`
}     
}

const fetchIngredients =(meal)=>
{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
  const ingredient=meal[`strIngredient${i}`];
  if(ingredient){
    const measure=meal[`strMeasure${i}`] ;
    ingredientsList+=`<li>${measure} ${ingredient}</li>`
 }
 else{
    break;
 }
    }
    return ingredientsList;
    }
    

const openRecipePopup =(meal) =>{
    recipeDetailsContent.innerHTML=
    `<h2 class="recipename">${meal.strMeal}</h2>
    <h3>Ingridients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeinstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>   
     </div>
    `
 
    recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
recipeDetailsContent.parentElement.style.display="none";
});

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault(); //prevents autosubmission
    const searchInput=searchbox.value.trim();
    if(!searchInput){
        recipeconatiner.innerHTML=`<h2>Pls enter the dish!!!</h2>`;
        return;
    }
    fetchrecipes(searchInput);
    //console.log("Button Clicked");
});