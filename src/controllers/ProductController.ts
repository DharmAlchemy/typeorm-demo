import { Request, Response } from "express";

import { Product } from "../entity/Product";
import {Category} from  "../entity/Category";
import { getRepository } from "typeorm";
 
class ProductController {


    static getall = async (req: Request, res: Response) => {
  
       
        const product = await Product.find({ relations: ["category"] });
      
        
        res.status(200).json({ status: "success", data : product });
      };
      
      static getOneById = async (req: Request, res: Response) => {
        
        const id = req.params.id;
      
        try {
          const product = await Product.findOneOrFail(id);
          res.status(200).json({ status: "success", data : product });
      
        } catch (error) {
          res.status(404).json({ status: "fail", error : "Product not Found" });
        }
      };
      

      static new = async (req: Request, res: Response) => {
        
        let { name, price, quantity , categoryId} = req.body;
       

        let category;
        
        try {
          category = await Category.findOneOrFail(categoryId);
        } catch (e) {
          res.status(400).json({ status: "fail", error : "category id is not found" });
          return;
        }

        let product = new Product();
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.category = category;
            
        
        try {
          await Product.save(product);
        } catch (e) {
          res.status(400).json({ status: "fail", error : e });
          return;
        }
      
        res.status(201).json({ status: "success", data : product });
      };
      
      static edit = async (req: Request, res: Response) => {
       
        const id = req.params.id;
      
        let product;
      
        try {
          product = await Product.findOneOrFail(id);
        } catch (error) {
         
          res.status(404).json({ status: "fail", error : "Product not Found" });
          return;
        }        
      
        try {
          await Product.update(id, req.body)
        } catch (e) {
          res.status(400).json({ status: "fail", error : e });
          return;
        }
        
        res.status(200).json({ status: "success", data : product });
      };
      
      
      
      static delete = async (req: Request, res: Response) => {
 
        const id = req.params.id;
      
        
        let product;
        try {
            product = await Product.findOneOrFail(id);
        } catch (error) {
          res.status(404).json({ status: "fail", error : "Product not Found" });
          return;
        }
        Product.softRemove(product);
      
        
        res.status(200).json({ status: "success", data : product });
      
      };


      static deletecat = async (req: Request, res: Response) => {
 
        const id = req.params.id;
        
        const catRepo = getRepository(Category);

        let cat;
        try {
            cat = await catRepo.findOneOrFail(id);
        } catch (error) {
          res.status(404).json({ status: "fail", error : "category not Found" });
          return;
        }
        catRepo.delete(cat);
      
        
        res.status(200).json({ status: "success", data : cat });
      
      };
}

export default ProductController;