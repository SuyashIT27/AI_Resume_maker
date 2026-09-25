export function errorMiddleware(error, req, res, next) {
  console.error(error);

  const status = Number(error?.statusCode || error?.status) || 500;

  res.status(status).json({
    success: false,
    message: error?.message || "Internal server error.",
  });
}
