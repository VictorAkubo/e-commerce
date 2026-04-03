const Polymorph=({as,children})=>{
  const Component = as 
  return(
    <Component style={{fontSize: "30px"}}>
      {children}
    </Component>
    )
}
export default Polymorph;