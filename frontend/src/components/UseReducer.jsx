import {useReducer} from "react"

const reducer = (state, action) => {
  switch (action.type) {

    case "name":
      return {
        ...state,
        name: "victor"
      }

    case "count":
      return {
        ...state,
        count: state.count + 1
      }

    case "boolean":
      return {
        ...state,
        bool: !state.bool
      }

    default:
      return state
  }
}
const UseReducer =()=>{
  const [state,dispatch] = useReducer(reducer, {name:"",count:0,bool:true})
  const v = [5,5,6,7,4,8,9]
  return(
    <>
          <div>
            <p onClick={()=>dispatch({type:"boolean"})}>click to review</p>
                    {state.bool.toString()}
                    {v}
          </div>
    </>
    )
}
export default UseReducer;