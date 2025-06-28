export const FetchData = async (skip = 0) => {
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    const data = await response.json();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.products);
      }, 1500); 
    });
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    throw error;
  }
};
