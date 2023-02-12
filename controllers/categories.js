import Category from "../models/Category.js";
// import User from "../models/User.js";

//CREATE
export const createCategory = async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
      } 
    catch (err) {
        res.status(500).json({ message: err.message  })
    }
}

//GET_CATEGORY
export const getCategory = async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
      } catch (error) {
        res.status(404).json({ message: error.message  })
    }
}