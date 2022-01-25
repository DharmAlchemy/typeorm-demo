import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UserController{

static listAll = async (req: Request, res: Response) => {
  
  const userRepository = getRepository(User);
  const users = await userRepository.find();

  
  res.status(200).json({ status: "success", data : users });
};

static getOneById = async (req: Request, res: Response) => {
  
  const id = req.params.id;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id);
    res.status(200).json({ status: "success", data : user });

  } catch (error) {
    res.status(404).json({ status: "fail", error : "User not Found" });
  }
};

static newUser = async (req: Request, res: Response) => {
  
  let { firstName, lastName, age, hobbies } = req.body;
  let user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.age = age;
  user.hobbies = hobbies;

  
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).json({ status: "fail", error : errors });
    return;
  }

  const userRepository = getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(400).json({ status: "fail", error : e });
    return;
  }

  
  res.status(201).json({ status: "success", data : user });
};

static editUser = async (req: Request, res: Response) => {
 
  const id = req.params.id;

  
  const { firstName, lastName, age } = req.body;

  
  const userRepository = getRepository(User);

  let user;

  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
   
    res.status(404).json({ status: "fail", error : "User not Found" });
    return;
  }

  
  user.firstName = firstName;
  user.lastName = lastName;
  user.age = age;

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).json({ status: "fail", error : errors });
    return;
  }

  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(400).json({ status: "fail", error : e });
    return;
  }
  
  res.status(200).json({ status: "success", data : user });
};

static deleteUser = async (req: Request, res: Response) => {
 
  const id = req.params.id;

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).json({ status: "fail", error : "User not Found" });
    return;
  }
  userRepository.delete(id);

  
  res.status(200).json({ status: "success", data : user });

};

static softdelete = async(req: Request , res: Response)=>{
  const id = req.params.id;

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).json({ status: "fail", error : "User not Found" });
    return;
  }
  userRepository.softRemove(user);

  
  res.status(200).json({ status: "success", data : user });
}
};

export default UserController;