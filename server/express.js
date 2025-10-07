import express from 'express'
import cors from 'cors'
import authRoutes  from './routes/auth.routes.js'
import productsRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import orderRoutes from './routes/order.route.js'
import paymentRoutes from './routes/payment.route.js'
// import path from 'path'


const app = express()
app.use(cors())
app.use(express.json())



app.get("/healthz", (_req, res) => res.status(200).json({ status: "ok" }));

//serve static files
// app.use('/uploads',express.static(path.join(process.cwd(),'uploads')))
//routes
app.use("/auth",authRoutes);
app.use("/products",productsRoutes);
app.use("/cart",cartRoutes);

app.use("/orders",orderRoutes)

//for payments
app.use('/payment', paymentRoutes);

export default app