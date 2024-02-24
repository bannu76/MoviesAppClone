import styled from 'styled-components'

export const AccountContainer = styled.div`
        display:flex;
        flex-direction:column;
        align-items:center;
        background-color:#131313;
        min-height:100vh;
        width:100vw;
        font-family:Roboto;
`

export const BgContainer = styled.div`
        background-color:#ffffff;
        min-height:50vh;
        width:100%;
        display:flex;
        flex-direction:column;
        position:relative;
        padding:24px;
`
export const Card = styled.div`
        max-width:100%;
        
        
        @media screen and (min-width:576px)
        {
                width:60%;
        }
`
export const Heading = styled.h1`
        color:${props => props.colour};
        font-size:90%;

        margin-top:18px;
        
`
export const Divider = styled.hr`
        width:80%;
        position:absolute;
`
export const MemberShipCard = styled.div`
        display:flex;
        flex-direction:row;
        
            
`
export const UserDetailcard = styled.div`
        display:flex;
        flex-direction:column; 
        
        margin-left:6%;
        padding:0%; 
        width:60%;
`
export const Para = styled.p`
        color:${props => props.colour};
        font-size:100%;
        

`
export const PlanCard = styled.div`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-between;
        margin-left:6%;
        width:50%;

`
export const UPara = styled.p`
        border-style:solid;
        border-radius:4px;
        margin-left:20%;
        border-color:${props => props.colour};
        color:${props => props.colour};
`
export const LogoutButton = styled.button`
        background-color:#E50914;
        color:#ffffff;
        border-style:none;
        border-radius:4px;
        padding:1%;
        align-self:center;
        margin-top:18px;
       cursor:pointer;
        text-align:center;
        font-size:16px;
`
