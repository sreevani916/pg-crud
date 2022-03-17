const { response, request } = require('express')
const res = require('express/lib/response')


const Pool=require('pg').Pool

const pool=new Pool({
    user: 'sreevanir',
    host: 'localhost',
    database: 'postgres',
    password: 'Admin',
    port:5432
})

const createUser = (request, response) => {
  const { id, entity, details } = request.body

  pool.query('INSERT INTO entity_facts (id, entity, details) VALUES ($1, $2, $3)', [id, entity, details], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${id}`)
  })
}

const getUserById = (request, response) => {
  
  const id = request.params.id;
  
 console.log('id is '+id)
  pool.query('SELECT * FROM entity_facts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsers = (request, response) => {
  
  
}

const getAllUsers=(request,response) =>{

  pool.query('select * from entity_facts ', (error,results)=>
  {
    if(error)
    throw error
    response.status(200).json(results.rows)
  }
  )
}


const deleteUser= (request, response) => {
  
  const id = request.params.id;
  
 console.log('id is '+id)

  pool.query('delete from entity_facts where id=$1',[id],(error,results)=>
  {
    if(error)
    throw error
    response.status(200).send(`deleted id is ${id}`)
  })
}


const updateUser= (request, response) =>
{
  const id = request.params.id;
  const {entity,details} = request.body
  console.log('id is '+id)

  pool.query('update entity_facts set entity=$1, details=$2 where id=$3',[entity,details,id], (error,results)=>
  {
    if(error){
      throw error
    }
    response.status(200).send(`user modified with ${id}`)
  })
}


module.exports ={
createUser,
getUserById,
getAllUsers,
deleteUser,
updateUser

}



