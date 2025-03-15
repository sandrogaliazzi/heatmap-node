import express from "express";
import SalesController from "../controllers/salesController.js";

const router = express.Router();

router.post("/goals", SalesController.AddOrUpdateMetrics);
router.post("/addsale", SalesController.AddSale);
router.delete("/deletesale", SalesController.DeleteSale);
router.get("/goals", SalesController.ListMetrics);
router.post("/sales", SalesController.ListSales);
router.get("/sales/:seller", SalesController.ListSalesBySeller);
router.get("/sales/:seller/:city", SalesController.ListSalesBySellerAndCity);
router.get("/sales", SalesController.ListAllSales);
router.delete("/salesdelete/:id", SalesController.DeleteSale);
export default router;
