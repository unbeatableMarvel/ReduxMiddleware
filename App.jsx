import React from 'react';
//for multiple reducer you have to add 'combineReducers' in redux importing.look below
import {applyMiddleware,createStore} from 'redux';
//for single reducer you have to import redux like this 'import {createStore} from 'redux'

const reducer=(initialState=0,action)=>
{
  
  if(action.type=='INC')
  {
    return initialState+1;
  }
  else if(action.type=='DEC')
  {
    return initialState-1;
  }
  else if(action.type==='E')
  {
    throw new Error("Error Found");
  }
  return initialState;
}
const logger=(store)=>(next)=>(action)=>
{
 console.log("action fired",action);
 //action.type="INC";//whatever action type you set inside middleware function same as it is will be reflected in the reducer function
 next(action);//next() is for calling reducer function which is nect to middleware function logger
}

const error=(store)=>(next)=>(action)=>
{
  try
  {
    next(action);
  }
  catch(e)
  {
    console.log("Error Message",e);
  }
}

const middleware=applyMiddleware(logger,error);
const store=createStore(reducer,1,middleware);

store.subscribe(()=>{
  console.log("Store Changes",store.getState());
  });

store.dispatch({type:"INC"});
store.dispatch({type:"INC"});
store.dispatch({type:"INC"});
store.dispatch({type:"DEC"});
store.dispatch({type:"DEC"});
store.dispatch({type:"E"});

class App extends React.Component {
 render() {
    return (
      
      <div>
      Redux Application
      </div>
      
      );
  }
}


export default App;


