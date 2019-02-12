
const MySQL = require('sync-mysql')


var db = null
var qryStr = 'select' 
var fields = ''
var tables = '' 
var wheres = '' 
var filters = ["eq", "ne", "gt", "ge","lt","le"]

var filterSymbols = new Object();
    filterSymbols["eq"] ="="
    filterSymbols["ne"] ="!="
    filterSymbols["gt"] =">"
    filterSymbols["ge"] =">="
    filterSymbols["lt"] ="<"
    filterSymbols["le"] ="<="

//Configuration of DB
/*
       {
           host:'localhost', // Your Hostname or Host IP
           user:'root',      // Username of database
           password:'',      // Password of database 
           database:'mysql'  // Name of Database  
       }
*/
   funkyMySQL = function(dbinfo)
       {
           db = new MySQL(dbinfo)
       }  

   funkyMySQL.prototype.select = function(field)
       {
           qryStr = 'select'
           fields+=field.join(',').toString()+' '

       }

   funkyMySQL.prototype.from = function(table)
       {
           tables = table
               
               //return db.query(qryStr)
       }

   funkyMySQL.prototype.where = function(clause)
       {
           if(clause && clause.length)
               {
                   wheres = 'where '
                   
                       var index = 0
                       clause.forEach(element => {
                           
                           var fieldName = ''
                           var fieldValue = ''
                           var symbol=''
                           for(key in element)
                           {
                           var filters = ["eq", "ne", "gt", "ge","lt","le"] 
                           
                           if(filters.indexOf(key)>-1 && symbol==''){ 
                                       
                               symbol = filterSymbols[key] 
                                   
                           }
                           else if(key!='isOR' && filters.indexOf(key)==-1)
                           {
                               fieldName = key
                               fieldValue = element[key]
                           } 
                           }


                           if(symbol=='')
                               symbol='='
                           
                           
                           if(index>0)
                           {
                               if(clause[index-1]['isOR'])  
                                   wheres+=" or "+fieldName+symbol+fieldValue
                               else
                                   wheres+=" and "+fieldName+symbol+fieldValue    
                           }    
                           else
                           {
                               wheres+=fieldName+symbol+fieldValue
                           } 

                           index++

                       });

               }
       }

     funkyMySQL.prototype.result = function()
       {
           
               if(fields!='')
                 qryStr+=' '+fields
               else
                 qryStr+=' * '
               
               
               qryStr=qryStr+'from '+tables

               if(wheres!='')
               qryStr+=" "+wheres

               var exe_QRY =  qryStr
               qryStr ='select'
               fields = ''
               tables = '' 
               wheres = ''

               if(db)
               return db.query(exe_QRY)  
               else
               return "MySQL Config missing or Wrong, Please check it!"
       }

     funkyMySQL.prototype.getQryStr = function()
       {
               if(fields!='')
                    qryStr+=' '+fields
               else
                    qryStr+=' * '
               
               
               qryStr=qryStr+'from '+tables

               if(wheres!='')
                  qryStr+=" "+wheres
           
               var exe_QRY =  qryStr
               qryStr ='select'
               fields = ''
               tables = '' 
               wheres = ''
               return exe_QRY
       }  

     funkyMySQL.prototype.get = function(table)
       {
           var qry = "select * from "+table

           if(db)
               return db.query(qry)  
           else
               return "MySQL Config missing or Wrong, Please check it!"
       }


  //Final export
  module.exports = funkyMySQL
 