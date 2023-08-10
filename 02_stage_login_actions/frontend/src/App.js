/* eslint-disable no-fallthrough */
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/loginpage';
import Navbar from "./components/navbar";
import NewHuutoKauppaForm from './components/newhuutokauppaform';
import HuutokauppaLista from './components/auctionslist'
import AdminPage from './components/adminPage';

// EDITOINTI EI TOIMI // .

function App() {
  const [state, setState] = useState({
    list: [],
    mode: "addhuutokauppa",
		editauc: {},
    isLogged: false,
    token: "",
    loading: false,
    error: "",
    user: ""
  });

  const [urlRequest, setUrlRequest] = useState({
    url: "",
    request: {},
    action: ""
  });

  console.log("App");

  // HELPER FUNCTIONS
  useEffect(() => {
    if (sessionStorage.getItem("state")) {
      let state = JSON.parse(sessionStorage.getItem("state"));
      setState(state);
      if (state.isLogged) {
        getList(state.token);
      }
    }
  }, []);

  const saveToStorage = (state) => {
    sessionStorage.setItem("state", JSON.stringify(state));
  };

  const setLoading = (loading) => {
    setState((state) => ({
      ...state,
      loading,
      error: ""
    }));
  };

  const setError = (error) => {
    setState((state) => {
      let tempState = {
        ...state,
        error
      };
      saveToStorage(tempState);
      return tempState;
    });
  };

  const clearState = (error) => {
    let state = {
      list: [],
      isLogged: false,
      loading: false,
      token: "",
      error:error,
      user: ""
    };
    saveToStorage(state);
    setState(state);
  };

useEffect(()=>{

const fetchData = async () => {
  if(!urlRequest.url){
    return
  }
  setLoading(true)
  const response = await fetch(urlRequest.url, urlRequest.request)
  setLoading(false)
  if(!response){
    clearState("ClearState action - logout")
    return
  }

if(response.ok)
switch(urlRequest.action){
  case "getlist":
    const data = await response.json()
    if(!data){
      setError("Error in getlist")
      return
    }

    setState((state)=>{
      let tempState = {
        ...state,
        list:data
      }
      saveToStorage(tempState)
      return tempState
    })
    return
    case "addhuutokauppa":
      case "removehuutokauppa":
          case "edithuutokauppa":
            getList()
              return;
            case "register":
            setError("Register succesfull")
            return
            case "login":
              const loginData = await response.json()
              if(!loginData){
                setError("Error in login")
                return
              }

              setState((state)=>{
                let tempState ={
                  ...state,
                  isLogged:true,
                  token:loginData.token
                }

                saveToStorage(tempState)
                return tempState
              })
getList(loginData.token)
return
case "logout":
  clearState("")
  return
  default:
    return

}
else{
  if(response.status === 401){
    setError("Unauthorized")
    clearState("Unauthorized")
    return
  }

  let errorMessage = "Error in fetching data"+response.status+" "+response.statusText
  switch(urlRequest.action){
    case "register":
      if(response.status === 409){
        errorMessage = "Username already exists"
      }
      else{
        setError(errorMessage)
        return
      }
      case "login":
						setError("Login failed."+errorMessage);
						return;

            case "getlist":
						setError("Failed to fetch shopping information."+errorMessage);
						return;

            case "addhuutokauppa":  
            setError("Failed to add new huutokauppa."+errorMessage);

            case "removehuutokauppa":
              setError("Failed to remove huutokauppa."+errorMessage);

              case "edithuutokauppa":
                setError("Failed to edit huutokauppa."+errorMessage);

                case "logout": 
                setError("Logout failed."+errorMessage);
                return
                default:
                  return

}}



}
fetchData()

},[urlRequest])





  
  const getList = (token, search) => {
    let tempToken = state.token;
    if (token) {
      tempToken = token;
    }
    let url = "/api/huutokaupat";
    if (search) {
      url = url + "?type=" + search;
    }
    setUrlRequest({
      url,
      request: {
        method: "GET",
        headers: {
          token: tempToken
        }
      },
      action: "getlist"
    });
  };

  

  const addHuutokauppa = (huutokauppa) => {
    setUrlRequest({
      url: "/api/huutokaupat",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token":state.token
        },
        body: JSON.stringify(huutokauppa)
      },
      action: "addhuutokauppa"
    });
  };

  const removeHuutokauppa = (id) => {
    setUrlRequest({
      url: "/api/huutokaupat/" + id,
      request: {
        method: "DELETE",
        headers: {
          "token": state.token
        }
      },
      action: "removehuutokauppa"
    });
  };
	const changeToEditMode =(editauc) => {
		setState((state)=> {
		return {
			...state,
			mode:"edithuutokauppa",
			editauc:editauc
		}
		})
	}


  const editHuutokauppa = (huutokauppa) => {
    setUrlRequest({
      url: "/api/huutokaupat/"+huutokauppa._id,
      request: {
        method: "PUT",
        headers: {
          "token":state.token,
          "Content-type": "application/json"
        },
        body: JSON.stringify(huutokauppa)
      },
      action: "edithuutokauppa"
    });
  };

  const register = (user) => {
    setUrlRequest({
      url: "/register",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      },
      action: "register"
    });
  };

  const login = (user) => {
    setUrlRequest({
      url: "/login",
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      },
      action: "login"
    });
    setState((state) => ({
      ...state,
      user: user.username
    }));
  };

  const logout = () => {
    setUrlRequest({
      url: "/logout",
      request: {
        method: "POST",
        headers: {
          "token": state.token
        }
      },
      action: "logout"
    });
  };

  let message = <h4></h4>;
  if (state.loading) {
    message = <h4>Loading ...</h4>;
  }
  if (state.error) {
    message = <h4>{state.error}</h4>;
  }

  if (state.isLogged) {
    return (
      <div className='App'>
        <Navbar logout={logout} isLogged={state.isLogged} user={state.user} />
        <div style={{ height: 25, textAlign: "center" }}>
          {message}
        </div>
        <Routes>
          <Route path="/" element={
          <AdminPage 
          list={state.list} 
          removeHuutokauppa={removeHuutokauppa} 
          editHuutokauppa={editHuutokauppa} 
          addHuutokauppa={addHuutokauppa} 
          editauc={state.editauc} 
          changeToEditMode={changeToEditMode}
         />} />
      
          <Route path="/form" element={<NewHuutoKauppaForm addHuutokauppa={addHuutokauppa} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className='App'>
        <Navbar logout={logout} isLogged={state.isLogged} user={state.user} />
        <div style={{ height: 25, textAlign: "center" }}>
          {message}
        </div>
        <Routes>
          <Route path="/" element={<LoginPage login={login} register={register} setError={setError} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }
}

export default App;