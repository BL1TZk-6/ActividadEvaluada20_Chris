import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import studentsRoutes from "./src/routes/students.js";
import registerStudentRoutes from "./src/routes/studentsRegister.js";
import loginStudentRoutes from "./src/routes/studentsLogin.js";
import logOutRoutes from "./src/routes/logOut.js";
import recoveryPasswordStudentsRoutes from "./src/routes/recoveryPasswordStudents.js";
import specialitesRoutes from "./src/routes/specialities.js"
import recoveryPasswordTeachersRoutes from "./src/routes/recoveryPasswordTeachers.js";
import subjectsRoutes from "./src/routes/subjects.js";
import loginTeacherRoutes from "./src/routes/TeacherLogin.js";
import registerTeacherRoutes from "./src/routes/teacherRegister.js";
import teacherRoutes from "./src/routes/teachers.js";
import tuitionsRoutes from "./src/routes/tuitions.js"

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }),
);
app.use (cookieParser())

app.use(express.json());
app.use("/api/students", studentsRoutes);
app.use("/api/registerStudent", registerStudentRoutes);
app.use("/api/loginStudent", loginStudentRoutes);
app.use("/api/logout", logOutRoutes);
app.use("/api/recoveryPasswordStudents", recoveryPasswordStudentsRoutes);
app.use("/api/specialities", specialitesRoutes);
app.use("/api/recoveryPasswordTeachers", recoveryPasswordTeachersRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/loginTeacher", loginTeacherRoutes);
app.use("/api/registerTeacher", registerTeacherRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/tuitions", tuitionsRoutes);


export default app;