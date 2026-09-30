import { tutorProfileServices } from "./tutorProfile.services";
// create tutorProfile
const createTutorProfile = async (req, res, next) => {
    try {
        const result = await tutorProfileServices.createTutorProfile({
            ...req.body,
            userId: req.user.id,
        });
        res.status(201).json({
            success: true,
            message: "Tutor profile created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// get all tutorProfiles
const getAllTutorProfiles = async (req, res, next) => {
    try {
        const { categoryId, minPrice, maxPrice, minRating, search, sortBy, sortOrder, } = req.query;
        const filters = {
            categoryId: categoryId,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            minRating: minRating ? parseFloat(minRating) : undefined,
            search: search,
            sortBy: sortBy,
            sortOrder: sortOrder,
        };
        const result = await tutorProfileServices.getAllTutorProfiles(filters);
        res.status(200).json({
            success: true,
            message: "All tutor profiles are retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// get single tutorProfile
const getSingleTutorProfile = async (req, res, next) => {
    try {
        const tutorId = req.params.id;
        const result = await tutorProfileServices.getSingleTutorProfile(tutorId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Tutor profile not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Get tutor profile successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// get tutorProfile By UserId(own - me)
const getMyTutorProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await tutorProfileServices.getMyTutorProfile(userId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Tutor profile not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Get tutor profile successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// update tutorProfile
const updateTutorProfile = async (req, res, next) => {
    try {
        const tutorId = req.params.id;
        const result = await tutorProfileServices.updateTutorProfile(tutorId, req.body);
        res.status(200).json({
            success: true,
            message: "update tutor profile successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
// delete TutorProfile
const deleteTutorProfile = async (req, res, next) => {
    try {
        const tutorId = req.params.id;
        const result = await tutorProfileServices.deleteTutorProfile(tutorId);
        res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
export const tutorProfileController = {
    createTutorProfile,
    getAllTutorProfiles,
    getSingleTutorProfile,
    updateTutorProfile,
    deleteTutorProfile,
    getMyTutorProfile
};
//# sourceMappingURL=tutorProfile.controller.js.map