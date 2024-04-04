export const error = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Đã có lỗi xảy ra!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
};
