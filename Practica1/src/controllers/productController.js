import {
  getAllService,
  getByIdService,
  updateService,
  createService,
  deleteService,
} from "../services/productServices.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await getAllService();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getByIdService(id);
    if (!product) return false;
    else return product;
  } catch (error) {
    next(error.message);
  }
};
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateByIdService(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error.message);
  }
};
export const create = async (req, res, next) => {};
export const erase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await deleteService(id);
    res.json(deleteProduct);
  } catch (error) {
    next(error.message);
  }
};
