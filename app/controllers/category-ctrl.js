import { Category } from "../models/category-model.js";

export const createCategory = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      image,
      isActive = true,
      sortOrder,
    } = req.body;

    const newCategory = new Category({
      name,
      slug,
      description,
      image,
      isActive,
      sortOrder,
    });

    const savedCategory = await newCategory.save();
    res
      .status(201)
      .json({ message: "Category created.", category: savedCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ message: "Server error while creating category.", error: error });
  }
};


export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image, isActive, sortOrder } = req.body;

    const updatedFields = {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(description && { description }),
      ...(image && { image }),
      ...(isActive && { isActive }),
      ...(sortOrder && { sortOrder }),
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res
      .status(200)
      .json({ message: "Category updated.", category: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res
      .status(200)
      .json({ message: "Category deleted.", category: deletedCategory });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};
