"use client";
import { set } from "date-fns";
import {useState, useEffect} from "react";

export default function MealIdeas({selectedItemName}) {
    const [meals, setMeals] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [mealSelect, setMealSelect] = useState("");
    const [mealIngredient, setMealIngredient] = useState([]);
    // const [stringMeasure, setStringMeasure] = useState([]);
    // const [stringIngredient, setStringIngredient] = useState([]);
    const [mealEntries, setMealEntries] = useState([]);
    
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
                // const keyObj = Object.keys(element);
                // const valueObj = Object.values(element);
                const entries = Object.entries(element);
                setMealEntries(entries);
                // entries.map(([key, value]) => { 
                //     if(key.startsWith("strMeasure")) {
                //         setStringMeasure([...ingredient, key]);
                //         setStringIngredient([...ingredient, value]);
                //     } else {
                //         return;
                //     }
                // });
            });
        };
    }, [mealSelect])

    return (
        <>
            <div className="text-white w-72 p-4 max-h-full">
                <h1 className="font-bold">Meal Ideas</h1>
                {ingredient != "" && meals.length > 0 ? (meals.map((meal) => {
                    return (
                        <div className="border border-lime-500 my-2 rounded" key={meal.idMeal} onClick={() => onSelectMealItem(meal.idMeal)}>
                            <p>{meal.strMeal}</p>
                            {mealIngredient != null && mealIngredient.length > 0 && mealIngredient.idMeal === mealSelect.idMeal ? (mealEntries.map(([key, value], index) => {
                                if(key.startsWith("strMeasure")) {
                                    return (
                                        <div className="" key={index}>
                                            <p>{key} {value}</p>
                                        </div>
                                    )
                                }
                            })) : ""}
                        </div>
                    )
                })) : ("No meals found")}
            </div>
        </>
    )
}