import React, { useEffect, useRef, useState } from 'react'

function TodoList() {
    const todoRef=useRef()
    const [todos, setTodos] = useState([])
    const [todo, settodo] = useState({
        id:0,
        title:'',
        complete:false
    })
    const [editMode, seteditMode] = useState(false)
    useEffect(() => {
      todoRef.current.focus()
    }, [])
    
    const handleAddTodo = () => {
        if (todo.title.trim() === '') return;
        
        if (!editMode) {
            const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
            setTodos([...todos, {
                id: nextId,
                title: todo.title,
                complete: false
            }])
            settodo({
                id: 0,
                title: '',
                complete: false
            })
        }
        else {
            const updatedTodos = todos.map((each)=> each.id===todo.id ? {...each, title:todo.title}: each)
            setTodos(updatedTodos)
            
            settodo({
                id: 0,
                title: '',
                complete: false
            })
            seteditMode(false)
        }
        
        todoRef.current.focus()
    }
    const handleDeleteTodo=(id)=>{
        let temptodos=todos.filter((each)=> each.id!==id)
        setTodos(temptodos)
    }

    const handleCompleteTodo=(id)=>{
        let tempTodos=todos.map((each)=>{
            return each.id===id? {...each, complete:true} :each
        })
        setTodos(tempTodos)
    }
    const handleEditTodo=(id)=>{
        seteditMode(true)
        const todoToFind=todos.find((each)=> each.id===id)
        settodo({
            id:id,
            title:todoToFind.title,
            complete:todoToFind.complete
        })
    }
  return (
    <div>
        <input ref={todoRef} value={todo.title} onChange={(e)=>settodo({...todo, title:e.target.value})}/>
        <button onClick={handleAddTodo}>Add Todo</button>
        {todos?.map((each)=>{
            return (
                <div style={{textDecoration:`${each.complete ? 'line-through':''}`}} key={each.id}>
                <h4>{each.title}</h4>
                <button onClick={()=>handleDeleteTodo(each.id)} >Delete</button>
                <button onClick={()=>handleCompleteTodo(each.id)}>Complete</button>
                <button onClick={()=>handleEditTodo(each.id)}>Edit</button>
            </div>
            )
        })}
    </div>
  )
}

export default TodoList