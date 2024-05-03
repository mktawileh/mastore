import { readFileSync } from "fs";
import File from "../features/File/File.model";
import { hashSync } from "bcryptjs";
import User from "../features/User/models/User.model";
import Product from "../features/Product/models/Product.model";

export default class SeedService {
  public async run() {
    try {
      let usersJSON: any[] = JSON.parse(readFileSync("./src/features/User/seeders/users.json").toString());
      usersJSON = usersJSON.map(u => {
        u.password = hashSync(u.password, 10);
        return u;
      });
      await User.bulkCreate(usersJSON);
      console.log("☑  Created " + usersJSON.length + " user successfully");
      
      const imagesJSON = JSON.parse(readFileSync("./src/features/Product/seeders/images.json").toString());
      const files = await File.bulkCreate(imagesJSON);
      console.log("☑  Created " + imagesJSON.length + " image successfully");

      const productsJSON = JSON.parse(readFileSync("./src/features/Product/seeders/products.json").toString());
      const products = await Product.bulkCreate(productsJSON);
      for (let i = 0; i < productsJSON.length; i++) {
        await products[i].setFiles([files[i]]);
      }
      console.log("☑  Created " + productsJSON.length + " product successfully")
    } catch (error) {
      console.error("ERROR:", error);
    }
  }
}