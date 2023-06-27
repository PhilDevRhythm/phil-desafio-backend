// // PASAR ERROR A FUNCION NEXT
// const example = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };


export const errorHandler = async (error, req, res, next) => {
    console.log(`${error.message}`);
    const status = error.status || 404
    res.status(status).send(error.message)
}