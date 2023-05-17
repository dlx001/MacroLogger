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
    }
    static async findAll() {
        let sql = `SELECT * FROM pantry_items`;
        const results = await db.execute(sql);
        return results[0];
    }
    static deleteById(id){
        let sql = `DELETE FROM pantry_items WHERE id= ${id}`
        db.execute(sql);
    }
}

module.exports=pantryItem;