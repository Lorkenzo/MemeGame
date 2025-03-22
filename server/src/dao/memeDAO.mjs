import {db} from "../db/db.mjs"
import {meme,captions} from "../classes/meme.mjs"

class memeDAO{

    //resolves to a meme object of a single round match
    getMeme(){
        return new Promise((resolve,reject)=>{
            try{
                let sql = "SELECT * FROM memes ORDER BY RANDOM() LIMIT 1"
                db.get(sql,(err,row)=>{
                    if (err) reject(err);
                    if (!row) reject (new Error("Non ci sono meme disponibili!"));

                    const m = new meme(row.mmid,row.path);
                    resolve(m);
  
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    //resolves to a meme object of a sequential round match
    getNextMeme(seenmemes){
        return new Promise((resolve,reject)=>{
            try{
                let sql;
                let params;
                if (seenmemes.length==0){
                    sql = "SELECT * FROM memes ORDER BY RANDOM() LIMIT 1";
                    params = []
                }
                else if (seenmemes.length==1){
                    sql = "SELECT * FROM memes WHERE mmid != ? ORDER BY RANDOM() LIMIT 1";
                    params = [seenmemes[0]]
                } else if (seenmemes.length==2){
                    sql = "SELECT * FROM memes WHERE mmid != ? AND mmid != ? ORDER BY RANDOM() LIMIT 1";
                    params = [seenmemes[0],seenmemes[1]]
                }

                db.get(sql,params,(err,row)=>{
                    if (err) reject(err);
                    if (!row) reject (new Error("Non ci sono meme disponibili!"));

                    const m = new meme(row.mmid,row.path);
                    resolve(m);
    
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    //get 2 random true caption connected to the meme
    getMemeCaptions(memeid){
        return new Promise((resolve,reject)=>{
            
            try{
                let sql= "SELECT * FROM captions WHERE ref_meme = ? ORDER BY RANDOM() LIMIT 2"
                db.all(sql,[memeid],(err,rows)=>{
                    if (err) reject(err);
                    if(!rows) reject(new Error("No captions for this meme"));
                    
                    const memecaptions = rows.map((c)=>new captions(c.cid,c.text));
                    resolve(memecaptions);
                })

            }
            catch(err){
                reject(err)
            }
        })
    }

    //get 5 random false caption for the meme
    getRandCaptions(t1,t2,id){
        return new Promise((resolve,reject)=>{
            try{
                let sql= "SELECT * FROM captions WHERE text != ? AND text != ? AND ref_meme != ? ORDER BY RANDOM() LIMIT 5"
                db.all(sql,[t1,t2,id],(err,rows)=>{
                    if (err) reject(err);
                    if(!rows) reject(new Error("No enough captions to play"));
                    
                    const memecaptions = rows.map((c)=>new captions(c.cid,c.text));
                    resolve(memecaptions);
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    checkCaption(memeid,capid){
        return new Promise((resolve,reject)=>{
            try{
                let sql= "SELECT * FROM captions WHERE ref_meme = ? AND cid = ?"
                db.get(sql,[memeid,capid],(err,rows)=>{
                    if (err) reject(err);
                    if(!rows) resolve (false)
                
                    resolve(true);
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
}



export {memeDAO}