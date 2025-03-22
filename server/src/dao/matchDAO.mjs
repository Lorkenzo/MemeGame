import {db} from "../db/db.mjs"
import {match,roundRecording} from "../classes/match.mjs"
class matchDAO{

    //resolves to true if the match is correctly registered
    recordMatch(date,user_id){
        return new Promise((resolve,reject)=>{
            try{
                let sql = 'INSERT INTO matchresults(date,ref_user) VALUES (?,?)'
                db.run(sql, [date,user_id], function (err){
                    if (err) reject(err);
                    
                    //resolves true
                    resolve(this.lastID)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    recordRound(match_id,img_id,cap_id,score){
        return new Promise((resolve,reject)=>{
            try{
                let sql = 'INSERT INTO roundresults(ref_match,ref_meme,ref_caption,score) VALUES (?,?,?,?)'
                db.run(sql, [match_id,img_id,cap_id,score], function (err){
                    if (err) reject(err);
                    
                    //resolves true
                    resolve(true)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    updateUserScore(score,user_id){
        return new Promise((resolve,reject)=>{
            try{
                let sql = 'UPDATE users SET tot_score = tot_score + ? WHERE uid = ?'
                db.run(sql, [score,user_id], function (err){
                    if (err) reject(err);
                    
                    //resolves true
                    resolve(this.changes)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    //resolves to an array of match
    getMatches(user_id){
        return new Promise((resolve,reject)=>{
            try{
                const sql= "SELECT * FROM matchresults WHERE ref_user = ? ORDER BY date DESC"
                db.all(sql,[user_id],(err,rows)=>{
                    if (err) reject(err);
                    if (!rows) reject(new Error("Non hai match registrati per questo account!"))
                    
                    const matches = rows.map((m)=>new match(m.mrid,m.date,m.user_id));
                    resolve(matches)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    getRounds(match_id){
        return new Promise((resolve,reject)=>{
            try{
                const sql= `SELECT * FROM roundresults AS R
                JOIN memes AS M ON R.ref_meme = M.mmid
                LEFT JOIN captions AS C ON R.ref_caption = C.cid
                WHERE ref_match = ?`
                db.all(sql,[match_id],(err,rows)=>{
                    if (err) reject(err);
                    if (!rows) reject(new Error("Non hai Round registrati per questo account!"))

                    const rounds = rows.map((r)=>{
                        if (r.text==null) return new roundRecording("No answer given",r.path,r.score)
                        else return new roundRecording(r.text,r.path,r.score)
                    });
                    resolve(rounds)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }

    getTotalScore(user_id){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT tot_score FROM users WHERE uid = ?';
            db.get(sql, [user_id], (err, row) => {
              if (err) { 
                reject(err); 
              }
              else if (row === undefined) { 
                resolve({error: 'User not found!'}); 
              }
              else {
                const score = row.tot_score;
                resolve(score);
              }
            });
          });
    }
}

export {matchDAO}