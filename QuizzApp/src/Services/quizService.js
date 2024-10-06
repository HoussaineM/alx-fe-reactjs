import axios from "axios"

export const fetchCategory = async () => {
    const category = await axios.get("https://opentdb.com/api_category.php");
    //console.log(category.data)
    return category.data.trivia_categories;
}

export const fetchQuestions = async (amount, category, difficulty) => {
    //console.log(`amount is: ${amount}`)
    //console.log(`category is: ${category}`)
    //console.log(`difficulty is : ${difficulty}`)
    //const response = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple");
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
    //console.log(response.data.results);
    return response.data.results;
    
}