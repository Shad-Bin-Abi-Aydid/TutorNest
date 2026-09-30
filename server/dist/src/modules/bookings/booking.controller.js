import { bookingServices } from "./booking.services";
// create booking
const createBooking = async (req, res, next) => {
    try {
        const result = await bookingServices.createBooking({
            ...req.body,
            studentId: req.user.id,
        });
        res.status(201).json({
            success: true,
            message: "Booking made successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// get all bookings
const getMyBookings = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const result = await bookingServices.getMyBookings(userId, userRole);
        if (!result || result.length < 1) {
            res.status(404).json({
                success: false,
                message: "Booking not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Booking details found successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// get single booking
const getSingleBooking = async (req, res, next) => {
    try {
        const role = req.user.role;
        const userId = req.user.id;
        const bookingId = req.params.id;
        const result = await bookingServices.getSingleBooking(bookingId, userId, role);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Booking not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Booking found successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// update booking
const updateBookingStatus = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const bookingId = req.params.id;
        const newStatus = req.body.status;
        const result = await bookingServices.updateBookingStatus(bookingId, newStatus, userId, role);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Booking not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Booking status update successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// delete booking
const deleteBooking = async (req, res, next) => {
    try {
        const role = req.user.role;
        const bookingId = req.params.id;
        const result = await bookingServices.deleteBooking(role, bookingId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Booking not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Delete successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
export const bookingController = {
    createBooking,
    getMyBookings,
    getSingleBooking,
    updateBookingStatus,
    deleteBooking,
};
//# sourceMappingURL=booking.controller.js.map