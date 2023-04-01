const getPoolforadmin = require('../databases/DBconfigforadmin');
exports.Insertactor = async function(actorname,DOB,nationality,gender,photo,imbdid){
    
      console.log("insert actor function")
   try{
    const pool = await getPoolforadmin().connect()
    
    const result = await pool.request()
    .input('ActorName',actorname)
    .input('DOB',DOB)
    .input('nationality',nationality)
    .input('gender',gender)
    .input('photo',photo)
    .input('imdbid',imbdid)
    .execute('InsertActor')
    console.log(result)
    return result.recordset[0].actorexists;
   }catch(error){
         return error;
   }
}
exports.insertmovie = async function(moviename,moviedirector,releasedate,genre,overview,imbdid,photo){
      console.log("insert movie function")
      console.log(imbdid)

      try{
       const pool = await getPoolforadmin().connect()
       
       const result = await pool.request()
       .input('moviename',moviename)
       .input('moviedirector',moviedirector)
       .input('releaseDate',releasedate)
       .input('genre',genre)
       .input('photo',photo)
       .input('imdbID',imbdid)
       .input('overview',overview)
       .execute('insertmovie')
       console.log(result)
       return result.recordset[0].movieadded;
      }catch(error){
            console.log(error)
            return error;
      }
   }

exports.actormoviejunction = async function(movieimdbid,actorimdbid){
      console.log("insert junction function")
      console.log(movieimdbid)
      console.log(actorimdbid)
      try{
            const pool = await getPoolforadmin().connect()
            
            const result = await pool.request()
            .input('movie_imdb_id',movieimdbid)
            .input('actor_imdb_id',actorimdbid)
            .execute('movieactorjunction')
            console.log(result)
            return result;
           }catch(error){
            console.log(error)
                 return error;
           }
}
exports.checkActorExist = async function(actorIMDBID, actorName) {
      try {
        const pool = await getPoolforadmin().connect();
        const result = await pool.request()
          .input('actorIMDBID', actorIMDBID)
          .input('actorname', actorName)
          .execute('checkactorexist');
        console.log(result);
        return result.recordset[0].actorexist;
      } catch(error) {
        console.log(error);
        return error;
      }
    }

    exports.deleteUser = async function(username, email) {
      try {
        const pool = await getPoolforadmin().connect();
        const result = await pool.request()
          .input('username', username)
        .execute('deleteuser');
        console.log(result);
        return result.recordset[0][''];
      } catch(error) {
        console.log(error);
        return error;
      }
    }
    
    exports.movierequests = async function(){
      try{
        const pool = await getPoolforadmin().connect()
        const result = await pool.request()
        .execute('getallmoviereqs')
        console.log(result)
        return result.recordset;
      }catch(error){
        console.log(error)
        return error;
      }
    }

    exports.viewallrequestedwikis=async function(){
      
    }