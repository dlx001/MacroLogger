const db = require('../config/db')


class pantryItem{
    constructor({name,calories,servingSize,fat,carbohydrate,protein}){
        this.name=name;
        this.calories=calories;
        this.servingSize=servingSize;
        this.protein=protein;
        this.fat=fat;
        this.carbohydrate=carbohydrate;
    }
    async save(){
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth()+1;
        let dd = d.getDate();
        let createdAt  = `${yyyy}-${mm}-${dd}`;
        console.log(this.name);
        /*
        let sql = `
        INSERT INTO pantry_items(
            name,calories,servingSize,protein,fat,carbohydrate,createdAt
        )VALUES(
          (?,?,?,?,?,?,?))
        `
        */
        let sql = `
        INSERT INTO pantry_items (
            name, calories, servingSize, protein, fat, carbohydrate, createdAt
          ) VALUES (
            ?, ?, ?, ?, ?, ?, ?
          )
          `
       //const [newItem] = await db.execute(sql);
        const [newItem] = await db.execute(sql,[this.name,this.calories,this.servingSize,this.protein,this.fat,this.carbohydrate,createdAt]);
        console.log(newItem);
    }
    static findAll(){

    }
}

module.exports=pantryItem;