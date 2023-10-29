"use client";
import { set } from "date-fns";
import {useState, useEffect} from "react";

export default function MealIdeas({selectedItemName}) {
    const [meals, setMeals] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [mealSelect, setMealSelect] = useState("");
    const [mealIngredient, setMealIngredient] = useState([]);
    const [stringMeasure, setStringMeasure] = useState([]);
    const [stringIngredient, setStringIngredient] = useState([]);

    function onSelectMealItem(mealItem) {
        console.log(mealItem);
        setMealSelect(mealItem);
    }

    useEffect(() => {
        setIngredient(selectedItemName);
    }, [selectedItemName])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
                if(response == "") {
                    console.log("Fetch failed");
                }
                const data = await response.json();
                if(data.meals == null) {
                    console.log("No meals found");
                    setMeals([]);
                } else {
                    setMeals(data.meals);
                }
                // console.log(data.meals);
                // setMeals(data.meals);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [ingredient]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealSelect}`);
                if(response == "") {
                    console.log("Fetch failed");
                }
                const data = await response.json();
                if(data == null) {
                    console.log("No meals found");
                    setMealIngredient([]);
                } else {
                    console.log(data.meals);
                    setMealIngredient(data.meals);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

        if(mealIngredient !== null) {
            mealIngredient.map((element) => {
                if(element.startsWith("strMeasure")) {
                    setStringMeasure([...ingredient, element]);
                } else {
                    return;
                }
            });

            mealIngredient.map((element) => {
                if(element.startsWith("strIngredient")) {
                    setStringIngredient([...ingredient, element]);
                } else {
                    return;
                }
            });
        };


        console.log(stringMeasure);
        console.log(stringIngredient);
    }, [mealSelect])

    return (
        <>
            <div className="text-white w-72 p-4 max-h-full">
                <h1 className="font-bold">Meal Ideas</h1>
                {ingredient != "" && meals.length > 0 ? (meals.map((meal) => {
                    console.log(meal.strMeal);
                    return (
                        <div className="border border-lime-500 my-2 rounded" key={meal.idMeal} onClick={() => onSelectMealItem(meal.idMeal)}>
                            <p>{meal.strMeal}</p>
                            {mealIngredient != null && mealIngredient.length > 0 ? (mealIngredient.map((ingredient, index) => {
                                console.log(ingredient);
                                return (
                                    <div className="" key={ingredient.idMeal}>
                                        <p>{ingredient.strMeasure} {ingredient.strIngredient}</p>
                                    </div>
                                )
                            })) : ""}
                        </div>
                    )
                })) : ("No meals found")}
            </div>
        </>
    )
}