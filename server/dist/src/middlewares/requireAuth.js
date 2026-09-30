import { auth } from "../lib/auth";
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["STUDENT"] = "STUDENT";
    UserRole["TUTOR"] = "TUTOR";
})(UserRole || (UserRole = {}));
export const requireAuth = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await auth.api.getSession({
                headers: req.headers,
            });
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized",
                });
            }
            // TODO: enable emailVerified check before going live
            //   if (session.user.emailVerified != true) {
            //     return res.status(403).json({
            //       success: false,
            //       message: "Please verify your email",
            //     });
            //   }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                role: session.user.role,
            };
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "You don't have permission to access the resources",
                });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
//# sourceMappingURL=requireAuth.js.map