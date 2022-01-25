import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Hobbies } from "../entity/Hobbies";

class HobbiesController{

static listAll = async (req: Request, res: Response) => {
  
  const hobbiesRepository = getRepository(Hobbies);
  const hobbies = await hobbiesRepository.createQueryBuilder("hobbies").getMany();
  const hobbies1 = await hobbiesRepository.createQueryBuilder("hobbies").select("hobbies.name").where("hobbies.id = :id", { id: 1 }) .getOne();
  const hobbies2 = await hobbiesRepository.createQueryBuilder("hobbies").orderBy("hobbies.name").getMany();

  
  res.status(200).json({ status: "success", data : hobbies2});
};

static new = async (req: Request, res: Response) => {
  
  let { name } = req.body;
  let hobby = new Hobbies();
  hobby.name = name;
  

  const hobbiesRepository = getRepository(Hobbies);
  try {
    await hobbiesRepository.save(hobby);
  } catch (e) {
    res.status(400).json({ status: "fail", error : e });
    return;
  }

  
  res.status(201).json({ status: "success", data : hobby });
};

static edit = async (req: Request, res: Response) => {
 
  const id = req.params.id;

  
  const { name } = req.body;

  
  const hobbiesRepository = getRepository(Hobbies);

  let hobby;

  try {
    hobby = await hobbiesRepository.findOneOrFail(id);
  } catch (error) {
   
    res.status(404).json({ status: "fail", error : "not Found" });
    return;
  }

  hobby.name = name;
 
  try {
    await hobbiesRepository.save(hobby);
  } catch (e) {
    res.status(400).json({ status: "fail", error : e });
    return;
  }
  
  res.status(200).json({ status: "success", data : hobby });
};

};

export default HobbiesController;