const globalErrorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: process.env.NODE_ENV === "development" ? err : "Something went wrong",
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map