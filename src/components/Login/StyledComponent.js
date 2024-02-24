import styled from 'styled-components'

export const LoginContainer = styled.div`
   font-family:Roboto;
    display:flex;
    min-height:100vh;
    flex-direction:column;
    width:100vw;
    background: #131313;
    padding:12%;


    @media screen and (min-width:576px){
        background-image:url("https://res.cloudinary.com/dcyavhlbc/image/upload/v1708159290/netfilx_1_itf2vb.png");
        padding:4%;
        margin:0px;
    }

`

export const WebSiteLogo = styled.img`
    
    width: 30%;



    @media screen and (min-width:576px){
         
        height: 30px;
        width:16%;
    

        
    }


`

export const FormContainer = styled.div`
    

    @media screen and (min-width:576px){
            display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin:4% 12% 12% 12%;
    padding:4% 20% 20% 20%;
    }


`

export const Form = styled.form`
    display:flex;
    flex-direction:column;
    align-item:center;
   
    

    
    @media screen and (min-width:576px)
    { background-color:#0C0B10;
        width:80%;
        margin:0% 60% 60% 60%;
        opacity:70%;
         padding:10%;
         border-radius:6px;
    }

`
export const Heading = styled.h1`
    color:#FFFFFF;
    
    font-size:100%;
    align-self:center;
     @media screen and (max-width:576px){
        font-size:10vw;
        align-self:flex-start;
    
        margin-top:40%;
     }
`
export const InputLabel = styled.label`
    margin-top:6%;
    margin-bottom:3%;
    font-weight:400;
    font-size:4vw;
    color:#FFFFFF;
    
    @media screen and (min-width:576px){
        font-size:12px;   
    }
    
    `

export const Input = styled.input`
    background-color:#333333;
    height:3em;
    border-radius:6px;
    outline:none;
    color:#ffffff

`
export const LoginButton = styled.button`
    background-color:#E50914;
    color:#ffffff;
    border-radius:4px;
     height:3em;
    margin-top:6%;
`
export const ErrorMsg = styled.p`
    color:#DC2626;
`
