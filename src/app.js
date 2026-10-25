import express, { Router } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import fs from "fs";

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "50kb"}));
app.use(express.urlencoded({extended : true , limit : "50kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter) // http://localhost:8080/api/v1/users/register

app.use(async (err, req, res, next) => {
    const uploadedFiles = [
        ...(req.file ? [req.file] : []),
        ...Object.values(req.files || {}).flat(),
    ];

    await Promise.all(
        uploadedFiles.map((file) =>
            fs.promises.unlink(file.path).catch((unlinkError) => {
                if (unlinkError.code !== "ENOENT") {
                    console.error("Temporary-file cleanup error:", unlinkError.message);
                }
            })
        )
    );

    const statusCode = err.code === "LIMIT_FILE_SIZE"
        ? 400
        : err.statusCode || 500;
    const message = err.code === "LIMIT_FILE_SIZE"
        ? "Image size must be 5 MB or smaller"
        : err.message || "Request failed";

    return res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
    });
});

export {app}
