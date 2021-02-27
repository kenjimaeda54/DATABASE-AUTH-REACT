import React, { Component } from 'react';
import firebase from './config';

class App extends Component{
      constructor(props){
        super(props);
        this.state={
           nome:"",
           senha:"",
           email:""
        }
      this.cadastrar=this.cadastrar.bind(this);
      firebase.auth().signOut();
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          firebase.database().ref('Usuarios').child(user.uid).set({
             nome:this.state.nome
          })
          //para limpar o estado de forma correta,utiliza o then,dentro do if
          //do user no onAtuhStatechanged se não funciona
          .then(()=>{
            this.setState({nome:"",senha:"",email:""});
         }) 
        }   
      })
      }
      cadastrar(e){
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.senha)
        .catch((error)=>{
          if(error){
            alert("Error : " +error.code);
          }
        })
        e.preventDefault();
        }
 
      render(){
        return(
          <div>
             <form onSubmit={(e)=>this.cadastrar(e)} >
               Nome:
               <input type="text" value={this.state.nome}  
               onChange={(e)=>{this.setState({nome:e.target.value})}}/><br/>
               Email:
              <input type="text" value={this.state.email}  
               onChange={(e)=>{this.setState({email:e.target.value})}}/><br/>
               Senha:
              <input type="text" value={this.state.senha}  
               onChange={(e)=>{this.setState({senha:e.target.value})}}/><br/>
            <button type="submit"  >Cadastrar</button>
             </form> 
          </div>
        );
      }
}
export default App;