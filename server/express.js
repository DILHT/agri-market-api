import express from 'express'
import cors from 'cors'
import authRoutes  from './routes/auth.routes.js'
import productsRoutes from './routes/product.route.js'

const app = express()
app.use(cors())
app.use(express.json())



app.get("/healthz", (_req, res) => res.status(200).json({ status: "ok" }));

//routes
app.use("/auth",authRoutes);
app.use("/products",productsRoutes)

export default app