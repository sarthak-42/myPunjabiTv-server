// // newsController.js
// const News = require('../models/newsModel');

// const getNewsByLanguage = async (req, res) => {
//     const lang = req.params.lang.toLowerCase();

//     try {
//         // Fetch the latest item based on the createdAt field in descending order
//         const newsItems = await News.find().sort({ createdAt: -1 });
        
//         if (!newsItems || newsItems.length === 0) {
//             return res.status(404).json({ error: 'No news items found' });
//         }

//         const response = newsItems.map(news => {
//             const createdAtDate = new Date(news.createdAt).toISOString().split('T')[0];
//             return {
//                 'en': {
//                     title: news.title,
//                     description: news.description,
//                     img: news.img,
//                     videoUrl: news.videoUrl,
//                     createdAt: createdAtDate
//                 },
//                 'pu': {
//                     title: news.titlePa || "No title in Punjabi available",
//                     description: news.descriptionPa || "No description in Punjabi available",
//                     img: news.img,
//                     videoUrl: news.videoUrl,
//                     createdAt: createdAtDate
//                 },
//                 'default': {
//                     error: 'Invalid language selection'
//                 }
//             }[lang] || { error: 'Invalid language selection' };
//         });
//         res.json(response);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
// module.exports ={getNewsByLanguage}
const News = require('../models/newsModel');
const Category = require('../models/categoryModel'); // Import your Category model

const getNewsByLanguage = async (req, res) => {
    const lang = req.params.lang.toLowerCase();

    try {
        // Use aggregation to join with categories based on categoryId
        const newsItems = await News.aggregate([
            {
                $sort: { createdAt: -1 } // Sorting by createdAt in descending order
            },
            {
                $lookup: {
                    from: 'categories', // Assuming your categories collection name is 'categories'
                    localField: 'categoryId', // Field in the News collection
                    foreignField: '_id', // Field in the Category collection
                    as: 'categoryData'
                }
            },
            {
                $addFields: {
                    category: {
                        $cond: [
                            { $eq: [lang, 'en'] },
                            '$categoryData.category', // English category
                            '$categoryData.categoryPa' // Punjabi category
                        ]
                    }
                }
            },
            {
                $project: {
                    title: {
                        $cond: [
                            { $eq: [lang, 'en'] },
                            '$title',
                            '$titlePa'
                        ]
                    },
                    description: {
                        $cond: [
                            { $eq: [lang, 'en'] },
                            '$description',
                            '$descriptionPa'
                        ]
                    },
                    img: 1,
                    videoUrl: 1,
                    createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    category: 1
                }
            }
        ]);

        if (!newsItems || newsItems.length === 0) {
            return res.status(404).json({ error: 'No news items found' });
        }

        res.json(newsItems);
    } catch (error) {
        console.error('Error fetching news by language:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getNewsByLanguage };
