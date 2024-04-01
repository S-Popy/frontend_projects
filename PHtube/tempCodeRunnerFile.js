const URL = "https://openapi.programming-hero.com/api/videos/categories";

const getCatagories = async () => {
    let response = await fetch(URL);  
    let data = await response.json();
    displayCategory(data); 
};

getCatagories();
const displayCategory = data.forEach(data) => {
    console.log(data);
}