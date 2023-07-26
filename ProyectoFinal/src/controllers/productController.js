import * as service from "../services/productServices.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if (!product) res.status(404).json({ message: "Product not found" });
    else res.json(product);
  } catch (error) {
    next(error.message);
  }
};
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await service.update(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error.message);
  }
};
export const create = async (req, res, next) => {
  try {
    // const {name, price, description, stock} = req.params;
    const createdProduct = await service.create(req.body);
    if (!createdProduct)
      res.status(400).json({ message: "Something happen.." });
    else res.json(createdProduct);
  } catch (error) {
    next(error.message);
  }
};
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.erase(id);
    res.json(deleteProduct);
  } catch (error) {
    next(error.message);
  }
};
