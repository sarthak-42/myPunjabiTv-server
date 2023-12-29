const categoryModel = require('../models/categoryModel')
const showCategory = async (req, res) =>{
    const lang = req.params.lang.toLowerCase();
    try {
        const categories = await categoryModel.find();

        // Map categories based on the language specified
        const mappedCategories = categories.map(category => {
            if (lang === 'en') {
                return { category: category.category }; // Return the English category
            } else if (lang === 'pu') {
                return { category: category.categoryPa }; // Return the Punjabi category
            } else {
                return { error: 'Invalid language selection' }; // Handle invalid language selection
            }
        });

        res.status(200).json({ categories: mappedCategories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
module.exports = {showCategory}